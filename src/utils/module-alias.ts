import moduleAlias from 'module-alias';
import path from 'path';
import { environmentVariables } from './loadEnvVariables';

const { NODE_ENV } = environmentVariables;

const pathGen = (folder: string): string => (
  NODE_ENV === 'development'
    ? path.resolve(process.cwd(), 'src', folder)
    : path.resolve(process.cwd(), 'build', 'src', folder));

moduleAlias.addAliases({
  '@root': pathGen('.'),
  '@utils': pathGen('utils'),
});
