import { Injectable } from '@nestjs/common';
import { BlogsRepository } from './repositories/blogs.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './blogs-schema';
import { Model, Types } from 'mongoose';
import { BlogInputDTO } from './types';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    protected blogsRepository: BlogsRepository,
  ) {}

  async create(DTO: BlogInputDTO): Promise<Types.ObjectId> {
    const blog = new this.blogModel({
      name: DTO.name,
      description: DTO.description,
      websiteUrl: DTO.websiteUrl,
      createdAt: new Date().toISOString(),
    });
    await this.blogsRepository.save(blog);
    return blog._id;
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
