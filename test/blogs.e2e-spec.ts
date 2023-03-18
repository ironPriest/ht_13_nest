import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('blogs', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create blog & return created blog', async () => {
    const createdBlog = await request(app.getHttpServer()).get('/blogs').send({
      name: 'testName',
      description: 'testDescription',
      websiteUrl: 'testWebsiteUrl',
    });
    expect(200);
    expect(createdBlog).toEqual({
      id: String,
      name: String,
      description: String,
      websiteUrl: String,
      createdAt: String,
      isMembership: Boolean,
    });
  });
});
