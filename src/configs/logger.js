import winston from "winston";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logsDirectory = path.join(__dirname, "../../logs");

const levelColors = {
    info: "green",
    warn: "yellow",
    error: "red",
};

winston.addColors(levelColors);

const logFormat = winston.format.printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
});

const baseFormat = winston.format.combine(
    winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({
        stack: true,
    })
);

const logger = winston.createLogger({
    level: "info",

    transports: [
        // INFO
        new winston.transports.File({
            filename: path.join(logsDirectory, "info.log"),
            level: "info",
            format: winston.format.combine(
                baseFormat,
                winston.format((info) => {
                    return info.level === "info" ? info : false;
                })(),
                logFormat
            ),
        }),

        // WARN
        new winston.transports.File({
            filename: path.join(logsDirectory, "warn.log"),
            level: "warn",
            format: winston.format.combine(
                baseFormat,
                winston.format((info) => {
                    return info.level === "warn" ? info : false;
                })(),
                logFormat
            ),
        }),

        // ERROR
        new winston.transports.File({
            filename: path.join(logsDirectory, "error.log"),
            level: "error",
            format: winston.format.combine(baseFormat, logFormat),
        }),

        // CONSOLE
        new winston.transports.Console({
            format: winston.format.combine(baseFormat, winston.format.colorize(), logFormat),
        }),
    ],
});

export default logger;
