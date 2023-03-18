import { BlogsRepository } from '../blogs/blogs.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TestingService {
  constructor(protected blogsRepository: BlogsRepository) {}

  async deleteAll() {
    await this.blogsRepository.deleteAll();
  }
}
