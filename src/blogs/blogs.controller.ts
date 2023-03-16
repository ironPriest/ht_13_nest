import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
  constructor(protected blogsService: BlogsService) {}

  @Post()
  //todo statusCode
  //@HttpCode(200)
  createBlog(@Body() inputDTO: BlogInputDTO) {
    return this.blogsService.create(inputDTO);
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
    return { blog: 'blog' };
  }
}

export type BlogInputDTO = {
  name: string;
  description: string;
  websiteUrl: string;
};
