import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsController } from './blogs/blogs.controller';
import { BlogsService } from './blogs/blogs.service';
import { BlogsRepository } from './blogs/repositories/blogs.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blogs/blogs-schema';
import { TestingController } from './testing/testing.controller';
import { TestingService } from './testing/testing.service';
import { BlogsQueryRepository } from './blogs/repositories/blogs-query.repository';

const mongoUri = process.env.mongoURI || 'mongodb://0.0.0.0:27017/blog_nest';

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [AppController, BlogsController, TestingController],
  providers: [
    AppService,
    BlogsService,
    BlogsRepository,
    BlogsQueryRepository,
    TestingService,
  ],
})
export class AppModule {}
