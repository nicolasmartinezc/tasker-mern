import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { newAccount } from '../../services/register'

function Register(){
    const navigate = useNavigate()
    const [ error, setError ] = useState('') 
    const [ user, setuser ] = useState({
        user: '',
        password: ''
    })

    const handleSubmit = async(e) => {
        e.preventDefault()
        const { success, message } = await newAccount(user)
        if (success) {
            navigate('/')
        }
        else{
            setError(message)  
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
                    <input type="text" className="form-control" id="user" placeholder="Usuario" onChange={e => handleTyping(e)} required/>
                    <label>Usuario</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Contraseña" autoComplete="on" onChange={e => handleTyping(e)} required/>
                    <label>Contraseña</label>
                </div>
                <div className="text-danger">
                    <p id="textError">{ error }</p>
                </div>
                <button type="submit" className="btn btn-primary me-2">Registrarse</button>
                <Link to='/' className="btn btn-primary">Volver</Link>
            </form>
        </div>
    )
}

export default Register