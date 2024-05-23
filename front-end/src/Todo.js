import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosConfig';
import './Todo.css';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editTodo, setEditTodo] = useState(null);
    const [editText, setEditText] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await axiosInstance.get('/todos');
            setTodos(response.data);
        };
        fetchTodos();
    }, []);

    const addTodo = async () => {
        if (newTodo.trim()) {
            const response = await axiosInstance.post('/todos', { text: newTodo });
            setTodos([...todos, response.data]);
            setNewTodo('');
        }
    };

    const deleteTodo = async (id) => {
        await axiosInstance.delete(`/todos/${id}`);
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleComplete = async (id) => {
        const todo = todos.find(todo => todo.id === id);
        const response = await axiosInstance.put(`/todos/${id}`, { completed: !todo.completed });
        setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
    };

    const startEditing = (id, text) => {
        setEditTodo(id);
        setEditText(text);
    };

    const saveTodo = async (id) => {
        const response = await axiosInstance.put(`/todos/${id}`, { text: editText });
        setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
        setEditTodo(null);
        setEditText('');
    };


    return (
        <div className="todo-container">
            <h2>Todo List</h2>
            <div className="todo-input">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={addTodo}>Add</button>
            </div>
            <ul className="todo-list">
                {todos.map(todo => (
                    <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleComplete(todo.id)}
                        />
                        {editTodo === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <button onClick={() => saveTodo(todo.id)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>{todo.text}</span>
                                <button onClick={() => startEditing(todo.id, todo.text)}>Edit</button>
                            </>
                        )}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;