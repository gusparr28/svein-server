"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_alias_1 = __importDefault(require("module-alias"));
const path_1 = __importDefault(require("path"));
const { NODE_ENV } = process.env;
const pathGen = (folder) => (NODE_ENV === 'development'
    ? path_1.default.resolve(process.cwd(), 'src', folder)
    : path_1.default.resolve(process.cwd(), 'build', 'src', folder));
module_alias_1.default.addAliases({
    '@root': pathGen('.'),
    '@utils': pathGen('utils'),
});
