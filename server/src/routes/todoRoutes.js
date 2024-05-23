import express from 'express';
import TodoController from '../controllers/todoController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', authMiddleware, TodoController.createTodo);
router.get('/', authMiddleware, TodoController.getAllTodos);
router.put('/:id', authMiddleware, TodoController.updateTodo);
router.get('/:id', authMiddleware, TodoController.getTodo);
router.delete('/delete/:id', authMiddleware, TodoController.deleteTodo);

export default router;