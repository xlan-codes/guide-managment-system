import { IRepository } from "./interfaces/repository.interface";
import { Connection, getConnection, Repository } from "typeorm";
import { injectable } from "inversify";


@injectable()
export class BaseRepository<T> implements IRepository<T> {

	public conection: Connection;
	public repository: Repository<T>;

	constructor() {
		this.conection = getConnection();
	}

	public find(exp?: object): Promise<Array<T>> {
		return this.repository.find(exp);
	}

	public async findOne(exp: any): Promise<T> {
		const item =  await this.repository.findOne(exp);
		return item ? item : undefined;
	}

	public create(item: T): Promise<T> {
		return this.repository.save(item) as unknown as Promise<T>;
	}

	public update(item: T): Promise<boolean> {
		return this.repository.save(item).then(() => Promise.resolve(true));
	}
	public delete(item: T): Promise<boolean> {
		return this.repository.remove(item).then(() => Promise.resolve(true));
	}
	public bulk(items: Array<T>): Promise<boolean> {
		return this.repository.save(items, { chunk: 20 }).then(() => Promise.resolve(true));
	}
}
