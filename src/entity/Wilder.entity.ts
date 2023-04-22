import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Score, { ScoreInput } from "./Score.entity";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
@Entity("wilders")
export default class Wilder {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field(() => [Score], { nullable: true })
  @OneToMany(() => Score, (score) => score.wilder)
  scores?: Score[];
}

@InputType()
export class WilderInput {
  @Field({ nullable: true })
  id: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field(() => [ScoreInput], { nullable: true })
  scores?: Score[];
}

@ObjectType()
export class MessageWithSuccess {
  @Field()
  success: boolean;
  @Field()
  message: string;
}

@InputType()
export class AssignInput {
  @Field()
  value: number;
  @Field()
  skillId: string;
  @Field()
  wilderId: string;
}

@InputType()
export class UpdateWilderInput {
  @Field()
  id: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
}
