import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Skill from "./Skill.entity";
import Wilder from "./Wilder.entity";

@Entity("scores")
export default class Score {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  value: number;

  @ManyToOne(() => Wilder, { eager: true, onDelete: "CASCADE" })
  // @JoinColumn()
  wilder: Wilder;

  @ManyToOne(() => Skill, { eager: true, onDelete: "CASCADE" })
  skill: Skill;
}

// import { EntitySchema } from "typeorm";

// export default new EntitySchema({
//   name: "Score",
//   columns: {
//     id: {
//       primary: true,
//       type: "int",
//       generated: true,
//     },
//     value: {
//       type: "int",
//       unique: true,
//     },
//   },
//   relations: {
//     wilder: {
//       target: "Wilder",
//       type: "many-to-one",
//       eager: true,
//       onDelete: "CASCADE",
//     },
//     skill: {
//       target: "Skill",
//       type: "many-to-one",
//       eager: true,
//       onDelete: "CASCADE",
//       joinColumn: true,
//     },
//   },
// });
