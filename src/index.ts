import { port, app } from './app';
import './database';
import './api/index';

(async (): Promise<void> => {
  try {
    await app.listen({ port: port ? +port : 3000, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
