"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const todo = {
        id: new Date().toLocaleTimeString(),
        text: body.text
    };
    todos.push(todo);
    res.status(201).json({ message: 'Todo created', todo, todos });
});
router.put('/post/:todId', (req, res, next) => {
    const params = req.params;
    const body = req.body;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === params.todId);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res
            .status(200)
            .json({ message: 'Todo edited', todo: todos[todoIndex], todos });
    }
    res.status(404).json({ message: 'Todo item not found' });
});
router.delete('/post/:todId', (req, res, next) => {
    const params = req.params;
    todos = todos.filter(todoItem => todoItem.id !== params.todId);
    res.status(200).json({ message: 'Deleted todo', todos });
});
exports.default = router;
