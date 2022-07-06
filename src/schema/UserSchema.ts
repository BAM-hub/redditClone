import { Field, ObjectType, registerEnumType, Root } from "type-graphql";
import { Gender } from "prisma/prisma-client";
import { DateScalar } from "../Scalars/dateScalar";
import { Post } from "./PostSchema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

registerEnumType(Gender, {
  name: "Gender",
});

@ObjectType()
export class User {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  name: String;

  @Field(() => Gender)
  gender: Gender;

  @Field(() => String)
  email: String;

  @Field(() => String, { nullable: true })
  country: string | null;

  @Field(() => DateScalar)
  birthday: Date;

  @Field(() => Date, { defaultValue: Date.now(), nullable: true })
  date?: Date | null;

  @Field(() => [Post], { nullable: true })
  async userPosts?(@Root() user: User): Promise<Post[] | null> {
    return await prisma.post.findMany({ where: { userId: user.id } });
  }
}
