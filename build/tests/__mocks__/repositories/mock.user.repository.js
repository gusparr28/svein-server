"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockUserRepository = void 0;
class MockUserRepository {
    constructor() {
        this.mockUsers = [];
    }
    async save(user) {
        this.mockUsers.push(user);
        return this.mockUsers.slice(-1)[0];
    }
    async findByUsername(username) {
        return this.mockUsers.find((v) => v.username === username) ?? null;
    }
    async findByEmail(email) {
        return this.mockUsers.find((v) => v.email === email) ?? null;
    }
}
exports.MockUserRepository = MockUserRepository;
