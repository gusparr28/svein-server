import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  bail: 1,
  preset: 'ts-jest',
  testTimeout: 15000,
  watchPlugins: ['./tests/test-utils.ts'],
  setupFiles: ['./.jest/environmentVariables.ts'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  // globalSetup: './jest.globalSetup.ts',
  // globalTeardown: './jest.globalTeardown.ts',
};

export default config;
