"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockDatabase = void 0;
class MockDatabase {
    constructor(data) {
        this.data = data;
    }
    search(entityName, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            for (let id in this.data[entityName]) {
                let record = this.data[entityName][id];
                let match = true;
                for (let key in args) {
                    if (record[key] != args[key])
                        match = false;
                }
                if (match)
                    result.push(record);
            }
            return result;
        });
    }
    find(entityName, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.data[entityName][id];
        });
    }
    save(entityName, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (entity.id == 0)
                entity.id = this.data[entityName];
            return this.data[entityName][entity.id] = entity;
        });
    }
    delete(entityName, id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.data[entityName][id] = null;
        });
    }
}
exports.MockDatabase = MockDatabase;
exports.default = new MockDatabase({
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
    'blog_post': {
        1: {
            id: 1,
            title: 'Hello, World!',
            summary: 'Lorem ipsum dolor sit...',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
    }
});
//# sourceMappingURL=mock.database.js.map