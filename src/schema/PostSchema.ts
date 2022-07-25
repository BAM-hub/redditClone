import { DateScalar } from "../Scalars/dateScalar";
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
  Root,
} from "type-graphql";
import { PostType } from "prisma/prisma-client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

registerEnumType(PostType, {
  name: "PostType",
});

@ObjectType()
export class Post {
  @Field(() => Number)
  id: number;

  @Field(() => Number)
  userId: number;

  @Field(() => Number, { nullable: true })
  comunityId?: number | null;

  @Field(() => PostType)
  type: PostType;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  text?: string | null;

  @Field(() => DateScalar, { nullable: true })
  publishedAt: Date | null;

  @Field(() => String, { nullable: true })
  image?: string | null;

  @Field(() => String, { nullable: true })
  link?: string | null;

  @Field(() => Boolean)
  notification: boolean;

  @Field(() => Boolean)
  published: boolean;

  //   @Field(() => DateScalar)
  //   date: Date;

  // Todo Pool
  @Field(() => Pool, { nullable: true })
  pool?: Pool | null;

  @Field(() => Pool, { nullable: true })
  async getPool?(@Root() post: Post): Promise<Pool | null> {
    return await prisma.pool.findUnique({ where: { postId: post.id } });
  }
}

@InputType()
export class PostInput {
  @Field(() => Number)
  userId: number;

  @Field(() => PostType)
  type: PostType;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  text?: string | null;

  @Field(() => DateScalar, { nullable: true })
  publishedAt: Date | null;

  @Field(() => String, { nullable: true })
  image?: string | null;

  @Field(() => String, { nullable: true })
  link?: string | null;

  @Field(() => Boolean)
  notification: boolean;

  @Field(() => Boolean)
  published: boolean;

  @Field(() => Pool, { nullable: true })
  pool?: Pool;
}

// Pooloption
@ObjectType()
export class PoolOption {
  @Field(() => Number)
  id: number;

  @Field(() => Number)
  poolId: number;

  @Field(() => String)
  text: string;

  @Field(() => Number, { defaultValue: 0 })
  votes: number;
}

// Pool Class
@ObjectType()
export class Pool {
  @Field(() => Number)
  id: number;

  @Field(() => Number)
  postId: number;

  @Field(() => DateScalar, { defaultValue: Date.now() })
  startsAt?: Date | null;

  @Field(() => DateScalar)
  endsAt: Date;

  @Field(() => [PoolOption], { nullable: true })
  async options?(
    @Root() pool: Pool,
    @Root() post: Post
  ): Promise<PoolOption[] | null> {
    if (post.type !== PostType.Pool) return null;

    return await prisma.poolOption.findMany({
      where: {
        poolId: pool.id,
      },
    });
  }
}
