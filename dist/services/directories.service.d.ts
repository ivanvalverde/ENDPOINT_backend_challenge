import { DirectoriesTree } from 'src/types/directoryTree';
export declare class DirectoriesService {
    operateDirectories(): string;
    create(methods: string[], directoriesStructure: DirectoriesTree[], line: string): void;
    move(methods: string[], directoriesStructure: DirectoriesTree[], line: string): void;
    delete(methods: string[], directoriesStructure: DirectoriesTree[], line: string): string;
    list(directoriesStructure: DirectoriesTree[]): string;
}
