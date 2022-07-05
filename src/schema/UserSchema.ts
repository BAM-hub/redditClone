import { Field, ObjectType, registerEnumType } from "type-graphql";
import { Gender } from "prisma/prisma-client";
import { DateScalar } from "../Scalars/dateScalar";

registerEnumType(Gender, {
  name: "Gender",
});

@ObjectType()
export class User {
  @Field(() => Number)
  id: Number;

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

  // Todo Posts
}
