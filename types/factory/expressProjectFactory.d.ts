import { Factory } from './factory';
export declare class ExpressProjectFactory extends Factory {
    setup(): Promise<void>;
    getWorkDir(): string;
}
