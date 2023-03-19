import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('blogs', () => {
  let app: INestApplication;
  let server: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  // describe POST => blogs
  // it delete all data => 204
  // it get all blogs = 0
  // it 401
  // it 400
  // it 201
  // it 200 get all blogs = 1
  // describe GET => blogs
  // describe PUT => blogs
  // it 404
  // describe DELETE => blogs

  it('POST -> /blogs -> should create blog & return created blog', async () => {
    const blogInputData = {
      name: 'testName',
      description: 'testDescription',
      websiteUrl: 'testWebsiteUrl',
    };
    const createdBlog = await request(server)
      .post('/blogs')
      .send(blogInputData);

    expect(createdBlog.status).toBe(201);

    const newBlog = createdBlog.body;
    expect(newBlog).toEqual({
      id: expect.any(String),
      name: blogInputData.name,
      description: blogInputData.description,
      websiteUrl: blogInputData.websiteUrl,
      createdAt: expect.any(String),
      isMembership: false,
    });
    expect.setState({ newBlog });
  });

  it('should return one created blog', async () => {
    const { newBlog } = expect.getState();
    //get all blogs => items.len === 1 && items[0] === newBlog
  });
});
