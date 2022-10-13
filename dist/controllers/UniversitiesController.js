"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversitiesController = void 0;
const Universities_1 = require("../entities/Universities");
const universitiesRepository_1 = require("../repositories/universitiesRepository");
class UniversitiesController {
}
exports.UniversitiesController = UniversitiesController;
_a = UniversitiesController;
UniversitiesController.getAll = async (req, res) => {
    const country = req.query.country;
    const page = req.query.page || 0;
    if (!country) {
        const universities = await universitiesRepository_1.universitiesRepository.find({
            select: ["_id", "name", "country", "state-province"],
            skip: +page * 20,
            take: 20
        });
        return res.send(universities);
    }
    const university = await universitiesRepository_1.universitiesRepository.find({
        where: {
            country: country.charAt(0).toUpperCase() + country.slice(1).toLowerCase(),
        },
        select: ["_id", "name", "country", "state-province"],
        skip: +page * 20,
        take: 20
    });
    return res.send(university);
};
UniversitiesController.getById = async (req, res) => {
    const id = req.params.id;
    await universitiesRepository_1.universitiesRepository.findOneOrFail(id)
        .then((university) => { return res.send(university); })
        .catch(() => { return res.status(404).send("University not found"); });
};
UniversitiesController.create = async (req, res) => {
    const validadeUniversity = await universitiesRepository_1.universitiesRepository.findOne({
        where: {
            name: req.body.name,
            country: req.body.country,
            ['state-province']: req.body['state-province']
        }
    });
    if (validadeUniversity) {
        return res.status(400).send('University already exist in this state/country');
    }
    let newUniversity = new Universities_1.University();
    newUniversity.name = req.body.name;
    newUniversity.country = req.body.country;
    newUniversity.alpha_two_code = req.body.alpha_two_code;
    newUniversity.domains = req.body.domains;
    newUniversity.web_pages = req.body.web_pages;
    newUniversity['state-province'] = req.body['state-province'];
    try {
        await universitiesRepository_1.universitiesRepository.save(newUniversity);
    }
    catch (error) {
        return res.json(error);
    }
    return res.status(201).json(newUniversity);
};
UniversitiesController.update = async (req, res) => {
    const id = req.params.id;
    let newUniversity = await universitiesRepository_1.universitiesRepository.findOne(id);
    if (!newUniversity) {
        return res.status(404).send("University not found by id");
    }
    ;
    if (req.body.name) {
        newUniversity.name = req.body.name;
    }
    ;
    if (req.body.domains) {
        newUniversity.domains = req.body.domains;
    }
    ;
    if (req.body.web_pages) {
        newUniversity.web_pages = req.body.web_pages;
    }
    ;
    try {
        await universitiesRepository_1.universitiesRepository.save(newUniversity);
    }
    catch (error) {
        return res.json(error);
    }
    return res.status(201).json(newUniversity);
};
UniversitiesController.delete = async (req, res) => {
    const id = req.params.id;
    try {
        await universitiesRepository_1.universitiesRepository.findOneOrFail(id);
        await universitiesRepository_1.universitiesRepository.delete(id);
        return res.status(204).send();
    }
    catch (error) {
        return res.status(404).send("University not found by id");
    }
};
