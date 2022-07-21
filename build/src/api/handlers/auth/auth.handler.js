"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = __importDefault(require("../../../svein/users/persistence/repositories/users/impl/user.repository"));
const auth_service_1 = __importDefault(require("../../../svein/auth/business/auth.service"));
class AuthHandler {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(user) {
        return this.authService.signUp(user);
    }
    async signIn(user) {
        return this.authService.signIn(user);
    }
    static instance() {
        const userRepo = new user_repository_1.default();
        const authService = new auth_service_1.default(userRepo);
        return new AuthHandler(authService);
    }
}
exports.default = AuthHandler;
