import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { Profile } from './Profile';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  mobileNo: string;

  @Field()
  password: string;

  @Field(() => Date)
  passwordChangedAt: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field()
  isEmailConfirmed: boolean;

  @Field(() => Profile, { nullable: true })
  profile?: Profile;

  @Field(() => Role)
  role: Role;
}

export enum Role {
  Admin,
  User
}

registerEnumType(Role, {
  name: 'Role'
});
