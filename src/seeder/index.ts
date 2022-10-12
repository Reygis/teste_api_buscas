import axios from 'axios';
import { University } from '../entities/Universities';
import { universitiesRepository } from '../repositories/universitiesRepository';
import { AppDataSource } from '../data-source'


AppDataSource.initialize().then(async () => {

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

        await axios.get(`${APIurl}${country}`).then(async res => {

            for (const data of res.data) {

                let newUniversity: University = new University()
                newUniversity.name = data.name
                newUniversity.country = data.country
                newUniversity.alpha_two_code = data.alpha_two_code
                newUniversity.web_pages = data.web_pages
                newUniversity.domains = data.domains
                newUniversity['state-province'] = data['state-province']

                await universitiesRepository.save(newUniversity)

            }


        }).catch(error => console.log(error))

    }
    process.exit();

})


