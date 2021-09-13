import React, { Fragment, useState } from "react";
import Accordion from "./Accordion";
import logo from "../logo.png";
import Swal from 'sweetalert2'

const InputTodo = () => {
    const [description,
        setDescription] = useState("");
    const [category, 
        setCategory] = useState("");
    const [choosedCategory, 
            setChoosedCategory] = useState("");
    const [categories, 
        setCategories] = useState([]);
    
    const onSubmitForm = async (event) => {
        event.preventDefault();
        if(description.trim().length===0) return showError("description");
        if(choosedCategory.trim().length==0) return showError("choose category");

        try {
            const body = {
                description,
                category: choosedCategory,
            };
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            window.location = "/";
            console.log(response)
        } catch (err) {
            console.error(err.message)
        }
    }

    function addCategory(){
        if(category.trim().length === 0) return showError("category");
        setCategories([...categories,category]);
        setCategory('');
    }

    function swal(text){
        return Swal.fire({
            title: 'Error!',
            text: text,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
    }

    function showError(error){
        switch(error){
            case "category":
                return swal("La categoría no puede ser vacía");
            case "description":
                return swal("El item no puede ser vacío");
            case "choose category":
                return swal("El item debe tener una categoría asociada");
            default:
                return;
        }
        
    }

    function setChoosedCat(event, text){
        event.preventDefault();
        setChoosedCategory(text)
    }

    return (
        <Fragment>
            <div style={{height:"20px"}}></div>
            <Accordion
            className="mt-5"
            accordionNumber="accordion1"
            collapsed={true} 
            buttonName="Agregar categoría"
            Component={
                <div className="d-flex">
                <input
                    type="text"
                    className="form-control mr-5"
                    name=""
                    id=""
                    value={category}
                    placeholder="nueva categoría"
                    data-bs-toggle="tooltip" data-bs-placement="left" title="Agrega nueva categoría al dropdown"
                    onChange={event => setCategory(event.target.value)} />
                <button className="btn btn-success" onClick={addCategory}>Add Category</button>
            </div>
            }/>
            <hr/>
            <Accordion
            className="mt-5"
            accordionNumber="accordion2"
            collapsed={true} 
            buttonName="Agregar Item"
            Component={
                <div>
                <form className="d-flex mt-2" onSubmit={onSubmitForm}>
                    <input
                        type="text"
                        className="form-control mr-5"
                        name=""
                        id=""
                        value={description}
                        placeholder="nuevo item"
                    data-bs-toggle="tooltip" data-bs-placement="left" title="Agrega nuevo item al TODO LIST"
                        onChange={event => setDescription(event.target.value)} />
                    <button type="submit" className="btn btn-success">Add</button>

                    <div class="dropdown ml-2">
                        <button class="btn btn-success dropdown-toggle" type="button" data-toggle="dropdown" >
                        <span class="caret">{choosedCategory !== "" ? choosedCategory: "Category"}</span></button>
                        <ul class="dropdown-menu">
                            {
                                categories.length !== 0 ? (
                                    categories.map( (buttonName) => (
                                        <button className="btn dropdown-item text-center text-primary" onClick={(event)=>setChoosedCat(event,buttonName)}>{buttonName}</button>
                                    ))
                                ) : null 
                            }
                        </ul>
                    </div>
                </form>
                <p className="mt-3 text-primary">La categoría de su item es: {choosedCategory}</p>
                </div>
            }
            />
            <hr/>
        </Fragment>
    );
};

export default InputTodo;
