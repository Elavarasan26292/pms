import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { userRole, userStatus } from 'src/models/enums';

@Schema()
export class UsersDocument extends Document {
  @Prop() userName: string;
  @Prop() email: string;
  @Prop() password: string;
  @Prop() phone: string;
  @Prop({ enum: Object.values(userStatus), default: userStatus.ACTIVE })
  status: string;
  @Prop() createdAt: Date;
  @Prop({ enum: Object.values(userRole), default: userRole.UNKNOWN })
  role: string;
  @Prop() tasks: string[];
}

export const usersSchema = SchemaFactory.createForClass(UsersDocument);
