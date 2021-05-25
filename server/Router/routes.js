const express = require('express')
const app = express()
const router = express.Router()

const TodosController = require('../Controller/TodosController');

router.get('/todos', TodosController.getTodos);
router.post('/todos', TodosController.postTodos);
router.put('/todos/:id', TodosController.updateTodos);
router.delete('/todos/:id', TodosController.deleteTodos);

module.exports = router