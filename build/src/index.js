"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
require("./database");
require("./api/index");
(async () => {
    try {
        await app_1.app.listen({ port: app_1.port ? +app_1.port : 3000 });
    }
    catch (err) {
        app_1.app.log.error(err);
        process.exit(1);
    }
})();
