import React, { Fragment, useState } from "react";
import Swal from "sweetalert2";

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description)
    
    // edit description
    const updateDescription = async (event) => {
        event.preventDefault();
        if(description.trim().length === 0)  return Swal.fire({
            title: 'Error!',
            text: 'La descripcion no puede ser vacía',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        try {
            const body = { description };
            const response = await fetch(`http://localhost:5000/todos/${todo.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            window.location = "/"
        } catch (err) {
            console.error(err.message)
        }
    }


    return <Fragment>
        <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.id}`}>
            Edit
        </button>

        <div className="modal" id={`id${todo.id}`} onClick={() => setDescription(todo.description)}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Modal Heading</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={() => setDescription(todo.description)}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <input className="form-control" type="text"
                            value={description}
                            onChange={event => setDescription(event.target.value)} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={event => updateDescription(event)}>Edit</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
};

export default EditTodo;