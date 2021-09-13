import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {
    const [todos, setTodos] = useState([]);
    const [choosedCategory, 
        setChoosedCategory] = useState("todos");
    const [categories, 
        setCategories] = useState([]);

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

    const getTodos = async (text) => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();

            let arrCategories = []
            jsonData.todos.map(element => {
                if(categories.includes(element.category)) return;

                arrCategories.push(element.category)

                return;
            });
            setCategories(arrCategories)

            if(text==="todos"){
                setTodos([])
                setTodos(jsonData.todos);
                return;
            }

            setTodos([])
            let arr = []
            jsonData.todos.map(element => {
                if(element.category===text){
                    arr.push(element);
                }
                return;
            });
            setTodos(arr);
        } catch (err) {
            console.error(err.message);
        }
    };

    function filter(text){
        setChoosedCategory(text)
        getTodos(text)
    }

    useEffect(() => {
        getTodos("todos");
    }, []);
    return <Fragment>
        <div  className="d-flex mb-4">
            <span className="mt-2 text-primary">Filtrar por categoría</span>
            <span style={{flexGrow:"1"}}></span>
            <div class="dropdown ml-2 mr-4">
                <button class="btn btn-success dropdown-toggle" type="button" data-toggle="dropdown" >
                <span class="caret">{choosedCategory !== "todos" ? choosedCategory: "todos"}</span></button>
                <ul class="dropdown-menu">
                <button className="btn dropdown-item text-center text-primary" onClick={()=>filter("todos")}>todos</button>
                    {
                        categories.length !== 0 ? (
                            categories.map( (buttonName) => (
                                <button className="btn dropdown-item text-center text-primary" onClick={()=>filter(buttonName)}>{buttonName}</button>
                            ))
                        ) : null 
                    }
                </ul>
            </div>
        </div>

        <table className="table text-center">
            <thead>
                <tr className="violetBG text-white">
                    <th scope="col">Description</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {todos.map(todo => (
                    <tr key={todo.id}>
                        <td className="text-primary" >{todo.description}</td>
                        <td><EditTodo todo={todo} /></td>
                        <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Fragment>;
};

export default ListTodo;