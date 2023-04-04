export const newAccount = async(newAccount) => {
    try {
        const response = await fetch("https://tasker-server-0oxg.onrender.com/api/register", {
                method: 'POST',
                body: JSON.stringify(newAccount),
                headers: {'Content-Type': 'application/json'}
            })
        return response.json()
    } catch {
        // Error de conexión a la API
        throw new Error({success: false, message: "Ha ocurrido un error inesperado, por favor inténtelo mas tarde"})
    }
}