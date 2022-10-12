"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "test",
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    useUnifiedTopology: true
});
