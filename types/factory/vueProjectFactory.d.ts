import { Factory } from './factory';
export declare class VueProjectFactory extends Factory {
    setup(): Promise<void>;
    getWorkDir(): string;
}
