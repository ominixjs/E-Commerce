import { UserModel } from "../models/index.js";

export function Find(id) {
    return UserModel.findByPk(id);
}

export function Search(params) {
    return UserModel.findOne({ where: params });
}

export async function Create(id, name) {
    await UserModel.create({ id, name });
}

export function Edit(id, data) {
    return UserModel.update(data, { where: { id } });
}

export function Delete(id) {
    return UserModel.destroy(id);
}
