"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../../src/app");
const mock_user_repository_1 = require("../../__mocks__/repositories/mock.user.repository");
const auth_service_1 = __importDefault(require("../../../src/svein/auth/business/auth.service"));
describe('Auth Service', () => {
    let userToSignUp;
    const password = '1234';
    let hashedPassword;
    let mockUserRepository;
    let authService;
    beforeAll(async () => {
        hashedPassword = await app_1.app.bcrypt.hash(password);
    });
    beforeEach(() => {
        mockUserRepository = new mock_user_repository_1.MockUserRepository();
        authService = new auth_service_1.default(mockUserRepository);
        userToSignUp = {
            email: 'test@gmail.com',
            username: 'test',
            password: hashedPassword,
        };
    });
    it('should successfully sign up a user', async () => {
        const user = await authService.signUp(userToSignUp);
        expect(user).toBeDefined();
    });
    it('should throw an invalid email error', async () => {
        userToSignUp = {
            ...userToSignUp,
            email: 'test',
        };
        await expect(authService.signUp(userToSignUp)).rejects.toThrow('Invalid email');
    });
    it('should successfully sign in a user and return a token', async () => {
        const createdUser = await mockUserRepository.save(userToSignUp);
        const { email } = createdUser;
        const token = await authService.signIn({
            email,
            password,
        });
        expect(token).toBeDefined();
    });
    it('should throw a cannot login with username and email at the same time error', async () => {
        const createdUser = await mockUserRepository.save(userToSignUp);
        const { email, username } = createdUser;
        await expect(authService.signIn({
            email,
            username,
            password,
        })).rejects.toThrow('Cannot login with username and email at the same time');
    });
    it('should throw a cannot login without username or email', async () => {
        await mockUserRepository.save(userToSignUp);
        await expect(authService.signIn({
            password,
        })).rejects.toThrow('Cannot login without username or email');
    });
    it('should throw an invalid password error', async () => {
        const createdUser = await mockUserRepository.save(userToSignUp);
        const { email } = createdUser;
        await expect(authService.signIn({
            email,
            password: '1235',
        })).rejects.toThrow('Invalid password');
    });
});
