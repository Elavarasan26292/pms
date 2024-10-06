import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UsersRoleDocument extends Document {
  @Prop() roleId: string;
  @Prop() roleName: string;
}

export const usersRoleSchema = SchemaFactory.createForClass(UsersRoleDocument);
