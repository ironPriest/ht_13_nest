import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from '../blogs-schema';
import { Model, Types } from 'mongoose';
import { BlogViewDTO } from '../types';

@Injectable()
export class BlogsQueryRepository {
  constructor(@InjectModel(Blog.name) private BlogModel: Model<BlogDocument>) {}

  async getBlog(id: string): Promise<BlogViewDTO> {
    const blog: BlogDocument = await this.BlogModel.findOne()
      .where('_id')
      .equals(id);
    if (!blog) return null;
    return {
      id: blog._id.toString(),
      name: blog.name,
      websiteUrl: blog.websiteUrl,
      description: blog.description,
      createdAt: blog.createdAt,
      isMembership: blog.isMembership,
    };
  }
}
