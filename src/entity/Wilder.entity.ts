import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Score from "./Score.entity";

@Entity("wilders")
export default class Wilder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Score, (score) => score.wilder)
  scores: Score[];
}

// import { EntitySchema } from "typeorm";

// export default new EntitySchema({
//   name: "Wilder",
//   columns: {
//     id: {
//       primary: true,
//       type: "int",
//       generated: true,
//     },
//     firstName: {
//       type: "text",
//     },
//     lastName: {
//       type: "text",
//     },
//     email: {
//       type: "text",
//       unique: true,
//     },
//   },
//   relations: {
//     scores: {
//       target: "Score",
//       type: "one-to-many",
//       inverseSide: "scores",
//     },
//   },
// });
