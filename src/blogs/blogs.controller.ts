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
  async createBlog(@Body() inputDTO: BlogInputDTO) {
    //const start = new Date();
    const blogId: string = await this.blogsService.create(inputDTO);
    //const stop = new Date();
    const blog = await this.blogsQueryRepository.getBlog(blogId);
    if (!blog) throw new BadRequestException();
    return blog;
  }

  @Post(':blogId/posts')
  async createPost(
    @Param('blogId') blogId: string,
    @Body() inputDTO: PostInputDTO,
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

  @Get(':blogId/posts')
  async getPosts(
    @Param('blogId') blogId: string,
    @Query()
    query: {
      pageNumber: string;
      pageSize: string;
      sortBy: string;
      sortDirection: string;
    },
  ) {
    //todo -> is it a proper 404 check?
    const blog = await this.blogsQueryRepository.getBlog(blogId);
    if (!blog) throw new NotFoundException();
    //todo -> optimize
    const pageNumber = query.pageNumber ? +query.pageNumber : 1;
    const pageSize = query.pageSize ? +query.pageSize : 10;
    const sortBy = query.sortBy ? query.sortBy.toString() : 'createdAt';
    const sortDirection = query.sortDirection
      ? query.sortDirection.toString()
      : 'Desc';
    return this.postsQueryRepository.getPosts(blogId, pageNumber, pageSize);
  }
}
