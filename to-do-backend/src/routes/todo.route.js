import { Router } from 'express'
import TodoController from '../controllers/todo.controller.js'

const router = Router()

router.get("/getall", TodoController.getAll)

router.post("/todo", TodoController.createtodo)

router.get("/get-todo:id", TodoController.getbyId)

router.delete("/:id", TodoController.delete)

router.put("/:id", TodoController.update)

export default router;