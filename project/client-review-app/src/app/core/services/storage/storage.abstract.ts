import { IStorage } from './interfaces/storage.interface';

export abstract class StorageData implements IStorage {
    abstract save(key: any, data: string | object): Promise<boolean>;
    abstract get(key: string): Promise<string | object>;
    abstract delete(key: string): Promise<boolean>;

    
}
