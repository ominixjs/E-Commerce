//=== Services
import FindDBUser from "../services/FindUserDB.js";
import CreateUser from "../services/CreateUser.js";
import ListUsers from "../services/ListUsers.js";

export async function Users(req, res) {
    const users = await ListUsers();
    return res.status(200).json(users);
}

export async function View(req, res) {
    const user = await FindDBUser(req.body.id);
    return res.status(200).json({ user });
}

export async function Create(req, res) {
    await CreateUser(req.body);
    return res.status(200).json({ success: "Conta criada com sucesso" });
}

export function Edit(req, res) {
    return res.status(200).json({ success: "Hello World" });
}

export function Delete(req, res) {
    return res.status(200).json({ success: "Hello World" });
}
