import { Factory } from './factory';
export declare class VueProjectFactory extends Factory {
    /**
     * @name setup
     * @desc setup the project with vue3.
     * @example
     * await factory.setup();
     */
    setup(): Promise<void>;
    getWorkDir(): string;
}
