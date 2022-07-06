import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { PostType, PrismaClient } from "@prisma/client";
import { Post, Pool } from "../schema/PostSchema";
import { DateScalar } from "../Scalars/dateScalar";

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
  async createPost(
    @Arg("userId") userId: number,
    @Arg("comunityId", () => Number, { nullable: true }) comunityId: number,
    @Arg("title") title: string,
    @Arg("text", () => String, { nullable: true }) text: string,
    @Arg("publishedAt", () => DateScalar, { nullable: true }) publishedAt: Date,
    @Arg("image", () => String, { nullable: true }) image: string,
    @Arg("link", () => String, { nullable: true }) link: string,
    @Arg("notfications") notfications: boolean,
    @Arg("isPublished", () => Boolean) isPublished: boolean,
    @Arg("type", () => PostType) type: PostType
  ): Promise<Post | null> {
    try {
      const post = await prisma.post.create({
        data: {
          userId,
          comunityId: 0,
          type,
          title,
          text,
          publishedAt,
          image,
          link,
          notification: notfications,
          published: isPublished,
        },
      });
      return post;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
