import { Controller, Delete } from '@nestjs/common';
import { TestingService } from './testing.service';

@Controller('testing/all-data')
export class TestingController {
  constructor(protected testingService: TestingService) {}

  @Delete()
  async deleteAll() {
    await this.testingService.deleteAll();
  }
}
