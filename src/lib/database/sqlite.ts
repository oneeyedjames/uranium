import sqlite from 'sqlite3';

import { Database as AbstractDatabase, Entity } from '../database';

export class Database implements AbstractDatabase {
	constructor(private conn: sqlite.Database) {}

	search<E extends Entity>(name: string, args: object): Promise<E[]> {
		const sql = `SELECT FROM ${name}`;

		let rows: E[] = [];

		return new Promise<E[]>((resolve, reject) => {
			this.conn.each(sql, (err, row) => {
				if (err) reject(err);
				else rows.push(row as E);
			}, () => {
				resolve(rows);
			});
		});
	}

	find<E extends Entity>(name: string, id: any): Promise<E> {
		const sql = `SELECT FROM ${name} WHERE id = ?`;

		return new Promise<E>((resolve, reject) => {
			this.conn.get(sql, id, (err, row) => {
				if (err) reject(err);
				else resolve(row as E);
			});
		});
	}

	save<E extends Entity>(name: string, entity: E): Promise<E> {
		let sql = '';
		let params = [];

		if (entity.id) {

		} else {

		}

		return new Promise<E>((resolve, reject) => {
			this.conn.run(sql, params, (err) => {
				if (err) reject(err);
				else resolve(entity);
			});
		});
	}

	delete(name: string, id: any): Promise<void> {
		const sql = `DELETE FROM ${name} WHERE id = ?`;

		return new Promise<void>((resolve, reject) => {
			this.conn.run(sql, id, (err) => {
				if (err) reject(err);
				else resolve();
			});
		});
	}
}
