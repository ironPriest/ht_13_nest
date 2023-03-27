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

  async getPosts(blogId: string | null, pageNumber: number, pageSize: number) {
    let filter = {};
    if (blogId) filter = { blogId: blogId };

    const totalCount = await this.PostModel.count(filter);
    const pageCount = Math.ceil(+totalCount / pageSize);

    const items = await this.PostModel.find(filter)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    return {
      pagesCount: pageCount,
      page: pageNumber,
      pageSize: pageSize,
      totalCount: totalCount,
      items: items,
    };
  }
}
