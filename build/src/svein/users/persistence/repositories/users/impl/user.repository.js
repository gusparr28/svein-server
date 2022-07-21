"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../../model/user.model"));
class UserRepository {
    async save(user) {
        const newUser = new user_model_1.default(user);
        await newUser.save();
        return newUser;
    }
    async findByUsername(username) {
        const user = await user_model_1.default.findOne({ username });
        return user ?? null;
    }
    async findByEmail(email) {
        const user = await user_model_1.default.findOne({ email });
        return user ?? null;
    }
}
exports.default = UserRepository;
