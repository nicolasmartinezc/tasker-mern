export const newSession = async( user ) => {
    try {
        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        if(res.status !== 400){ // Error 400: Usuario o contraseña incorrecto    
            let date = new Date()
            date.setTime(date.getTime() + (86400*1000))
            const expires = date.toGMTString()
            document.cookie = `token=${data.token}; expires=${expires}+; path=/; samesite=strict`
        }
        return data
    }
    catch (e) {
        // Error de conexion a la API
        throw new Error({success: false, message: "Ha ocurrido un error inesperado, por favor intentelo mas tarde"})
    }
}