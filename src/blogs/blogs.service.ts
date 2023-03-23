import { Injectable } from '@nestjs/common';
import { BlogsRepository } from './repositories/blogs.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogModelType } from './blogs-schema';
import { Types } from 'mongoose';
import { BlogInputDTO } from './types';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name)
    private BlogModel: BlogModelType,
    protected blogsRepository: BlogsRepository,
  ) {}

  async create(DTO: BlogInputDTO): Promise<string> {
    const blog = this.BlogModel.createBlog(DTO, this.BlogModel);
    await this.blogsRepository.save(blog);
    return blog._id.toString();
  }

  async getBlogs() {
    const blogs = await this.blogsRepository.getBlogs();
    return {
      pagesCount: 42,
      page: 42,
      pageSize: 42,
      totalCount: 42,
      items: blogs,
    };
  }
}
