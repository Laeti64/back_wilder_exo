import { Router } from "express";
import wilderController from "./wilder.controller";

const router = Router();

router.get("/", wilderController.getAll);
router.get("/:id", wilderController.getOne);
router.post("/create", wilderController.create);
router.delete("/delete/:id", wilderController.delete);
router.put("/update/:id", wilderController.update);

export default router;
