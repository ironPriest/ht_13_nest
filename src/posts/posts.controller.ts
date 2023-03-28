import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsQueryRepository } from './repositories/posts-query.repository';
import { PostInputDTO } from './types';
import { BlogsQueryRepository } from '../blogs/repositories/blogs-query.repository';

@Controller('posts')
export class PostsController {
  constructor(
    protected postsService: PostsService,
    protected postsQueryRepository: PostsQueryRepository,
    protected blogsQueryRepository: BlogsQueryRepository,
  ) {}

  @Get(':id')
  getPost(@Param('id') postId: string) {
    return this.postsQueryRepository.getPost(postId);
  }

  @Post()
  async createPost(
    @Body() inputDTO: PostInputDTO,
    @Body('blogId') blogId: string,
  ) {
    const blog = await this.blogsQueryRepository.getBlog(blogId);
    const postId = await this.postsService.create(inputDTO, blogId, blog.name);
    return this.postsQueryRepository.getPost(postId);
  }
}
