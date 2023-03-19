import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogInputDTO } from './types';
import { BlogsQueryRepository } from './repositories/blogs-query.repository';
import { Types } from 'mongoose';

@Controller('blogs')
export class BlogsController {
  constructor(
    protected blogsService: BlogsService,
    protected blogsQueryRepository: BlogsQueryRepository,
  ) {}

  @Post()
  //@HttpCode(201)
  async createBlog(@Body() inputDTO: BlogInputDTO) {
    const blogId: Types.ObjectId = await this.blogsService.create(inputDTO);
    return this.blogsQueryRepository.getBlog(blogId);
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
  getBlog(@Param('id') blogId: Types.ObjectId) {
    return this.blogsQueryRepository.getBlog(blogId);
  }
}
