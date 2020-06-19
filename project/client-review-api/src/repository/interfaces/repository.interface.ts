interface IRead<T> {
	find(filter?: any): Promise<Array<T>>;
	findOne(filter: any): Promise<T>;
}
interface IWrite<T> {
	create(item: T): Promise<T>;
	update(item: T): Promise<boolean>;
	delete(item: T): Promise<boolean>;
	bulk(items: T | Array<T>): Promise<boolean>;
}
export interface IRepository<T> extends IWrite<T>, IRead<T> {

}