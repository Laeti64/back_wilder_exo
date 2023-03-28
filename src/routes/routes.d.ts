import Wilder from "../entity/Wilder.entity";

export interface ISkillCreate {
  name: string;
}

export interface ISkillDelete {
  id?: string;
}

export interface ISkillUpdate {
  id?: string;
}

export interface IFind {
  id?: string;
}

export interface IWilderCreate {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IWilderAssignSkill {
  wilderId: string;
  skillId: string;
  value: number;
}

export interface IScoreBody {
  value: number;
  wilder: Wilder;
  skill: Skill;
}
export interface IScoreToUpdate {
  value?: number;
  wilder?: Wilder;
  skill?: Skill;
}
