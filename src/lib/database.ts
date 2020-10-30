export interface Entity { id: any; }

export interface Database {
	search<E extends Entity>(name: string, args: object): Promise<E[]>;
	find<E extends Entity>(name: string, id: any): Promise<E>;
	save<E extends Entity>(name: string, entity: E): Promise<E>;
	delete(name: string, id: any): Promise<void>;
}
