import { HydratedDocument, Model } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { like, PostInputDTO } from './types';

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

  static createPost(
    DTO: PostInputDTO,
    blogId: string,
    blogName: string,
    PostModel: PostModelType,
  ): PostDocument {
    const post = new PostModel({
      title: DTO.title,
      shortDescription: DTO.shortDescription,
      content: DTO.content,
      blogId: blogId,
      blogName: blogName,
      createdAt: new Date().toISOString(),
    });
    return post;
  }
}

export const PostSchema = SchemaFactory.createForClass(Post);

const postStaticMethods: PostModelStaticType = {
  createPost: Post.createPost,
};
PostSchema.statics = postStaticMethods;

export type PostDocument = HydratedDocument<Post>;
export type PostModelStaticType = {
  createPost: (
    DTO: PostInputDTO,
    blogId: string,
    blogName: string,
    PostModel: PostModelType,
  ) => PostDocument;
};
export type PostModelType = Model<PostDocument> & PostModelStaticType;
