import { Test, TestingModule } from '@nestjs/testing';
import { DirectoriesController } from './directories.controller';
import { DirectoriesService } from '../services/directories.service';

describe('AppController', () => {
  let directoriesController: DirectoriesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DirectoriesController],
      providers: [DirectoriesService],
    }).compile();

    directoriesController = app.get<DirectoriesController>(
      DirectoriesController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(directoriesController.operateDirectories()).toBe('Hello World!');
    });
  });
});
