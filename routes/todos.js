"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos });
});
router.post('/todo', (req, res, next) => {
    const todo = {
        id: new Date().toLocaleTimeString(),
        text: req.body.text
    };
    todos.push(todo);
    res.status(201).json({ message: 'Todo created', todo, todos });
});
router.put('/post/:postId', (req, res, next) => {
    const tid = req.params.postId;
    const text = req.body.text;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text };
        return res
            .status(200)
            .json({ message: 'Todo edited', todo: todos[todoIndex], todos });
    }
    res.status(404).json({ message: 'Todo item not found' });
});
router.delete('/post/:postId', (req, res, next) => {
    const tid = req.params.postId;
    todos = todos.filter(todoItem => todoItem.id !== tid);
    res.status(200).json({ message: 'Deleted todo', todos });
});
exports.default = router;
