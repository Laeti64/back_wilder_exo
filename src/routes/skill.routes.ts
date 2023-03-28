import { Request, Response, Router } from "express";
import Skill from "../entity/Skill.entity";
import SkillService from "../services/Skill.service";
import { IFind, ISkillCreate, ISkillDelete, ISkillUpdate } from "./routes.d";

const router = Router();

router.post("/create", async (req: Request, res: Response) => {
  const { name }: ISkillCreate = req.body;
  let skill: Skill = await new SkillService().createSkill({ name });
  return res.status(200).json(skill);
});

router.get("/", async (req: Request, res: Response) => {
  let skills: Skill[] = await new SkillService().getAllSkills();
  return res.status(200).json(skills);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id }: IFind = req.params;
  const skill: Skill = await new SkillService().getOneSkill(id);
  if (!skill) return res.status(404).json("skill not found");
  return res.status(200).json(skill);
});

router.put("/update/:id", async (req: Request, res: Response) => {
  const { id }: ISkillUpdate = req.params;
  const { name }: ISkillCreate = req.body;
  let updatedSkill = new SkillService().updateSkill({ id, name });
  if (!updatedSkill) return res.status(404).json("Skill not found");
  return res.status(200).json(`Score with id ${id} has been updated`);
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const { id }: ISkillDelete = req.params;
  await new SkillService().deleteSkill(id);
  return res.status(200).json(`Skill with id ${id} has been deleted`);
});
export default router;
