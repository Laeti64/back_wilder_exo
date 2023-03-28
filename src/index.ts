import express from "express";
import "reflect-metadata";
import datasource from "./lib/datasource";
import cors from "cors";
// import WildersRoutes from "./routes/wilders/wilder.routes.tidied";
import WildersRoutes from "./routes/wilder.routes";
import SkillsRoutes from "./routes/skill.routes";
import ScoresRoutes from "./routes/score.routes";

const app = express();
app.use(express.json()); // middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/wilder", WildersRoutes);
app.use("/skill", SkillsRoutes);
app.use("/score", ScoresRoutes);

const start = async () => {
  await datasource.initialize();
  app.listen(4000, () => {
    console.log("Server running on port 4000");
  });
};

start();
