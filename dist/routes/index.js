"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const universities_1 = __importDefault(require("./universities"));
const routes = (0, express_1.Router)();
routes.use("/universities", universities_1.default);
exports.default = routes;
