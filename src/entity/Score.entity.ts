import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Skill, { SkillInput } from "./Skill.entity";

import { Field, InputType, ObjectType } from "type-graphql";
import Wilder, { WilderInput } from "./Wilder.entity";

@ObjectType()
@Entity("scores")
export default class Score {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  value: number;

  @Field(() => Wilder)
  @ManyToOne(() => Wilder, { eager: true, onDelete: "CASCADE" })
  // @JoinColumn()
  wilder: Wilder;

  @Field(() => Skill)
  @ManyToOne(() => Skill, { eager: true, onDelete: "CASCADE" })
  skill: Skill;
}

@InputType()
export class ScoreInput {
  @Field()
  value: number;
  @Field(() => SkillInput)
  skill: Skill;
  @Field()
  wilderId: string;
}

@InputType()
export class ScoreCreateInput {
  @Field()
  value: number;
  @Field(() => SkillInput)
  skill: Skill;
  @Field(() => WilderInput)
  wilder: Wilder;
}

@InputType()
export class ScoreByWilderInput {
  @Field(() => Wilder)
  wilder: Wilder;
  @Field(() => Skill)
  skill: Skill;
}
