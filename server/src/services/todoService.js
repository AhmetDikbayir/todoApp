import TodoRepository from '../repository/todoRepository.js';

class TodoService {
    constructor(todoRepository) {
        this.todoRepository = TodoRepository;
    }

    async createTodo(name) {
        try {
            const newTodo = await this.todoRepository.createTodo(name);
            return newTodo;
        } catch (error) {
            throw new Error('Todo creation error:', error);
        }
    }

    async getAllTodos() {
        try {
            const todos = await TodoRepository.getAllTodos();
            return todos;
        } catch (error) {
            throw new Error(`Error while fetching todos in services: ${error.message}`);
        }
    }

    async updateTodoById(id, updateData) {
        try {
            const updatedTodo = await TodoRepository.updateTodoById(id, updateData);
            return updatedTodo;
        } catch (error) {
            console.error('Error while updating todo in service:', error.message);
            throw new Error('Error while updating todo in services');
        }
    }

    async getTodoById(id) {
        try {
            const todo = await this.todoRepository.getTodoById(id);
            return todo;
        } catch (error) {
            throw new Error('Todo retrieval error:', error);
        }
    }

    async deleteTodoById(id) {
        try {
            const result = await this.todoRepository.deleteTodoById(id);
            if (result === 0) {
                throw new Error('Todo not found');
            }
            return result;
        } catch (error) {
            throw new Error('Todo deletion error:', error);
        }
    }
}

export default new TodoService(TodoRepository);
