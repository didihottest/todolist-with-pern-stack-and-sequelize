import React, { Fragment } from "react";
import './App.css';
// components
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";
import Header from "./components/Header";

function App() {
    return (
        <Fragment>
            <Header />
            <div className="container">
                <InputTodo />
            </div>
            <div className="container">
                <ListTodo />
            </div>
        </Fragment>
    );
}

export default App;
