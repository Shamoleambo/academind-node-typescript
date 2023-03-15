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
  res.status(201).json({ message: 'Todo created', todo, todos })
})

router.put('/post/:postId', (req, res, next) => {
  const tid = req.params.postId
  const text = req.body.text

  const todoIndex = todos.findIndex(todoItem => todoItem.id === tid)
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text }
    return res.status(200).json({ message: 'Todo edited' })
  }

  res.status(404).json({ message: 'Todo item not found' })
})

export default router
