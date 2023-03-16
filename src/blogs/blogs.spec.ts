import { Test, TestingModule } from '@nestjs/testing';
import { BlogsController } from './blogs.controller';
import { response } from 'express';

describe('BlogsController', () => {
  let blogsController: BlogsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BlogsController],
      providers: [],
    }).compile();

    blogsController = app.get<BlogsController>(BlogsController);
  });

  describe('/blogs', () => {
    it('should return created blog', () => {
      const createdBlog = blogsController.createBlog({
        name: 'testName',
        description: 'testDescription',
        websiteUrl: 'testWebsiteUrl',
      });
      expect(createdBlog).toEqual({
        id: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        websiteUrl: expect.any(String),
        createdAt: expect.any(String),
        isMembership: expect.any(Boolean),
      });
      //todo statusCode
      expect(response.statusCode).toEqual(200);
    });
    it('should return all blogs', () => {
      expect(
        blogsController.getBlogs({
          searchNameTerm: 'searchNameTerm',
          sortBy: 'sortBy',
          sortDirection: 'sortDirection',
          pageNumber: 'pageNumber',
          pageSize: 'pageSize',
        }),
      ).toEqual({ blogs: 'blogs' });
    });
    it('should return single blog', () => {
      expect(blogsController.getBlog('id')).toEqual({ blog: 'blog' });
    });
  });
});
