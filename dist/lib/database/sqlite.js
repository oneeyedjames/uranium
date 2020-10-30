"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
class Database {
    constructor(conn) {
        this.conn = conn;
    }
    search(name, args) {
        const sql = `SELECT FROM ${name}`;
        let rows = [];
        return new Promise((resolve, reject) => {
            this.conn.each(sql, (err, row) => {
                if (err)
                    reject(err);
                else
                    rows.push(row);
            }, () => {
                resolve(rows);
            });
        });
    }
    find(name, id) {
        const sql = `SELECT FROM ${name} WHERE id = ?`;
        return new Promise((resolve, reject) => {
            this.conn.get(sql, id, (err, row) => {
                if (err)
                    reject(err);
                else
                    resolve(row);
            });
        });
    }
    save(name, entity) {
        let sql = '';
        let params = [];
        if (entity.id) {
        }
        else {
        }
        return new Promise((resolve, reject) => {
            this.conn.run(sql, params, (err) => {
                if (err)
                    reject(err);
                else
                    resolve(entity);
            });
        });
    }
    delete(name, id) {
        const sql = `DELETE FROM ${name} WHERE id = ?`;
        return new Promise((resolve, reject) => {
            this.conn.run(sql, id, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=sqlite.js.map