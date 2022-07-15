import { port, app } from './app';
import './database';
import './api/index';
import './utils/plugins';

(async (): Promise<void> => {
  try {
    await app.listen({ port: port ? +port : 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
