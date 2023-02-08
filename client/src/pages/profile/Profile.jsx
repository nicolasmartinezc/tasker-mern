import { CheckToken } from '../../components/Auth'
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { NewTask, Tasks } from '../../components/Tasks'

function Profile(){
    const [ user, setUser ] = useState({})
    const [ loading, setLoading ] = useState(false)
    const [ category, setCategory ] = useState(false)
    const navigate = useNavigate()

    useEffect(()=> {
        const redirectUser = async() => {
            const token = await CheckToken()
            if (!token) navigate('/')
            else {
                setTimeout(()=> setLoading(true), 1000)
                setUser(token)
            }
        }
        redirectUser()
    }, [])

    const handleLogout = e => {
        e.preventDefault()
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        navigate('/')
    }

    const changeCategory = (e, state) => {
        e.preventDefault()
        if (state) setCategory(!category)
        else return
    }
    return(
        loading ?
            <div>
                <header className="navbar">
                    <div className="container-fluid">
                    <span className="fw-semibold text-truncate" style={{maxWidth: 210 + 'px'}}> Bienvenido {user.user} </span>
                        <div className="d-flex">
                            <button className="btn btn-outline-danger btn-sm" onClick={e => handleLogout(e)}>Cerrar Sesión</button>
                        </div>
                    </div>
                </header>
                <NewTask id={user.userId} />
                <div className='container mt-4'>
                    <button className={category? "btn btn-outline-primary btn-sm  me-1" : "btn btn-primary btn-sm me-1"} onClick={e => changeCategory(e, category)}>Sin completar</button>
                    <button className={!category? "btn btn-outline-primary btn-sm" : "btn btn-primary btn-sm"} onClick={e => changeCategory(e, !category)}>Completadas</button>
                </div>
                <Tasks user={user} isCompleted={category} />
            </div>
            :
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{height: 100 + 'vh'}}>
                <div className="spinner-border m-5" style={{width: 3 + 'rem', height: 3 + 'rem'}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
    )
}

export default Profile
