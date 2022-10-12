import { Router } from "express"
import { UniversitiesController } from "../controllers/UniversitiesController"

const router = Router()

router.get('/',UniversitiesController.getAll)
router.get('/:id',UniversitiesController.getById)
router.post('/',UniversitiesController.create)
router.put('/:id',UniversitiesController.update)
router.delete('/:id',UniversitiesController.delete)

export default router