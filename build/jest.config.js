"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    verbose: true,
    bail: 1,
    preset: 'ts-jest',
    testTimeout: 15000,
    setupFiles: ['./tests/test-utils.ts'],
    setupFilesAfterEnv: ['./jest.setup.ts'],
    // globalSetup: './jest.globalSetup.ts',
    // globalTeardown: './jest.globalTeardown.ts',
};
exports.default = config;
