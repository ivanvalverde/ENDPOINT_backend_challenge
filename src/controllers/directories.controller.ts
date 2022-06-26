import { Controller, Post } from '@nestjs/common';
import { DirectoriesService } from '../services/directories.service';

@Controller('/directories')
export class DirectoriesController {
  constructor(private readonly appService: DirectoriesService) {}

  @Post()
  operateDirectories(): string {
    return this.appService.operateDirectories();
  }
}
