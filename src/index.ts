import app from "./app"
import {AppDataSource} from "./data-source"

const port = process.env.PORT || 3333

AppDataSource.initialize().then(()=>{
    app.listen(port, ()=>{
        console.log('Server online on port :: http://localhost:'+port)
    })
});