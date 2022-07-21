"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(email, username, password, id) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
    }
}
exports.User = User;
