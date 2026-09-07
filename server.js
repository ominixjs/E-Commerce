import "dotenv/config";

import logger from "./src/configs/logger.js";
import app from "./index.js";

const PORT = process.env.PORT || "3031";

app.listen(PORT, () => {
    logger.info("Servidor rodando na porta " + PORT);
});
