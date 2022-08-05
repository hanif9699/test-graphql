import { Field, ID, ObjectType } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  avatarUrl?: string;

  @Field()
  avatarPublicId?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => User)
  user: User;
}
