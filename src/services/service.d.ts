import Score from "../entity/Score.entity";
import Skill from "../entity/Skill.entity";
import Wilder from "../entity/Wilder.entity";

export interface IMessageWithSuccess {
  success: boolean;
  message: string;
}

export interface ISkillUpdateKey extends Skill {
  [key: string]: string;
}

export interface IWilderUpdateKey extends Wilder {
  [key: string]: string;
  scores?: Score[];
}
export interface IScoreUpdate extends Score {
  id: string;
  value?: number;
  wilder?: Wilder;
  skill?: Skill;
}

export interface IScoreFind {
  wilder: Wilder;
  skill: Skill;
}
