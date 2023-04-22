import { Request, Response, Router } from "express";
import Score from "../entity/Score.entity";
import Wilder from "../entity/Wilder.entity";
import { IWilderUpdateKey } from "../services/service";
import WilderService from "../services/Wilder.service";
import { IFind, IWilderAssignSkill, IWilderCreate } from "./routes";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    let wilders: Wilder[] = await new WilderService().getAllWilders();
    return res.status(200).json(wilders);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id }: IFind = req.params;
    let wilder: Wilder | null = await new WilderService().getWilderById(id);
    if (!wilder) return res.status(404).json({ error: "Wilder not found" });
    return res.status(200).json(wilder);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

router.post("/create", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email }: IWilderCreate = req.body;
    let wilder: Wilder = await new WilderService().createWilder({
      firstName,
      lastName,
      email,
    });
    return res.status(200).json(wilder);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const { id }: IFind = req.params;
    await new WilderService().deleteWilder(id);
    return res.status(200).json(`Wilder with id ${id} has been deleted`);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/update/:id", async (req: Request, res: Response) => {
  try {
    const { id }: IFind = req.params;
    const { firstName, lastName, email }: IWilderCreate = req.body;
    await new WilderService().updateWilder(id, {
      firstName,
      lastName,
      email,
    });
    res.status(200).json(`Wilder with id ${id} has been updated`);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.patch("/update/partial/:id", async (req: Request, res: Response) => {
  const { id }: IFind = req.params;
  const { firstName, lastName, email }: IWilderUpdateKey = req.body;
  try {
    await new WilderService().partialUpdateWilder({
      id,
      firstName,
      lastName,
      email,
    });
    res.status(200).json(`Wilder with id ${id} has been updated`);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// router.post("/assign/score", async (req: Request, res: Response) => {
//   const { wilderId, skillId, value }: IWilderAssignSkill = req.body;
//   try {
//     const result: Score = await new WilderService().assignScoreToWilder({
//       wilderId,
//       skillId,
//       value,
//     });
//     if (!result) throw new Error("Wilder or Skill not found");
//     res.status(200).json(result);
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

export default router;
