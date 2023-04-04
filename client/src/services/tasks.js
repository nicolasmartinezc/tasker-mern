export const newTask = async(task) => {
    try{
        const res = await fetch('https://tasker-server-0oxg.onrender.com/api/new-task', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {'Content-Type': 'application/json'}
        })
        return await res.json()
    } catch (e) {
        // Ocurrió un error al agregar el nuevo task
        throw new Error(false)
    }
}

export const getTasks = async(userId) => {
    try{
        const res = await fetch(`https://tasker-server-0oxg.onrender.com/api/get-tasks?userId=${userId}`)
        return await res.json()
    } catch (e) {
        // Ocurrió un error al obtener las tareas
    }
}

export const updateTask = async(userId, taskId) => {
    try{
        const res = await fetch('https://tasker-server-0oxg.onrender.com/api/completed-task', {
            method: 'POST',
            body: JSON.stringify({userId, taskId}),
            headers: {'Content-Type': 'application/json'}
        })
        return await res.json()
    } catch (e) {
        // Ocurrió un error al actualizar la tarea
    }
}

export const deleteTask = async(userId, taskId) => {
    try{
        const res = await fetch('https://tasker-server-0oxg.onrender.com/api/delete-task', {
            method: 'POST',
            body: JSON.stringify({userId, taskId}),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
    } catch (e) {
        // Ocurrió un error al eliminar la tarea
    }
}