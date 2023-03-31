import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserInputDTO } from './types';
import { UsersService } from './users.service';
import { UsersQueryRepository } from './repositories/users-query.repository';

@Controller('users')
export class UsersController {
  constructor(
    protected usersService: UsersService,
    protected usersQueryRepository: UsersQueryRepository,
  ) {}

  @Post()
  async createUser(@Body() inputDTO: UserInputDTO) {
    const userId: string = await this.usersService.create(inputDTO);
    const user = await this.usersQueryRepository.getUser(userId);
    if (!user) throw new BadRequestException();
    return user;
  }
}
