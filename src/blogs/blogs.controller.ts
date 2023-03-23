import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogInputDTO } from './types';
import { BlogsQueryRepository } from './repositories/blogs-query.repository';
import { Types } from 'mongoose';
import { PostsService } from '../posts/posts.service';
import { PostInputDTO } from '../posts/types';
import { PostsQueryRepository } from '../posts/repositories/posts-query.repository';

@Controller('blogs')
export class BlogsController {
  constructor(
    protected blogsService: BlogsService,
    protected blogsQueryRepository: BlogsQueryRepository,
    protected postsService: PostsService,
    protected postsQueryRepository: PostsQueryRepository,
  ) {}

  @Post()
  //@HttpCode(201)
  async createBlog(@Body() inputDTO: BlogInputDTO) {
    const blogId: string = await this.blogsService.create(inputDTO);
    const blog = await this.blogsQueryRepository.getBlog(blogId);
    if (!blog) throw new BadRequestException();
    return blog;
  }

  @Post('/:blogId/post')
  async createBlogPost(
    @Body() inputDTO: PostInputDTO,
    @Param('blogId') blogId: string,
  ) {
    const blog = await this.blogsQueryRepository.getBlog(blogId);
    if (!blog) throw new NotFoundException();
    const postId: string = await this.postsService.create(
      inputDTO,
      blog.id,
      blog.name,
    );
    return this.postsQueryRepository.getPost(postId);
  }

  @Get()
  getBlogs(
    @Query()
    query: {
      searchNameTerm: string;
      sortBy: string;
      sortDirection: string;
      pageNumber: string;
      pageSize: string;
    },
  ) {
    return this.blogsService.getBlogs();
  }

  @Get(':id')
  getBlog(@Param('id') blogId: string) {
    return this.blogsQueryRepository.getBlog(blogId);
  }
}
