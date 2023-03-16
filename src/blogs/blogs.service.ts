import { Injectable } from '@nestjs/common';
import { BlogsRepository } from './blogs.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './blogs-schema';
import { Model } from 'mongoose';
import { BlogInputDTO } from './blogs.controller';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    protected blogsRepository: BlogsRepository,
  ) {}

  async create(DTO: BlogInputDTO): Promise<BlogDocument> {
    const blog = new this.blogModel(DTO);
    await this.blogsRepository.save(blog);
    return blog;
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
