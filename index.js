import express from "express";

//=== Configs
import sequelize from "./src/configs/database.js";
import logger from "./src/configs/logger.js";
//=== Middlewares
import ErrorHandler from "./src/middlewares/ErrorHandler.js";
//=== Routers
import AuthRouter from "./src/routers/AuthRouter.js";
import UserRouter from "./src/routers/UserRouter.js";
import ProductRouter from "./src/routers/ProductRouter.js";

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

//=== Endpoints
app.use(AuthRouter);
app.use("/api/v1/", UserRouter);
app.use("/api/v1/", ProductRouter);

//=== Middleware para tratar erros dos controllers
app.use(ErrorHandler);

export default app;
