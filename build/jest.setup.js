"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./src/app");
beforeAll(async () => {
    await app_1.app.ready();
});
afterAll(async () => {
    await app_1.app.close();
});
