import { Body, Controller, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsQueryRepository } from './repositories/posts-query.repository';

@Controller('posts')
export class PostsController {
  constructor(
    protected postsService: PostsService,
    protected postsQueryRepository: PostsQueryRepository,
  ) {}

  /*@Post()
  async createPost(@Body() inputDTO: PostInputDTO, @Param) {

    const blog = await this.blogQueryRepository.getBlog(blogId)
    const postid: Types.ObjectId = await this.postsService.create(inputDTO);
    return this.postsQueryRepository.getPost(postid);
  }*/
}
