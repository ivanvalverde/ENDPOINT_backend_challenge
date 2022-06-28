import { Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DirectoriesService } from '../services/directories.service';

@ApiTags('Directories')
@Controller('/directories')
export class DirectoriesController {
  constructor(private readonly directoriesService: DirectoriesService) {}

  @ApiResponse({
    status: 201,
    description:
      'For each given command, returns a line containing performed action',
    type: String,
  })
  @Post()
  operateDirectories(): string {
    return this.directoriesService.operateDirectories();
  }
}
