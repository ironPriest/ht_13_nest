import { BlogsRepository } from '../blogs/blogs.repository';

export class TestingService {
  constructor(protected blogsRepository: BlogsRepository) {}

  async deleteAll() {
    await this.blogsRepository.deleteAll();
  }
}
