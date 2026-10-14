import asaasApi from "./AsaasApi.js";

export default async function CreateAsaasPayment(paymentsData) {
    try {
        // Dados enviados para API de pagamento
        // customer - identificação do usuário
        // cpfCnpj - CPF do usuário
        // value - Valor do pedido
        // billingType - Tipo de transação
        // dueDate - Data DD/MM/AAAA
        // description - Descrição do pedido

        const { data } = await asaasApi.post("/payments", paymentsData);

        return data;
    } catch (error) {
        console.log(error.response.data);
    }
}
