import { useState } from "react"

export function NewTask({ id }){
    const date = new Date
    const currentDate = date.toISOString().split('T')[0]
    const [task, setTask] = useState({
        id: id,
        title: '',
        description: '',
        dueDate: currentDate,
        completed: false,
    })

    const handleSubmit = async(e) => {
        e.preventDefault()
        // console.log(task)
        if (!task.title) return // Titulo vacio (es obligatorio)
        const res = fetch('', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {'Content-Type': 'application/json'}
        })
    }

    const handleTyping = e => {
        const newTask = { ...task }
        newTask[e.target.id] = e.target.value
        setTask(newTask)
    }

    return(
        <div className="container">
            <div className='d-flex justify-content-between py-2 '>
                <input type="text" className="form-control" placeholder="Titulo *" maxLength="30" id="title" onChange={e => handleTyping(e)}/>
                <input type="date" className="form-control mx-2" placeholder="Fecha" id="dueDate" min={currentDate} defaultValue={currentDate} onChange={e => handleTyping(e)}/>
                <button type="button" className="btn btn-outline-success btn-sm" onClick={e => handleSubmit(e)}>Añadir tarea</button>
            </div>
            <div className="form-floating">
                <textarea className="form-control" placeholder="Añadir comentario (Opcional)" maxLength="50" id="description" onChange={e => handleTyping(e)}></textarea>
                <label>Añadir comentario (Opcional)</label>
            </div>
        </div>
    )
}

export function Tasks({ user }){
    const { task } = user // No se actualiza con la sesion iniciada

    const UncompletedTask = ({ title, dueDate, description }) => {
        return(
            <div className="card col">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <span>Para: {dueDate}</span>
                    <p className="card-text">{description}</p>
                    <button type="button" className="btn btn-outline-primary">Completar</button>
                </div>
            </div>  
        )    
    }

    return(
        <div className="container row row-cols-2 m-0 mt-3">
            {
            task.map(({_id, title, dueDate, description, completed}) => {
                if (completed){
                    return(       
                        <UncompletedTask key={_id} title={title} dueDate={dueDate} description={description} />         
                    )
                }
            })
            }
        </div>
    )
}
