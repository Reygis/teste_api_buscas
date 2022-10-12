"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversitiesController = void 0;
const universitiesRepository_1 = require("../repositories/universitiesRepository");
class UniversitiesController {
}
exports.UniversitiesController = UniversitiesController;
_a = UniversitiesController;
UniversitiesController.getAll = async (req, res) => {
    const country = req.query.country || null;
    const page = req.query.page || 0;
    const universities = await universitiesRepository_1.universitiesRepository.find({
        where: {
            country: `%${country}%`
        },
        select: ["_id", "name", "country", "state-province"],
        skip: +page,
        take: 20
    });
    return res.send(universities);
};
UniversitiesController.getById = async (req, res) => {
    const id = req.params.id;
    let university;
    try {
        university = await universitiesRepository_1.universitiesRepository.findOneByOrFail({ _id: id });
    }
    catch (error) {
        return res.status(404).send("University not found");
    }
    return res.send(university);
};
UniversitiesController.create = async (req, res) => { };
UniversitiesController.update = async (req, res) => { };
UniversitiesController.delete = async (req, res) => { };
