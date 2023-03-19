import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from '../blogs-schema';
import { Model } from 'mongoose';
import { BlogViewDTO } from '../types';

@Injectable()
export class BlogsQueryRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async getBlog(id): Promise<BlogViewDTO> {
    const blog = await this.blogModel.findOne().where('_id').equals(id);
    return {
      id: blog._id,
      name: blog.name,
      websiteUrl: blog.websiteUrl,
      description: blog.description,
      createdAt: blog.createdAt,
      isMembership: blog.isMembership,
    };
  }
}
