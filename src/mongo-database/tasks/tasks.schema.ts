import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TasksDocument extends Document {
  @Prop() projectId: string;
  @Prop() userId: string;
  @Prop() taskName: string;
  @Prop() description: string;
  @Prop() priority: number;
  @Prop() status: string;
  @Prop() deadLine: Date;
}

export const tasksSchema = SchemaFactory.createForClass(TasksDocument);
