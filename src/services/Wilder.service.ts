import { DeleteResult, Repository } from "typeorm";
import Score from "../entity/Score.entity";
import Skill from "../entity/Skill.entity";
import Wilder from "../entity/Wilder.entity";
import datasource from "../lib/datasource";
import { IWilderAssignSkill, IWilderCreate } from "../routes/routes";
import ScoreService from "./Score.service";
import { IWilderUpdateKey } from "./service";
import SkillService from "./Skill.service";

export default class WilderService {
  db: Repository<Wilder>;
  //constructeur qui charge la db pour chaque instanciation
  constructor() {
    this.db = datasource.getRepository("Wilder");
  }

  async createWilder({
    firstName,
    lastName,
    email,
  }: IWilderCreate): Promise<Wilder> {
    let wilder: Wilder = this.db.create({ email, firstName, lastName });
    return await this.db.save(wilder);
  }

  async getAllWilders(): Promise<Wilder[]> {
    return await this.db
      .createQueryBuilder("wilder")
      .leftJoinAndSelect("wilder.scores", "scores")
      .leftJoinAndSelect("scores.skill", "skill")
      .getMany();
  }

  async getWilderById(id: string) {
    const wilder = await this.db
      .createQueryBuilder("wilder")
      .leftJoinAndSelect("wilder.scores", "scores")
      .leftJoinAndSelect("scores.skill", "skill")
      .where("wilder.id = :id", { id })
      .getOne();

    if (!wilder) throw new Error(`Wilder with id ${id} not found`);
    return wilder;
  }

  async deleteWilder(id: string) {
    const result: DeleteResult = await this.db.delete({ id });
    if (result.affected === 0) {
      throw new Error(`Wilder with id ${id} not found`);
    }
    return `Wilder with id ${id} has been deleted`;
  }

  async updateWilder(
    id: string,
    { firstName, lastName, email }: IWilderCreate
  ) {
    await this.db.update(id, {
      firstName,
      lastName,
      email,
    });
    return `Wilder with id ${id} has been updated`;
  }

  async partialUpdateWilder({ id, ...other }: IWilderUpdateKey) {
    let wilder: Wilder = await this.getWilderById(id);
    // Object.keys(other).forEach((key) => {
    //   if (other[key]) {
    //     wilder[key] = other[key];
    //   }
    // });
    return await this.db.update(wilder.id, other as IWilderUpdateKey);
  }

  async assignScoreToWilder({ wilderId, skillId, value }: IWilderAssignSkill) {
    console.log("je suis la");
    const skill: Skill = await new SkillService().getOneSkill(skillId);
    const wilder: Wilder = await this.getWilderById(wilderId);
    console.log;
    let previousScore: Score | null = await new ScoreService().findByRelation({
      skill,
      wilder,
    });

    const scoreResult: Score = await new ScoreService().saveScore({
      ...previousScore,
      skill,
      wilder,
      value,
    });
    return scoreResult;
  }
}
