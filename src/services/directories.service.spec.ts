import { Test, TestingModule } from '@nestjs/testing';
import { DirectoriesService } from './directories.service';
import {
  methods,
  mockedCreateResponse,
  mockedCreateGivenCommandString,
  mockedBeforeChangeMoveResponse,
  mockedAfterChangeMoveResponse,
  mockedMoveGivenCommandString,
  mockedBeforeChangeDeleteResponse,
  mockedDeleteGivenCommandString,
  mockedAfterChangeDeleteResponse,
  mockedWrongDeleteGivenCommandString,
  mockedErrorDeleteResponse,
  mockedListDirectories,
  mockedListResponse,
  mockedOperateDirectoriesResponse,
} from '../mocks/serviceMocks';
import { DirectoriesTree } from '../types/directoryTree';

describe('DirectoriesService', () => {
  jest.mock('fs');
  let directoriesService: DirectoriesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [DirectoriesService],
    }).compile();

    directoriesService = app.get<DirectoriesService>(DirectoriesService);
  });

  describe('create', () => {
    it('should create in a provided list elements given a mocked string', () => {
      const directories: DirectoriesTree[] = [];
      directoriesService.create(
        methods,
        directories,
        mockedCreateGivenCommandString,
      );
      expect(directories).toEqual(mockedCreateResponse);
    });
  });

  describe('move', () => {
    it('should move files from a directory to another given a mocked string', () => {
      const directories: DirectoriesTree[] = mockedBeforeChangeMoveResponse;
      directoriesService.move(
        methods,
        directories,
        mockedMoveGivenCommandString,
      );
      expect(directories).toEqual(mockedAfterChangeMoveResponse);
    });
  });

  describe('delete', () => {
    it('should delete files with its children given a mocked string and return correct action', () => {
      const directories: DirectoriesTree[] = mockedBeforeChangeDeleteResponse;
      const response = directoriesService.delete(
        methods,
        directories,
        mockedDeleteGivenCommandString,
      );

      expect(directories).toEqual(mockedAfterChangeDeleteResponse);
      expect(response).toEqual(mockedDeleteGivenCommandString + '\n');
    });

    it('should not delete files when given command contains a non-existent directory', () => {
      const directories: DirectoriesTree[] = mockedBeforeChangeDeleteResponse;
      const response = directoriesService.delete(
        methods,
        directories,
        mockedWrongDeleteGivenCommandString,
      );

      expect(directories).toEqual(mockedBeforeChangeDeleteResponse);
      expect(response).toEqual(mockedErrorDeleteResponse);
    });
  });

  describe('list', () => {
    it('should list the directory tree of all existing files', () => {
      const response = directoriesService.list(mockedListDirectories);
      expect(response).toEqual(mockedListResponse);
    });
  });

  describe('operateDirectories', () => {
    it('should perform correctly all actions and return the respective response', () => {
      const response = directoriesService.operateDirectories();
      expect(response).toEqual(mockedOperateDirectoriesResponse);
    });
  });
});
