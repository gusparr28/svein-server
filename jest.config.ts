import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>/tests'],
  verbose: true,
  bail: 1,
  preset: 'ts-jest',
  testTimeout: 15000,
  setupFiles: ['./tests/test-utils.ts'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  // globalSetup: './jest.globalSetup.ts',
  // globalTeardown: './jest.globalTeardown.ts',
};

export default config;
