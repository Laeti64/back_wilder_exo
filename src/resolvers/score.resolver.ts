import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Score, {
  ScoreByWilderInput,
  ScoreCreateInput,
} from "../entity/Score.entity";
import ScoreService from "../services/Score.service";
import Wilder, { MessageWithSuccess } from "../entity/Wilder.entity";
import Skill from "../entity/Skill.entity";
import { ScoreInput } from "../entity/Score.entity";

@Resolver()
export default class ScoreResolver {
  @Query(() => [Score])
  async ScoreList(): Promise<Score[]> {
    const scores = await new ScoreService().getAllScores();
    return scores;
  }

  @Query(() => Score)
  async ScoreById(@Arg("id") id: string): Promise<Score> {
    const score = await new ScoreService().getOneScore(id);
    return score;
  }

  // @Query(() => Score)
  // async ScoreByRelation(
  //   @Arg("scoreByWilder") scoreByWilder: ScoreByWilderInput
  // ): Promise<Score> {
  //   const { wilderId, skillId } = scoreByWilder;
  //   const score = await new ScoreService().findByRelation({ wilderId, skillId });
  //   if (score) {
  //     return score;
  //   } else {
  //     return new Score();
  //   }
  // }

  // @Mutation(() => Score)
  // async ScoreCreate(
  //   @Arg("scoreCreate") scoreCreate: ScoreCreateInput
  // ): Promise<Score> {
  //   const score = await new ScoreService().createScore(scoreCreate);
  //   return score;
  // }

  @Mutation(() => MessageWithSuccess)
  async ScoreDelete(@Arg("id") id: string): Promise<MessageWithSuccess> {
    const result = await new ScoreService().deleteScore(id);
    return result;
  }
}
