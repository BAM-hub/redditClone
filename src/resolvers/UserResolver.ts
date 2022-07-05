import { PrismaClient } from "@prisma/client";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../schema/UserSchema";
import { Gender as PrismaGender } from "prisma/prisma-client";
import { DateScalar } from "../Scalars/dateScalar";

const prisma = new PrismaClient();

@Resolver(User)
export class UserResolver {
  // find all users

  @Query(() => [User])
  async users(): Promise<User[] | []> {
    return await prisma.user.findMany();
  }

  @Mutation(() => User)
  async createUser(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("gender") gender: PrismaGender,
    @Arg("country") country: string,
    @Arg("birthday", () => DateScalar) birthday: Date
  ): Promise<User | null> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        gender,
        country,
        birthday,
      },
    });
    return user;
  }
}
