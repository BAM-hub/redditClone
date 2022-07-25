import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import { Post, PostInput } from "../schema/PostSchema";

const prisma = new PrismaClient();

@Resolver(Post)
export class PostResolver {
  // find all posts
  @Query(() => [Post])
  async posts(): Promise<Post[] | null> {
    return await prisma.post.findMany();
  }

  // find post by id
  @Query(() => Post)
  async post(@Arg("id") id: number): Promise<Post | null> {
    return await prisma.post.findUnique({ where: { id } });
  }

  // create post
  @Mutation(() => Post)
  async createPost(input: PostInput): Promise<Post | null> {
    try {
      const post = await prisma.post.create({
        data: {
          ...input,
        },
      });
      return post;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
