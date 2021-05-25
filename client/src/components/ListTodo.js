import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {
    const [todos, setTodos] = useState([]);

    //delete todo 
    const deleteTodo = async id => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            })
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (err) {
            console.error(err.message)
        }
    }

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();
            setTodos(jsonData.todos);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);
    return <Fragment>
        <table className="table mt-5 text-center">
            <thead>
                <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {todos.map(todo => (
                    <tr key={todo.id}>
                        <td>{todo.description}</td>
                        <td><EditTodo todo={todo} /></td>
                        <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Fragment>;
};

export default ListTodo;