import { Router } from 'express'
import { Todo } from '../models/todo'

type RequestBody = { text: string }
type RequestParams = { todId: string }

let todos: Array<Todo> = []

const router = Router()

router.get('/', (req, res, next) => {
  res.status(200).json({ todos })
})

router.post('/todo', (req, res, next) => {
  const body = req.body as RequestBody

  const todo: Todo = {
    id: new Date().toLocaleTimeString(),
    text: body.text
  }

  todos.push(todo)
  res.status(201).json({ message: 'Todo created', todo, todos })
})

router.put('/post/:todId', (req, res, next) => {
  const params = req.params as RequestParams
  const body = req.body as RequestBody

  const todoIndex = todos.findIndex(todoItem => todoItem.id === params.todId)
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text }
    return res
      .status(200)
      .json({ message: 'Todo edited', todo: todos[todoIndex], todos })
  }

  res.status(404).json({ message: 'Todo item not found' })
})

router.delete('/post/:todId', (req, res, next) => {
  const params = req.params as RequestParams

  todos = todos.filter(todoItem => todoItem.id !== params.todId)

  res.status(200).json({ message: 'Deleted todo', todos })
})

export default router
