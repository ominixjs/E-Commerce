import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const User = sequelize.define(
    "Users",
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        birthday: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        termsAccepted: {
            type: DataTypes.JSON,
            defaultValue: [],
        },
    },
    { freezeTableName: true },
);

export default User;
