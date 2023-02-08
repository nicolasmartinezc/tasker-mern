import { useState } from "react"

export function NewTask({ id }){
    const date = new Date
    const currentDate = date.toISOString().split('T')[0]
    const [task, setTask] = useState({
        id: id,
        title: '',
        description: '',
        date: currentDate,
        completed: false,
    })

    const handleSubmit = async(e) => {
        e.preventDefault()
        // console.log(task)
        if (!task.title) return // Titulo vacio (es obligatorio)
        const res = await fetch('http://localhost:3000/api/new-task', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        console.log(data)
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
                <input type="date" className="form-control mx-2" placeholder="Fecha" id="date" min={currentDate} defaultValue={currentDate} onChange={e => handleTyping(e)}/>
                <button type="button" className="btn btn-outline-success btn-sm" onClick={e => handleSubmit(e)}>Añadir tarea</button>
            </div>
            <div className="form-floating">
                <textarea className="form-control" placeholder="Añadir comentario (Opcional)" maxLength="50" id="description" onChange={e => handleTyping(e)}></textarea>
                <label>Añadir comentario (Opcional)</label>
            </div>
        </div>
    )
}

export function Tasks({ user, isCompleted }){
    const { task } = user // No se actualiza con la sesion iniciada

    const Task = ({ title, date, description }) => {
        return(
            <div className="card col">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <span>{date}</span>
                    <p className="card-text">{description}</p>
                    <button type="button" className="btn btn-outline-primary me-2">Completar</button>
                    <button type="button" className="btn btn-outline-danger">Borrar</button>
                </div>
            </div>  
        )    
    }

    return(
        <div className="container row row-cols-2 m-0 mt-3">
            {
                task.map(({_id, title, date, description, completed}) => {
                    if(!isCompleted){
                        if (!completed) return <Task key={_id} title={title} date={'Para: ' + date} description={description} />           
                    } else if (completed) return <Task key={_id} title={title} date={'Finalizado: ' + date} description={description} />   
                })
            }
        </div>
    )
}
