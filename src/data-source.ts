import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: process.env.DB_URL,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    useUnifiedTopology: true
})  