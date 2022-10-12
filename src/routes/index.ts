import { Router } from "express"
import universities from './universities'

const routes = Router()

routes.use("/universities",universities)

export default routes