import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { DirectoriesTree } from 'src/types/directoryTree';

@Injectable()
export class DirectoriesService {
  operateDirectories(): string {
    const fileContent = readFileSync(
      process.env.TEST ? 'inputs/test.txt' : 'inputs/actions.txt',
      'utf-8',
    );
    const methods = ['CREATE ', 'MOVE ', 'DELETE ', 'LIST'];
    const directoriesStructure: DirectoriesTree[] = [];
    let response = '';

    fileContent.split(/\r?\n/).forEach((line) => {
      if (line.includes(methods[0])) {
        this.create(methods, directoriesStructure, line);
        response = response + `${line}\n`;
      } else if (line.includes(methods[1])) {
        this.move(methods, directoriesStructure, line);
        response = response + `${line}\n`;
      } else if (line.includes(methods[2])) {
        response = response + this.delete(methods, directoriesStructure, line);
      } else if (line.includes(methods[3])) {
        response = response + `${line}\n`;
        const listResponse = this.list(directoriesStructure);
        response = response + listResponse;
      }
    });

    return response;
  }

  create(
    methods: string[],
    directoriesStructure: DirectoriesTree[],
    line: string,
  ): void {
    const fnames = line.replace(methods[0], '').split('/');
    fnames.forEach((fname, index) => {
      const relatives = [];
      for (let i = 0; i < index; i++) {
        relatives.push(fnames[i]);
      }
      index === 0
        ? directoriesStructure.push({
            name: fname,
            parent: null,
            level: 1,
            relatives: [],
          })
        : directoriesStructure.push({
            name: fname,
            parent: fnames[index - 1],
            level: index + 1,
            relatives,
          });
    });
  }

  move(
    methods: string[],
    directoriesStructure: DirectoriesTree[],
    line: string,
  ): void {
    const paths = line.replace(methods[1], '').split(' ');
    const originPath = paths[0].split('/');
    const destinationPath = paths[1].split('/');
    const dirToBeMoved = directoriesStructure.filter((dir) => {
      return dir.name === originPath[originPath.length - 1];
    });
    const indexDirToBeMoved = directoriesStructure.indexOf(dirToBeMoved[0]);
    directoriesStructure[indexDirToBeMoved].level = destinationPath.length + 1;
    directoriesStructure[indexDirToBeMoved].parent =
      destinationPath[destinationPath.length - 1];
    directoriesStructure[indexDirToBeMoved].relatives = destinationPath;

    const dirChildrenToChange = directoriesStructure.filter((dir) => {
      return dir.relatives.includes(dirToBeMoved[0].name);
    });
    dirChildrenToChange.forEach((dir) => {
      const parentDir = directoriesStructure.filter(
        (parent) => parent.name === dir.parent,
      )[0];
      dir.level = parentDir.level + 1;
      dir.relatives = parentDir.relatives.concat(parentDir.name);
    });
  }

  delete(
    methods: string[],
    directoriesStructure: DirectoriesTree[],
    line: string,
  ): string {
    const dirToBeDeleted = line.replace(methods[2], '');
    const dirToBeDeletedArr = dirToBeDeleted.split('/');
    let response = '';

    const dirToDelete = directoriesStructure.filter((dir) => {
      const parents = dirToBeDeletedArr.slice(0, -1);
      return (
        JSON.stringify(dir.relatives) == JSON.stringify(parents) &&
        dir.name === dirToBeDeletedArr[dirToBeDeletedArr.length - 1]
      );
    })[0];

    if (!dirToDelete) {
      let i = 0;
      let breakOut = false;
      while (i < dirToBeDeletedArr.length && breakOut === false) {
        const doesExist = directoriesStructure.filter((dir) => {
          return (
            dir.name === dirToBeDeletedArr[i] &&
            dir.level === i + 1 &&
            JSON.stringify(dir.relatives) ===
              JSON.stringify(dirToBeDeletedArr.slice(0, i))
          );
        });
        if (!doesExist.length) {
          response = response + `${line}\n`;
          response =
            response +
            `Cannot delete ${dirToBeDeleted} - ${dirToBeDeletedArr[i]} does not exist\n`;
          breakOut = true;
        }
        i++;
      }
    } else {
      directoriesStructure.splice(directoriesStructure.indexOf(dirToDelete), 1);

      const newDirectoriesStructure = directoriesStructure.filter((dir) => {
        return !dir.relatives.includes(dirToDelete?.name);
      });

      directoriesStructure.length = 0;
      directoriesStructure.push(...newDirectoriesStructure);
      response = response + `${line}\n`;
    }
    return response;
  }

  list(directoriesStructure: DirectoriesTree[]): string {
    let listResponse = '';
    const dirLevels = directoriesStructure.map((dir) => {
      return dir.level;
    });
    const maxLevel = Math.max(...dirLevels);
    for (let i = 0; i < maxLevel; i++) {
      directoriesStructure.forEach((dir) => {
        if (dir.level === 1 && i == 0) {
          listResponse = listResponse + `${dir.name}\n`;
        } else if (dir.level === i + 1) {
          listResponse = listResponse.replace(
            `${dir.parent}\n`,
            `${dir.parent}\n${' '.repeat(dir.level - 1)}${dir.name}\n`,
          );
        }
      });
    }
    return listResponse;
  }
}
