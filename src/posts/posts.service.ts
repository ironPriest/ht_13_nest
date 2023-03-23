import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostModelType } from './posts-schema';
import { PostsRepository } from './repositories/posts.repository';
import { PostInputDTO } from './types';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private PostModel: PostModelType,
    protected postsRepository: PostsRepository,
  ) {}

  async create(
    DTO: PostInputDTO,
    blogId: string,
    blogName: string,
  ): Promise<string> {
    const post = this.PostModel.createPost(
      DTO,
      blogId,
      blogName,
      this.PostModel,
    );
    await this.postsRepository.save(post);
    return post._id.toString();
  }
}
