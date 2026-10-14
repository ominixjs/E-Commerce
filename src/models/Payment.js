import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Payment = sequelize.define(
    "Payments",
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        orderId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(
                "PENDING",
                "APPROVED",
                "DECLINED",
                "CANCELLED",
                "REFUNDED",
                "EXPIRED",
                "REFUNDED",
                "PARTIALLY_REFUNDED",
                "REFUND_PENDING",
            ),
            allowNull: false,
        },
        amount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        provider: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        transactionId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        providerPaymentId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paidAt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
    },
);

export default Payment;
