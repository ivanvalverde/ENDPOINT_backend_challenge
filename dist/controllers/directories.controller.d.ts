import { DirectoriesService } from '../services/directories.service';
export declare class DirectoriesController {
    private readonly appService;
    constructor(appService: DirectoriesService);
    operateDirectories(): string;
}
