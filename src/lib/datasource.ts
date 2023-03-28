import { DataSource } from "typeorm";
import Wilders from "../entity/Wilder.entity";
import Scores from "../entity/Score.entity";
import Skills from "../entity/Skill.entity";

export default new DataSource({
  type: "sqlite",
  database: "./wildersdb.sqlite",
  synchronize: true,
  entities: [Wilders, Scores, Skills],
  logging: ["query", "error"],
});
