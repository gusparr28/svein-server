"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = __importDefault(require("../../../svein/users/persistence/repositories/users/impl/user.repository"));
const user_service_1 = __importDefault(require("../../../svein/users/business/user.service"));
class UserHandler {
    constructor(userService) {
        this.userService = userService;
    }
    static instance() {
        const userRepo = new user_repository_1.default();
        const userService = new user_service_1.default(userRepo);
        return new UserHandler(userService);
    }
}
exports.default = UserHandler;
