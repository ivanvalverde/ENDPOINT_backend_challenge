import { Module } from '@nestjs/common';
import { DirectoriesController } from './controllers/directories.controller';
import { DirectoriesService } from './services/directories.service';

@Module({
  imports: [],
  controllers: [DirectoriesController],
  providers: [DirectoriesService],
})
export class AppModule {}
