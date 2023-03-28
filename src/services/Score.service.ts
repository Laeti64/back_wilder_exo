import { DeleteResult, Repository } from "typeorm";
import Score from "../entity/Score.entity";
import datasource from "../lib/datasource";
import { IScoreBody } from "../routes/routes";
import { IScoreFind } from "./service";

export default class ScoreService {
  db: Repository<Score>;
  //constructeur qui charge la db pour chaque instanciation
  constructor() {
    this.db = datasource.getRepository("Score");
  }

  async createScore({ value, wilder, skill }: IScoreBody): Promise<Score> {
    let score: Score = this.db.create({ value, wilder, skill });
    return await this.db.save(score);
  }

  async getAllScores(): Promise<Score[]> {
    const scores: Score[] = await this.db.find();
    return scores;
  }

  async getOneScore(id: string): Promise<Score> {
    let score: Score | null = await this.db.findOneBy({ id });
    if (!score) {
      throw new Error("Cette note n'existe pas");
    }
    return score;
  }

  async deleteScore(id: string) {
    const result: DeleteResult = await this.db.delete({ id });
    if (result.affected === 0) {
      throw new Error(`Score with id ${id} not found`);
    }
    return `Score with id ${id} has been deleted`;
  }

  async findByRelation({ skill, wilder }: IScoreFind) {
    const score = await this.db.findOneBy({ skill, wilder });
    return score;
  }

  async saveScore(data: any) {
    return await this.db.save(data);
  }
}
