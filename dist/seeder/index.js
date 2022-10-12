"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const universitiesRepository_1 = require("../repositories/universitiesRepository");
(async () => {
    const database_url = `${process.env.DATABASE_URL}${process.env.DATABASE_DB}` || 'mongodb://localhost:27017/test';
    const listaUniversidades = [
        'argentina',
        'brasil',
        'chile',
        'colombia',
        'paraguai',
        'peru',
        'suriname',
        'uruguay'
    ];
    const APIurl = 'http://universities.hipolabs.com/search?country=';
    for (const universidade of listaUniversidades) {
        console.log(`Fetching universities from: ${universidade}`);
        await axios_1.default.get(`${APIurl}${universidade}`).then(async (res) => {
            try {
                for (const data of res.data) {
                    await universitiesRepository_1.universitiesRepository.save(data);
                }
            }
            catch (error) {
                console.error(error);
            }
            console.log(`Universities from ${universidade} inserted to database.`);
        });
    }
    console.log('Scrapper run successfully!');
})();
