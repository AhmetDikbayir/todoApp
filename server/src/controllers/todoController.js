import TodoService from '../services/todoService.js';


class TodoController {
    async createTodo(req, res) {
        try {
            const { name } = req.body;
            const newTodo = await TodoService.createTodo(name, req.user.id);
            res.status(201).json(newTodo);
        } catch (error) {
            console.error('Todo creation error:', error);
            res.status(500).json({ message: "An error occurred while creating todo" });
        }
    }

    async getTodo(req, res) {
        try {
            const todoId = parseInt(req.params.id);
            const todo = await TodoService.getTodoById(todoId, req.user.id);

            if (!todo) {
                return res.status(404).json({ message: "Todo not found" });
            }
            res.json(todo);
        } catch (error) {
            console.error('Todo retrieval error:', error);
            res.status(500).json({ message: "An error occurred while retrieving todo" });
        }
    }

    async getAllTodos(req,res) {
        try {
            const todos = await TodoService.getAllTodos(req.user.id);
            res.json(todos);
        } catch (error) {
            if (error.message === 'Todo not found') {
                res.status(404).json({ message: error.message });
            } else {
                console.error('Database send error:', error);
                res.status(500).json({ message: 'An error occurred while getting todo' });
            }
        }
    }

    async updateTodo(req, res) {
        try {
            const todoId = parseInt(req.params.id);
            const updateData = req.body;
            const updatedTodo = await TodoService.updateTodoById(todoId, updateData, req.user.id);
            res.json(updatedTodo);
        } catch (error) {
            console.error('Error while updating todo in controller:', error);
            res.status(500).json({ message: "An error occurred while updating todo" });
        }
    }

    async deleteTodo(req, res) {
        try {
            const todoId = parseInt(req.params.id);
            await TodoService.deleteTodoById(todoId, req.user.id);
            res.json({ message: "Todo deleted successfully" });
        } catch (error) {
            console.error('Todo deletion error:', error);
            res.status(500).json({ message: error.message });
        }
    }
}

export default new TodoController();