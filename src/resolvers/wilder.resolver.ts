import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import Wilder, {
  AssignInput,
  MessageWithSuccess,
  UpdateWilderInput,
  WilderInput,
} from "../entity/Wilder.entity";
import WilderService from "../services/Wilder.service";
import Score from "../entity/Score.entity";

@Resolver()
export default class WilderResolver {
  @Query(() => [Wilder])
  async WilderList(): Promise<Wilder[]> {
    const wilders = await new WilderService().getAllWilders();
    return wilders;
  }

  @Query(() => Wilder)
  async WilderById(@Arg("id") id: string): Promise<Wilder> {
    const wilder = await new WilderService().getWilderById(id);
    return wilder;
  }

  @Mutation(() => Wilder)
  async WilderCreate(
    @Arg("wilderCreate") wilderCreate: WilderInput
  ): Promise<Wilder> {
    const wilder = await new WilderService().createWilder(wilderCreate);
    return wilder;
  }

  @Mutation(() => MessageWithSuccess)
  async WilderDelete(@Arg("id") id: string): Promise<MessageWithSuccess> {
    const result = await new WilderService().deleteWilder(id);
    return result;
  }

  @Mutation(() => Score)
  async WilderAssignNote(
    @Arg("assignInput") assignInput: AssignInput
  ): Promise<Score> {
    const score = await new WilderService().assignScoreToWilder(assignInput);
    return score;
  }

  @Mutation(() => MessageWithSuccess)
  async WilderUpdate(
    @Arg("updateWilder") updateWilder: UpdateWilderInput
  ): Promise<MessageWithSuccess> {
    const { id, ...rest } = updateWilder;
    const result = await new WilderService().updateWilder(id, rest);
    return result;
  }
}
