const express = require('express');
const { checkAuth } = require('../middleware/auth')
const { createTask, getTask, updateTask, deleteTask, getTaskById } = require('../controllers/taskController')

//Chamando o Router do express
const router = express.Router();

//Rotas para as tasks
router.post('/newTask', checkAuth, createTask);
router.get('/tasks', checkAuth, getTask);
router.get('/task/:id', checkAuth, getTaskById);
router.put('/editTask/:id', checkAuth, updateTask);
router.delete('/deleteTask/:id', checkAuth, deleteTask);

module.exports = router;