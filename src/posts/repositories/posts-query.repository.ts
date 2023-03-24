import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../posts-schema';
import { Model } from 'mongoose';
import { like, PostViewDTO } from '../types';

@Injectable()
export class PostsQueryRepository {
  constructor(@InjectModel(Post.name) private PostModel: Model<PostDocument>) {}

  async getPost(id: string): Promise<PostViewDTO> {
    const post: PostDocument = await this.PostModel.findOne()
      .where('_id')
      .equals(id);
    return {
      id: post._id.toString(),
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId,
      blogName: post.blogName,
      createdAt: post.createdAt,
      extendedLikesInfo: {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: 'None',
        newestLikes: [],
      },
    };
  }
}
