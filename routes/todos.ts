import { Router } from 'express'
import { Todo } from '../models/todo'

const todos: Array<Todo> = []

const router = Router()

router.get('/', (req, res, next) => {
  res.status(200).json({ todos })
})

router.post('/todo', (req, res, next) => {
  const todo: Todo = {
    id: new Date().toLocaleString(),
    text: req.body.text
  }

  todos.push(todo)
})

export default router
