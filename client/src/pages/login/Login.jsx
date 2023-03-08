import { useNavigate, Link } from "react-router-dom"
import { newSession } from '../../services/login'
import { useState } from "react"

function Login(){
    const navigate = useNavigate()
    const [ error, setError ] = useState('')
    const [user, setuser] = useState({
        user: '',
        password: ''
    })
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const { success, message } = await newSession(user)
        if (success){
            navigate('/profile')
        } else{
            setError(message)
        }
    }

    const handleTyping = e => {
        const newUser = { ...user }
        newUser[e.target.id] = e.target.value
        setuser(newUser)
    }

    return (
        <div className="container mt-3" onSubmit={e => handleSubmit(e)}> 
            <form>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="user" placeholder="Usuario" autoComplete="on" onChange={e => handleTyping(e)} required/>
                    <label>Usuario</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Contraseña" autoComplete="on" onChange={e => handleTyping(e)} required/>
                    <label>Contraseña</label>
                </div>
                <div className="text-danger">
                    <p id="textError">{ error }</p>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary me-2">Iniciar sesion</button>
                    <Link to='/register' className="btn btn-primary">Registrarse</Link>
                </div>
            </form>
        </div>
    )
}

export default Login