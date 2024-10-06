import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ProjectsDocument extends Document {
  @Prop() projectName: string;
  @Prop() description: string;
  @Prop() projectHead: string;
  @Prop() manager: string;
  @Prop() status: string;
  @Prop() tasks: string[];
}

export const projectsSchema = SchemaFactory.createForClass(ProjectsDocument);
