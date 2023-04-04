import { useEffect, useState } from "react"
import { newTask, getTasks, updateTask, deleteTask } from "../services/tasks"

export const Tasks = ({ userId }) => {
    const date = new Date
    const currentDate = date.toISOString().split('T')[0]
    const [ category, setCategory ] = useState(false)
    const [ userTask, setUserTask ] = useState([])
    const [ error, setError ] = useState('')
    const [ task, setTask ] = useState({
        id: userId,
        title: '',
        description: '',
        date: currentDate,
        completed: false,
    })

    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await newTask(task)
        if (response){
            e.target.reset()
            getUserTask()
            setError('')
        } else {
            setError('Ha ocurrido un error al agregar la tarea')
        }
    }

    const handleTyping = e => {
        const newTask = { ...task }
        newTask[e.target.id] = e.target.value
        setTask(newTask)
    }
    
    const changeCategory = (e, state) => {
        e.preventDefault()
        if (state) setCategory(!category)
        else return
    }

    const getUserTask = async() => {
        const data = await getTasks(userId)
        setUserTask(data)
    }

    useEffect(()=> {
        getUserTask()
    }, [])
    
    const finishTask = async(taskId) => {
        await updateTask(userId, taskId) // Retorna true o false para saber si se realizo la petición con éxito
        getUserTask()
    }

    const removeTask = async(taskId) => {
        await deleteTask(userId, taskId) // Retorna true o false para saber si se realizo la petición con éxito
        getUserTask()
    }

    return(
        <div>
            <div className="container" onSubmit={e => handleSubmit(e)}>
                <form>
                    <div className='d-flex justify-content-between py-2 '>
                        <input type="text" className="form-control" placeholder="Titulo *" maxLength="30" id="title" onChange={e => handleTyping(e)} required/>
                        <input type="date" className="form-control mx-2" placeholder="Fecha" id="date" min={currentDate} defaultValue={currentDate} onChange={e => handleTyping(e)}/>
                        <button type="submit" className="btn btn-outline-success btn-sm">Añadir tarea</button>
                    </div>
                    <div className="">
                        <textarea className="form-control" placeholder="Añadir comentario (Opcional)" maxLength="50" id="description" onChange={e => handleTyping(e)}></textarea>
                    </div>
                    <div className="text-danger">
                        <p id="textError">{ error }</p>
                    </div>
                </form>
            </div>

            <div className='container mt-4'>
                    <button className={category? "btn btn-outline-primary btn-sm  me-1" : "btn btn-primary btn-sm me-1"} onClick={e => changeCategory(e, category)}>Sin completar</button>
                    <button className={!category? "btn btn-outline-primary btn-sm" : "btn btn-primary btn-sm"} onClick={e => changeCategory(e, !category)}>Completadas</button>
            </div>

            <div className="container row row-cols-2 m-0 mt-3">
                {
                    userTask.map(({_id, title, date, description, completed}) => {
                        if(category === completed){
                            return(
                                <div key={_id} className="card col">
                                    <div className="card-body">
                                        <h5 className="card-title">{title}</h5>
                                        <span>{completed? "Finalizado:" : "Para:"} {date}</span>
                                        <p className="card-text">{description}</p>
                                        <button type="button" className={completed? "visually-hidden" : "btn btn-outline-primary mb-2 me-2"} onClick={() => finishTask(_id)}>Completar</button>
                                        <button type="button" className="btn btn-outline-danger mb-2" onClick={() => removeTask(_id)}>Borrar</button>
                                    </div>
                                </div>  
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}
