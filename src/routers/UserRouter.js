import express from "express";

//=== Controllers
import * as userController from "../controllers/Users.js";

//===
const router = express.Router();

router.get("/", userController.View);
router.post("/", userController.Create);
router.put("/:id", userController.Edit);
router.delete("/:id", userController.Delete);

export default router;
