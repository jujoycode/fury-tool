import { Logger } from '../utils';
export declare class Exception {
    protected logger: Logger;
    title: string;
    message: string;
    context?: Error;
    constructor(title: string, message: string, context?: Error);
}
