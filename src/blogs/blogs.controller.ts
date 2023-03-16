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
  @HttpCode(204)
  createBlog(@Body() inputModel: BlogInputModelType) {
    return {
      id: '42',
      name: inputModel.name,
      description: inputModel.description,
      websiteUrl: inputModel.websiteUrl,
      createdAt: '42',
      isMembership: false,
    };
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
    return { blogs: 'blogs' };
  }

  @Get(':id')
  getBlog(@Param('id') blogId: string) {
    return { blog: 'blog' };
  }
}

type BlogInputModelType = {
  name: string;
  description: string;
  websiteUrl: string;
};
