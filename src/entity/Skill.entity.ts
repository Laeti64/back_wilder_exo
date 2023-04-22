import { Field, InputType, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@ObjectType()
@Unique("contrainte_unique", ["name"])
@Entity("skills")
export default class Skill {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  //@Column({unique: true}}) pour une contrainte unique - autre methode
  @Field()
  @Column()
  name: string;
}

@InputType()
export class SkillInput {
  @Field({ nullable: true })
  id: string;
  @Field()
  name: string;
}

@InputType()
export class SkillUpdateInput {
  @Field()
  id: string;
  @Field({ nullable: true })
  name: string;
}
