import Todo from '../models/todo.js';

class TodoRepository {
    async createTodo(name) {
        try {
            const newTodo = await Todo.create({ name });
            return newTodo;
        } catch (error) {
            console.error('Database error during todo creation:', error);
            throw error;
        }
    }

    async getAllTodos() {
        try {
            const todos = await Todo.findAll();
            return todos;
        } catch (error) {
            throw new Error('Database query error');
        }
    }

    async updateTodoById(id, updateData) {
        try {
            const todo = await Todo.findByPk(id);
            if (!todo) {
                throw new Error('Todo not found');
            }
            const updatedTodo = await todo.update(updateData);
            return updatedTodo;
        } catch (error) {
            console.error('Error while updating todo in repository:', error);
            throw new Error('Error while updating todo in repository');
        }
    }



    async getTodoById(id) {
        try {
            const todo = await Todo.findByPk(id);
            return todo;
        } catch (error) {
            console.error('Database error during todo retrieval:', error);
            throw error;
        }
    }

    async deleteTodoById(id) {
        try {
            const result = await Todo.destroy({
                where: { id }
            });
            return result;
        } catch (error) {
            console.error('Database error during todo deletion:', error);
            throw error;
        }
    }
}

export default new TodoRepository();
