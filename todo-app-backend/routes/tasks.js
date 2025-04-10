const express = require('express');
const { checkAuth } = require('../middleware/auth')
const { createTask, getTask, updateTask, deleteTask } = require('../controllers/taskController')

//Chamando o Router do express
const router = express.Router();

//Rotas para as tasks
router.post('/newTask', checkAuth, createTask);
router.get('/tasks', checkAuth, getTask);
router.put('/editTask/:id', checkAuth, updateTask);
router.delete('/deleteTask/:id', checkAuth, deleteTask);

module.exports = router;