import { DataSource, Db, DeleteResult, Repository } from "typeorm";
import Skill from "../entity/Skill.entity";
import datasource from "../lib/datasource";
import { ISkillCreate } from "../routes/routes";
import { IMessageWithSuccess, ISkillUpdateKey } from "./service";

export default class SkillService {
  //constructeur qui charge la db pour chaque instanciation
  db: Repository<Skill>;
  constructor() {
    this.db = datasource.getRepository("Skill");
  }

  async createSkill({ name }: ISkillCreate): Promise<Skill> {
    let skill: Skill = this.db.create({ name });
    return await this.db.save(skill);
  }

  async getAllSkills(): Promise<Skill[]> {
    const skills: Skill[] = await this.db.find();
    return skills;
  }

  async getOneSkill(id: string): Promise<ISkillUpdateKey> {
    const skill: Skill | null = await this.db.findOneBy({ id });
    if (!skill) throw new Error(`Skill with id ${id} not found`);
    console.log(skill);
    return skill as ISkillUpdateKey;
  }

  async deleteSkill(id: string): Promise<IMessageWithSuccess> {
    const result: DeleteResult = await this.db.delete({ id });
    if (result.affected === 0) {
      throw new Error(`Skill with id ${id} not found`);
    }
    return {
      success: true,
      message: "Langage supprimé",
    };
  }

  async updateSkill({ id, ...other }: ISkillUpdateKey) {
    let skill: ISkillUpdateKey = await this.getOneSkill(id);
    Object.keys(other).forEach((value) => {
      if (other[value]) {
        skill[value] = other[value];
      }
    });
    return await this.db.save(skill);
  }
}
