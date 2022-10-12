"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.universitiesRepository = void 0;
const Universities_1 = require("../entities/Universities");
const data_source_1 = require("../data-source");
exports.universitiesRepository = data_source_1.AppDataSource.getRepository(Universities_1.University);
