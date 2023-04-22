import { Request, Response, Router } from "express";
import Score from "../entity/Score.entity";
import ScoreService from "../services/Score.service";
import { IFind, IScoreBody } from "./routes";

const router = Router();

// router.post("/create", async (req: Request, res: Response) => {
//   const { value, wilder, skill }: IScoreBody = req.body;
//   let score: Score = await new ScoreService().createScore({
//     value,
//     wilder,
//     skill,
//   });
//   return res.status(200).json(score);
// });

router.get("/", async (req: Request, res: Response) => {
  let scores: Score[] = await new ScoreService().getAllScores();
  return res.status(200).json(scores);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id }: IFind = req.params;
  const score: Score | null = await new ScoreService().getOneScore(id);
  if (!score) return res.status(404).json("score not found");
  return res.status(200).json(score);
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const { id }: IFind = req.params;
  await new ScoreService().deleteScore(id);
  return res.status(200).json(`Score with id ${id} has been deleted`);
});

export default router;
