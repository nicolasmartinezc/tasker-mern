export const newTask = async(task) => {
    try{
        const res = await fetch('http://localhost:3000/api/new-task', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {'Content-Type': 'application/json'}
        })
        return await res.json()
    } catch (e) {
        // Ocurrio un error al agregar el nuevo task
        throw new Error(false)
    }
}

export const getTasks = async(userId) => {
    try{
        const res = await fetch(`http://localhost:3000/api/get-tasks?userId=${userId}`)
        return await res.json()
    } catch (e) {
        // Ocurrio un error al obtener las tareas
    }
}

export const updateTask = async(userId, taskId) => {
    try{
        const res = await fetch('http://localhost:3000/api/completed-task', {
            method: 'POST',
            body: JSON.stringify({userId, taskId}),
            headers: {'Content-Type': 'application/json'}
        })
        return await res.json()
    } catch (e) {
        // Ocurrio un error al actualizar la tarea
    }
}

export const deleteTask = async(userId, taskId) => {
    try{
        const res = await fetch('http://localhost:3000/api/delete-task', {
            method: 'POST',
            body: JSON.stringify({userId, taskId}),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
    } catch (e) {
        // Ocurrio un error al eliminar la tarea
    }
}