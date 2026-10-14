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
        },
    });
    if (!Boolean(order)) {
        throw new AppError("Pedido não localizado, atualize sua lista", 404);
    }

    // Validando status do pedido. Impede de continuar em status avançados.
    const blockOrderStatus = ["PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];
    if (blockOrderStatus.includes(order.status)) {
        throw new AppError(
            "Houve uma mudança no status do pedido. Atualize a pagina 'Minhas Compras' ou entre em contato.",
            422,
        );
    }

    // Em caso de troca da forma de pagamento, valida o status atual do pagamento.
    const payments = await PaymentModel.findAll({
        where: {
            orderId,
            userId: user.id,
        },
    });

    // Valida cada status dos pagamentos para evitar ações duplicadas.
    const blockPaymentStatus = ["PENDING", "APPROVED"];
    if (Boolean(payments)) {
        for (const payment of payments) {
            if (blockPaymentStatus.includes(payment.status)) {
                throw new AppError(
                    "Verifique o status do pagamento ou cancele o pedido e tente novamente. Atualize a pagina 'Minhas Compras' ou entre em contato.",
                    422,
                );
            }
        }
    }

    // Realizar pagamento.
    // Pix redireciona usuário e aguarda validação
    // Cartão finaliza pagamento e aguarda validação
    let paymentMade = null;
    if (method === "PIX") {
        // Função faz todo processo de solicitação e retorna dados
        // para redirecionar usuário para pagamento PIX.
        paymentMade = await PixPaymentMethod(user.id, order, method);
    }

    // Dados do pedido e status de todo o processo.
    // Aqui o cliente só aguardará a resposta do sistema ao validar a transação.
    // Após isso o ADM cuidará do restante.
    const paymentId = nanoid(10);
    const transactionId = nanoid(10);
    await PaymentModel.create({
        id: paymentId,
        orderId,
        userId: user.id,
        status: "PENDING",
        amount: order.total,
        method,
        currency: "BRL",
        transactionId,
        provider: "ASAAS",
        providerPaymentId: paymentMade.id,
        paidAt: new Date().toISOString(),
    });

    logger.info({
        userId: user.id,
        orderId,
        paymentId,
        transactionId,
        paymentMade,
        message: "Transação concluida, aguardando validação de pagamento.",
    });

    if (method === "PIX") {
        return paymentMade.invoiceUrl;
    }

    return true;
}

async function PixPaymentMethod(userId, order, method) {
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
