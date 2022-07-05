import { PrismaClient } from "@prisma/client";
import "reflect-metadata";
import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";

const prisma = new PrismaClient();
const app = express();

const main = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  const PORT = 8000;

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
