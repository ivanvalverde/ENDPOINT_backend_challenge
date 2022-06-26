import { AppService } from './app.service';
import { Request } from './types/request';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    operateDirectories(request: Request): void;
}
