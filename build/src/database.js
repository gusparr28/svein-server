"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { NODE_ENV, LOCAL_MONGODB_URI, PROD_MONGODB_URI, STAG_MONGODB_URI, } = process.env;
(async (uri) => {
    try {
        const { port, name } = (await mongoose_1.default.connect(uri)).connections[0];
        console.log(`${name} database running on port ${port}`);
    }
    catch (e) {
        console.log(e);
    }
})(NODE_ENV === 'development'
    ? LOCAL_MONGODB_URI
    : NODE_ENV === 'staging'
        ? STAG_MONGODB_URI : PROD_MONGODB_URI);
