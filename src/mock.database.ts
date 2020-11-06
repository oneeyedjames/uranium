import { Database, Entity } from './lib/database';

export class MockDatabase implements Database {
	constructor(private data: Record<string, Record<number, object>>) {}

	async search<E extends Entity>(entityName: string, args: object): Promise<E[]> {
		let result: E[] = [];

		for (let id in this.data[entityName]) {
			let record = this.data[entityName][id];
			let match = true;

			for (let key in args) {
				if (record[key] != args[key])
					match = false;
			}

			if (match)
				result.push(record as E);
		}

		return result;
	}

	async find<E extends Entity>(entityName: string, id: any): Promise<E> {
		return this.data[entityName][id] as E;
	}

	async save<E extends Entity>(entityName: string, entity: E): Promise<E> {
		if (entity.id == 0)
			entity.id = this.data[entityName];

		return this.data[entityName][entity.id] = entity;
	}

	async delete(entityName: string, id: any): Promise<void> {
		this.data[entityName][id] = null;
	}
}

export default new MockDatabase({
	'user': {
		1: {
			id: 1,
			username: 'joeuser',
			password: '$2b$10$YazHUZHYagQNamelD.zthueEj90dtdiWNxLRcZwUbasB5hh2OKwKu'
		}
	},
	'role': {
		1: {
			id: 1,
			title: 'Administrator',
			summary: 'All the things'
		},
		2: {
			id: 2,
			title: 'Manager',
			summary: 'Most things'
		},
		3: {
			id: 3,
			title: 'User',
			summary: 'Some things'
		},
	},
	'host': {
		1: {
			id: 1,
			title: 'Main Host',
			summary: 'This is the main host.',
			default: true,
			domain: 'main.uranium.local'
		}
	},
	'blog_post': {
		1: {
			id: 1,
			title: 'Hello, World!',
			summary: 'Lorem ipsum dolor sit...',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
		}
	}
});
