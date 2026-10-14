import axios from "axios";

const asaasApi = axios.create({
    baseURL: process.env.ASAAS_API_URL,
    headers: {
        accept: "application/json",
        "content-type": "application/json",
        access_token: process.env.ASAAS_API_KEY,
    },
});

export default asaasApi;
