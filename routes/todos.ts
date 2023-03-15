import { Router } from 'express'
import { Todo } from '../models/todo'

const todos: Array<Todo> = []

const router = Router()

router.get('/', (req, res, next) => {
  res.status(200).json({ todos })
})


export default router
