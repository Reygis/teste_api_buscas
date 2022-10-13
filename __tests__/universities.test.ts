import app from "../src/app"
import request from "supertest"
import { AppDataSource } from "../src/data-source";

beforeAll(async () => {
    await AppDataSource.initialize()
});

afterAll(() => {
  AppDataSource.close()
});

describe('Universities route tests', () => {
    
    test('Get all universities', async () => {
        await request(app)
        .get('/universities/')
        .expect(200)
        .expect('Content-Type', /json/);

    })

    test('Get all, filtred by country', async () => {
        await request(app)
        .get('/universities?country=Argentina')
        .expect(200)
        .expect('Content-Type', /json/);
    })

    test('Get by id', async () => {
        const universityExample = await request(app).get('/universities/');
        const _id = universityExample.body[0]._id;

        await request(app).get(`/universities/${_id}`)
        .expect(200)
        .expect('Content-Type', /json/);
    })

    test('Create a university', async () => {
        await request(app)
        .post('/universities/')
        .send({
                "name": "Test University", 
                "country": "Testland", 
                "alpha_two_code": "TE",
                "domains":[
                    "domain.edu"
                ],
                "web_pages":[
                    "http://anypage.com"
                ],   
                "state-province": "Sergipe"
        })
        .expect(201)
        .expect('Content-Type', /json/);
    })

    test('Update a university', async () => {
        const universityExample = await request(app).get('/universities?country=Testland');
        const _id = universityExample.body[0]._id;

        await request(app)
        .put(`/universities/${_id}`)
        .send({
            domains: ['test2.com'],
            web_pages: ['www.test2.com'],
            name: 'Universidade de teste'
        })
        .expect(201)
        .expect('Content-Type', /json/);
    })

    test('Delete the test university', async () => {
        const universityExample = await request(app).get('/universities?country=Testland');
        const _id = universityExample.body[0]._id;

        await request(app)
        .delete(`/universities/${_id}`)
        .expect(200);
    })

})