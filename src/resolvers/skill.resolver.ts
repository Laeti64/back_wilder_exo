import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Skill, { SkillInput, SkillUpdateInput } from "../entity/Skill.entity";
import SkillService from "../services/Skill.service";
import { MessageWithSuccess } from "../entity/Wilder.entity";

@Resolver()
export default class SkillResolver {
  @Query(() => [Skill])
  async SkillList(): Promise<Skill[]> {
    const skills = await new SkillService().getAllSkills();
    return skills;
  }

  @Query(() => Skill)
  async SkillById(@Arg("id") id: string): Promise<Skill> {
    const skill = await new SkillService().getOneSkill(id);
    return skill;
  }

  @Mutation(() => Skill)
  async SkillCreate(@Arg("name") name: SkillInput): Promise<Skill> {
    const skill = await new SkillService().createSkill(name);
    return skill;
  }

  @Mutation(() => MessageWithSuccess)
  async SkillDelete(@Arg("id") id: string): Promise<MessageWithSuccess> {
    const result = await new SkillService().deleteSkill(id);
    return result;
  }

  @Mutation(() => Skill)
  async SkillUpdate(
    @Arg("skillUpdate") skillUpdate: SkillUpdateInput
  ): Promise<Skill> {
    const { id, name } = skillUpdate;
    const result = await new SkillService().updateSkill({ id, name });
    return result;
  }
}
