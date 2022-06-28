import { DirectoriesTree } from 'src/types/directoryTree';

export const methods = ['CREATE ', 'MOVE ', 'DELETE ', 'LIST'];
export const mockedCreateGivenCommandString = `CREATE picture/public`;
export const mockedCreateResponse: DirectoriesTree[] = [
  {
    name: 'picture',
    level: 1,
    parent: null,
    relatives: [],
  },
  {
    name: 'public',
    level: 2,
    parent: 'picture',
    relatives: ['picture'],
  },
];

export const mockedMoveGivenCommandString = `MOVE video picture`;

export const mockedBeforeChangeMoveResponse: DirectoriesTree[] = [
  {
    name: 'picture',
    level: 1,
    parent: null,
    relatives: [],
  },
  {
    name: 'public',
    level: 2,
    parent: 'picture',
    relatives: ['picture'],
  },
  {
    name: 'video',
    level: 1,
    parent: null,
    relatives: [],
  },
];

export const mockedAfterChangeMoveResponse: DirectoriesTree[] = [
  {
    name: 'picture',
    level: 1,
    parent: null,
    relatives: [],
  },
  {
    name: 'public',
    level: 2,
    parent: 'picture',
    relatives: ['picture'],
  },
  {
    name: 'video',
    level: 2,
    parent: 'picture',
    relatives: ['picture'],
  },
];

export const mockedDeleteGivenCommandString = `DELETE oldfiles`;
export const mockedWrongDeleteGivenCommandString = `DELETE unknown`;
export const mockedErrorDeleteResponse = `DELETE unknown\nCannot delete unknown - unknown does not exist\n`;

export const mockedBeforeChangeDeleteResponse: DirectoriesTree[] = [
  {
    name: 'oldfiles',
    level: 1,
    parent: null,
    relatives: [],
  },
  {
    name: 'file',
    level: 2,
    parent: 'oldfiles',
    relatives: ['oldfiles'],
  },
  {
    name: 'newfiles',
    level: 1,
    parent: null,
    relatives: [],
  },
];

export const mockedAfterChangeDeleteResponse: DirectoriesTree[] = [
  {
    name: 'newfiles',
    level: 1,
    parent: null,
    relatives: [],
  },
];

export const mockedListDirectories: DirectoriesTree[] = [
  ...mockedBeforeChangeDeleteResponse,
];

export const mockedListResponse = `oldfiles\n file\nnewfiles\n`;
export const mockedOperateDirectoriesResponse = `CREATE public
CREATE private/confidential
LIST
public
private
 confidential
MOVE private/confidential public
LIST
public
 confidential
private
DELETE private/confidential
Cannot delete private/confidential - confidential does not exist
LIST
public
 confidential
private\n`;
