import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Unique("contrainte_unique", ["name"])
@Entity("skills")
export default class Skill {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  //@Column({unique: true}}) pour une contrainte unique - autre methode
  @Column()
  name: string;
}

// import { EntitySchema } from "typeorm";

// export default new EntitySchema({
//   name: "Skill",
//   columns: {
//     id: {
//       primary: true,
//       type: "int",
//       generated: true,
//     },
//     name: {
//       type: "text",
//       unique: true,
//     },
//   },
//   relations: {
//     scores: {
//       target: "Score",
//       type: "one-to-many",
//       inverseSide: "skill",
//     },
//   },
// });
