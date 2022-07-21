"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.port = void 0;
const fastify_1 = __importDefault(require("fastify"));
const fastify_bcrypt_1 = __importDefault(require("fastify-bcrypt"));
const cors_1 = __importDefault(require("@fastify/cors"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const index_1 = __importDefault(require("@fastify/oauth2/index"));
const { NODE_ENV, PORT, JWT_SECRET } = process.env;
exports.port = PORT;
exports.app = (0, fastify_1.default)({
    logger: {
        transport: NODE_ENV === 'development'
            ? {
                target: 'pino-pretty',
                options: {
                    ignore: 'pid,hostname,time',
                },
            }
            : undefined,
    },
});
// plugins
exports.app.register(fastify_bcrypt_1.default, {
    saltWorkFactor: 12,
});
exports.app.register(cors_1.default, {
    origin: true,
});
exports.app.register(jwt_1.default, {
    secret: JWT_SECRET,
});
exports.app.register(index_1.default, {
    name: 'facebookOAuth2',
    credentials: {
        client: {
            id: '',
            secret: '',
        },
        auth: index_1.default.FACEBOOK_CONFIGURATION,
    },
    startRedirectPath: '/login/facebook',
    callbackUri: 'http://localhost:3000/login/facebook/callback',
    scope: [],
});
