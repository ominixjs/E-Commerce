import { nanoid } from "nanoid";

//=== Configs
import logger from "../../configs/logger.js";
//=== Models
import {
    OrderModel,
    OrderItemModel,
    ProductModel,
    UserModel,
    PaymentModel,
} from "../../models/index.js";
//=== Services
import CreateAsaasPayment from "../asaas/CreateAsaasPayment.js";
//=== Utils
import AppError from "../../utils/AppError.js";

export default async function ValidareAndPayForOrder(user, orderId, method) {
    // Valida e pega os dados do pedido
    const order = await OrderModel.findOne({
        where: {
            id: orderId,
            userId: user.id,
        },
        include: {
            model: OrderItemModel,
            include: PaymentModel,
        },
    });
    if (!Boolean(order)) {
        throw new AppError("Pedido não localizado, atualize sua lista", 404);
    }

    // Validando status do pedido. Impede de continuar em status avançados.
    const blockOrderStatus = ["PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];
    if (blockOrderStatus.includes(order.status)) {
        throw new AppError(
            "Pedido não esta mais disponivel. Atualize a pagina 'Minhas Compras' ou entre em contato.",
            422,
        );
    }

    // Valida cada status dos pagamentos para evitar ações duplicadas.
    const is_validStatus = order?.some((o) => ["PENDING", "APPROVED"].includes(o.Payments.status));
    if (is_validStatus) throw new AppError("Pedido já possui status de pagamento", 422);

    // Reduz estoque e garante os produtos
    await ReduceProductInventory(user.id, order);

    // Pix redireciona usuário e aguarda validação
    // Cartão finaliza pagamento e aguarda validação
    const PAYMENT_METHOD = {
        PIX: PixPaymentMethod,
    };
    const paymentMade = await PAYMENT_METHOD(method);

    // Cria registro do pagamento
    await PaymentModel.create({
        id: nanoid(10),
        orderId,
        userId: user.id,
        status: "PENDING",
        amount: order.total,
        method,
        currency: "BRL",
        transactionId: nanoid(10),
        provider: "ASAAS",
        providerPaymentId: paymentMade.id,
        paidAt: new Date().toISOString(),
    });

    logger.info({
        userId: user.id,
        orderId,
        message: "Operação concluida, aguardando validação de pagamento.",
    });

    return paymentMade;
}

async function PixPaymentMethod(order, method) {
    // Formato dos dados para API de pagamento
    const data = {
        customer: user.asaasCustomerId,
        // cpfCnpj: user.cpf,
        billingType: method,
        value: order.total,
        dueDate: new Date().toISOString().split("T")[0],
        description: `Pedido #${order.id}`,
    };

    // Solicita dados da API
    const { id, invoiceUrl } = await CreateAsaasPayment(data);

    // Pix deve ser tratado diferente das outras formas de pagemnto.
    // Após enviar os dados, deve redirecionar cliente para outra rota de pagamento do Asaas.
    return { id, invoiceUrl };
}

async function ReduceProductInventory(userId, order) {
    // localizar usuário e usar suas identificações no banco e no sistema de pagamento
    const user = await UserModel.findByPk(userId, {
        attributes: ["id", "cpf", "asaasCustomerId"],
    });
    if (!Boolean(user)) {
        throw new AppError("Usuário não localizado no sistema", 404);
    }

    // Alterar estoque dos itens do pedido
    for (const item of order.OrderItems) {
        // Busca pelo produto do pedido
        const product = await ProductModel.findByPk(item.productId);

        // Atualiza o estoque reduzindo apenas na estancia.
        const stock = product.stock - item.quantity;
        product.set({ stock });

        // Valida novamente o estoque, em caso de estoque 0 define ele como esgotado.
        if (product.stock === 0) {
            // Altera status do produto por falta de estoque.
            product.set({ active: false });
        }

        // Caso o estoque esteja negativo, impede a conclusão e evita
        // concluir processo e chamar API de pagamento.
        if (product.stock < 0) {
            throw new AppError("Houve um erro ao finalizar o pagamento. Stock limited");
        }

        // Reduz o estoque após gerar status de pagamento.
        await product.save();
    }
}
