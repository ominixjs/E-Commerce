import express from "express";

//=== Routers
import UserRouter from "./src/routers/UserRouter.js";
//=== Configs
import sequelize from "./src/configs/database.js";
import logger from "./src/configs/logger.js";
//=== Middlewares
import ErrorHandler from "./src/middlewares/ErrorHandler.js";

//===
const app = express();

//===
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//===
try {
    await sequelize.authenticate();
    logger.info("[BANCO DE DADOS] Conexão feita");
} catch (err) {
    logger.error("[BANCO DE DADOS] Sem conexão");
}

//=== 
app.use("/users", UserRouter);
//=== Middleware para tratar erros dos controllers
app.use(ErrorHandler);

export default app;
