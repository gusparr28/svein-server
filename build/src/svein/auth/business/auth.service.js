"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const emailRegex_1 = require("../../../utils/emailRegex");
const app_1 = require("../../../app");
class AuthService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async signUp(user) {
        const { username, email, password } = user;
        if (!email.toLowerCase().match(emailRegex_1.emailRegex)) {
            throw new Error('Invalid email');
        }
        const hashedPassword = await app_1.app.bcrypt.hash(password);
        return this.userRepo.save({
            email: email.toLowerCase().trim(),
            username: username.toLowerCase().trim(),
            password: hashedPassword,
        });
    }
    async signIn(user) {
        const { email, username, password } = user;
        let token;
        if (email && username)
            throw new Error('Cannot login with username and email at the same time');
        if (!email && !username)
            throw new Error('Cannot login without username or email');
        if (email) {
            const foundUser = await this.userRepo.findByEmail(email);
            if (!foundUser)
                throw new Error('User not registered');
            const passwordComparation = await app_1.app.bcrypt.compare(password, foundUser.password);
            if (!passwordComparation)
                throw new Error('Invalid password');
            token = app_1.app.jwt.sign({
                token: `${foundUser.id}-${(0, uuid_1.v4)()}`,
            });
        }
        if (username) {
            const foundUser = await this.userRepo.findByUsername(username);
            if (!foundUser)
                throw new Error('User not registered');
            const passwordComparation = await app_1.app.bcrypt.compare(password, foundUser.password);
            if (!passwordComparation)
                throw new Error('Invalid password');
            token = app_1.app.jwt.sign({
                token: `${foundUser.id}-${(0, uuid_1.v4)()}`,
            });
        }
        return token;
    }
}
exports.default = AuthService;
