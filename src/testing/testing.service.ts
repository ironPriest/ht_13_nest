import { BlogsRepository } from '../blogs/repositories/blogs.repository';
import { Injectable } from '@nestjs/common';
import { PostsRepository } from '../posts/repositories/posts.repository';

@Injectable()
export class TestingService {
  constructor(
    protected blogsRepository: BlogsRepository,
    protected postsRepository: PostsRepository,
  ) {}

  async deleteAll() {
    await this.blogsRepository.deleteAll();
    await this.postsRepository.deleteAll();
  }
}
