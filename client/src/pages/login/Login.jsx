import { useState, useEffect } from "react"
import { CheckToken } from '../../components/Auth'
import { useNavigate, Link } from "react-router-dom"

function Login(){
    const API_URL = 'http://localhost:3000/api/login'
    const navigate = useNavigate()
    const [user, setuser] = useState({
        user: '',
        password: ''
    })

    useEffect(()=> {
        const redirectUser = async() => {
            const token = await CheckToken()
            if (!token) navigate('/') 
            else navigate('/profile')
        }
        redirectUser()
    }, [])
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        // if (user.user === '') return // Si el usuario esta vacio
        // else if (user.password === '') return // Si la contraseña esta vacia
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {'Content-Type': 'application/json'}
            })
            const data = await res.json()
            if(res.status === 400) return // Contraseña o usuarios incorrectos
            else{        
                let date = new Date()
                date.setTime(date.getTime() + (86400*1000))
                const expires = date.toGMTString()
                document.cookie = `token=${data.token}; expires=${expires}+; path=/; samesite=strict`
                navigate('/profile')
            }
        }
        catch (e) {
            console.log(e);
            // Error al realizar el fetch
        }
    }

    const handleTyping = e => {
        const newUser = { ...user }
        newUser[e.target.id] = e.target.value
        setuser(newUser)
    }

    return (
        <div className="container mt-3"  onSubmit={e => handleSubmit(e)}> 
            <form>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="user" placeholder="Usuario" autoComplete="on" onChange={e => handleTyping(e)}/>
                    <label>Usuario</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Contraseña" autoComplete="on" onChange={e => handleTyping(e)}/>
                    <label>Contraseña</label>
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