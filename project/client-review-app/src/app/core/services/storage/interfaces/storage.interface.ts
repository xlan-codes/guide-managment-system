

// TODO use generic
export interface IStorage {
    save(key, data: string | object): Promise<boolean>;
    get(key: string): Promise<object | string>;
    delete(key: string): Promise<boolean>;
}