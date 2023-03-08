export const newAccount = async(newAccount) => {
    try {
        const response = await fetch("http://localhost:3000/api/register", {
                method: 'POST',
                body: JSON.stringify(newAccount),
                headers: {'Content-Type': 'application/json'}
            })
        return response.json()
    } catch {
        // Error de conexion a la API
        throw new Error({success: false, message: "Ha ocurrido un error inesperado, por favor intentelo mas tarde"})
    }
}