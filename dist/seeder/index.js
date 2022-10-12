"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Universities_1 = require("../entities/Universities");
const universitiesRepository_1 = require("../repositories/universitiesRepository");
const data_source_1 = require("../data-source");
data_source_1.AppDataSource.initialize().then(async () => {
    const countries = [
        'argentina',
        'brazil',
        'chile',
        'colombia',
        'paraguay',
        'peru',
        'suriname',
        'uruguay'
    ];
    const APIurl = 'http://universities.hipolabs.com/search?country=';
    for (const country of countries) {
        console.log(`Importing universities from: ${country}`);
        await axios_1.default.get(`${APIurl}${country}`).then(async (res) => {
            for (const data of res.data) {
                let newUniversity = new Universities_1.University();
                newUniversity.name = data.name;
                newUniversity.country = data.country;
                newUniversity.alpha_two_code = data.alpha_two_code;
                newUniversity.web_pages = data.web_pages;
                newUniversity.domains = data.domains;
                newUniversity['state-province'] = data['state-province'];
                await universitiesRepository_1.universitiesRepository.save(newUniversity);
            }
        }).catch(error => console.log(error));
    }
    process.exit();
});
