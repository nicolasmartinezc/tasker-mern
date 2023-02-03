import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Register(){
    const API_URL = 'http://localhost:3000/api/register'
    const navigate = useNavigate()
    const [user, setuser] = useState({
        user: '',
        password: ''
    })

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (user.user === '') return // Si el usuario esta vacio
        else if (user.password === '') return // Si la contraseña esta vacia

        try {
            const res = await fetch(API_URL, {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {'Content-Type': 'application/json'}
                })
            // Agegar aviso de registro exitoso o usuario ya creado
            const data = await res.json()
            if (data) console.log("Ya esta creado"); // Cuenta ya creada
            else if (!data) {
                navigate("/") // Cuenta creada exitosamente
            } else {
                console.log("Error: " + data.message); // Error de creacion de cuenta
            }
        } catch (error) {
            // Aqui pondria un mensaje de error de conexion a la API
        }
    }

    const handleTyping = e => {
        const newUser = { ...user }
        newUser[e.target.id] = e.target.value
        setuser(newUser)
    }

    return (
        <div className="container mt-3"> 
            <form onSubmit={e => handleSubmit(e)}>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="user" placeholder="Usuario" onChange={e => handleTyping(e)}/>
                    <label>Usuario</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Contraseña" autoComplete="on" onChange={e => handleTyping(e)}/>
                    <label>Contraseña</label>
                </div>
                <button type="submit" className="btn btn-primary me-2">Registrarse</button>
                <Link to='/' className="btn btn-primary">Volver</Link>
            </form>
        </div>
    )
}

export default Register