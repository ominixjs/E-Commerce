import asaasApi from "./AsaasApi.js";

export default async function CreateAsaasCustomer(userData) {
    const { data } = await asaasApi.post("/customers", {
        name: userData.name,
        email: userData.email,
        cpfCnpj: userData.cpf,
        phone: userData.phone,
    });

    return data.id;
}
