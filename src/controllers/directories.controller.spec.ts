import { Test, TestingModule } from '@nestjs/testing';
import { DirectoriesController } from './directories.controller';
import { DirectoriesService } from '../services/directories.service';
import { mockedResponseController } from '../mocks/controllerMocks';

describe('DirectoriesController', () => {
  let directoriesController: DirectoriesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DirectoriesController],
      providers: [
        {
          provide: DirectoriesService,
          useFactory: () => ({
            operateDirectories: jest.fn(() => mockedResponseController),
          }),
        },
      ],
    }).compile();

    directoriesController = app.get<DirectoriesController>(
      DirectoriesController,
    );
  });

  describe('operateDirectories', () => {
    it('should return a mocked string response provided by service', () => {
      expect(directoriesController.operateDirectories()).toBe(
        mockedResponseController,
      );
    });
  });
});
