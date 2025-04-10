const express = require('express');
const { checkAuth } = require('../middleware/auth')
const { createTask, getTask, updateTask, deleteTask } = require('../controllers/taskController')

const router = express.Router();

router.post('/newTask', checkAuth, createTask);
router.get('/tasks', checkAuth, getTask);
router.put('/editTask/:id', checkAuth, updateTask);
router.delete('/deleteTask/:id', checkAuth, deleteTask);

module.exports = router;