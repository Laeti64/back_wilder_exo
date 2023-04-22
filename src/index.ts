import express from "express";
import "reflect-metadata";
import datasource from "./lib/datasource";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import WilderResolver from "./resolvers/wilder.resolver";
import SkillResolver from "./resolvers/skill.resolver";
import ScoreResolver from "./resolvers/score.resolver";

import WildersRoutes from "./routes/wilder.routes";
import SkillsRoutes from "./routes/skill.routes";
import ScoresRoutes from "./routes/score.routes";
import { buildSchema } from "type-graphql";

const app = express();
app.use(express.json()); // middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/wilder", WildersRoutes);
app.use("/skill", SkillsRoutes);
app.use("/score", ScoresRoutes);

const start = async () => {
  await datasource.initialize();
  const schema = await buildSchema({
    resolvers: [WilderResolver, SkillResolver, ScoreResolver],
    validate: false, //désactive partout le class-validator dans type-graphql, vous pouvez l'activer si besoin au cas par cas dans les options des arguments par exemple
  });

  const server = new ApolloServer({
    schema,
    // typeDefs,
    // resolvers,
  });

  // app.listen(4000, () => {
  //   console.log("Server running on port 4000");
  // });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀 Server ready at ${url}`);
};

start();
