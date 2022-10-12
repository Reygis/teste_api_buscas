"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mongodb",
    url: process.env.DB_URL,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    useUnifiedTopology: true
});
