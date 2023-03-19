import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { like } from './types';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class LikeStatus {
  @Prop()
  userId: string;

  @Prop({ required: true })
  like: like;

  @Prop({ required: true })
  addedAt: string;
}

export const LikeStatusSchema = SchemaFactory.createForClass(LikeStatus);

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  shortDescription: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  blogId: string;

  @Prop({ required: true })
  blogName: string;

  @Prop({ required: true })
  createdAt: string;

  @Prop({ default: [], type: [LikeStatusSchema] })
  likeStatuses: LikeStatus[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
