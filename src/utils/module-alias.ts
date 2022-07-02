import moduleAlias from 'module-alias';
import path from 'path';

const env = process.env.NODE_ENV;

const pathGen = (folder: string): string => (
  env === 'development'
    ? path.resolve(process.cwd(), 'src', folder)
    : path.resolve(process.cwd(), 'build', 'src', folder));

moduleAlias.addAliases({
  '@root': pathGen('.'),
  '@utils': pathGen('utils'),
});
