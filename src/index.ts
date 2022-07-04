import { app } from './app';
import './database';
import './api/index';

(async (): Promise<void> => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
