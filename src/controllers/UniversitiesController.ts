import { University } from '../entities/Universities';
import { universitiesRepository } from '../repositories/universitiesRepository';
import { Request, Response } from "express"

export class UniversitiesController {

    static getAll = async (req: Request, res: Response) => {
        const country:any = req.query.country
        const page = req.query.page || 0
        
        if (!country) {
            const universities = await universitiesRepository.find({
            select: [ "_id", "name", "country", "state-province" ],
            skip: +page*20,
            take: 20
        })
        return res.send(universities)
        }

        const university = await universitiesRepository.find({
            where: {
                country : country.charAt(0).toUpperCase() + country.slice(1).toLowerCase(),
            },
            select: [ "_id", "name", "country", "state-province" ],
            skip: +page*20,
            take: 20
        })

        return res.send(university)
    }

    static getById = async (req: Request, res: Response) => {
        const id: any = req.params.id
        
        await universitiesRepository.findOneOrFail(id)
            .then((university)=>{return res.send(university)})
            .catch(()=> {return res.status(404).send("University not found")})

    }
    
    static create = async (req: Request, res: Response) => {

        const validadeUniversity = await universitiesRepository.findOne({
                where: {
                    name: req.body.name,
                    country: req.body.country,
                    ['state-province'] : req.body['state-province']
                }});
        if (validadeUniversity) {return res.status(400).send('University already exist in this state/country')}

        let newUniversity: University = new University()
        newUniversity.name = req.body.name
        newUniversity.country = req.body.country
        newUniversity.alpha_two_code = req.body.alpha_two_code
        newUniversity.domains = req.body.domains
        newUniversity.web_pages = req.body.web_pages   
        newUniversity['state-province'] = req.body['state-province']

        await universitiesRepository.save(newUniversity)
            .then(()=>{return res.status(201).json(newUniversity)})
            .catch((error)=>{return res.json(error)})

    }

    static update = async (req: Request, res: Response) => {
        const id:any = req.params.id

        let newUniversity = await universitiesRepository.findOne(id)
        if (!newUniversity) {return res.status(404).send("University not found by id") };

        if(req.body.name) {newUniversity.name = req.body.name};
        if(req.body.domains) {newUniversity.domains = req.body.domains};
        if(req.body.web_pages) {newUniversity.web_pages = req.body.web_pages};   
        
        await universitiesRepository.save(newUniversity)
            .then(()=>{return res.status(201).json(newUniversity)})
            .catch((error)=>{return res.json(error)})

    }

    static delete = async (req: Request, res: Response) => {
        const id:any = req.params.id

        await universitiesRepository.findOneOrFail(id)
            .then(()=> {
                universitiesRepository.delete(id)
                return res.send('University deleted')
            })
            .catch(()=> {return res.status(404).send("University not found by id")})
        
    }
}