import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsQueryRepository } from './repositories/posts-query.repository';

@Controller('posts')
export class PostsController {
  constructor(
    protected postsService: PostsService,
    protected postsQueryRepository: PostsQueryRepository,
  ) {}

  @Get(':id')
  getPost(@Param('id') postId: string) {
    return this.postsQueryRepository.getPost(postId);
  }
}
