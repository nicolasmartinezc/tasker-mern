import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Tasks } from "../../components/Tasks"
import { Loading } from "../../components/Loading"
import { useLoading } from "../../hooks/loading"
import { getUserId } from "../../services/getUser"

function Profile(){
    const [ userId, setUserId ] = useState('')
    const [ userName, setUserName ] = useState('')
    const { isLoading, loadingFalse } = useLoading()
    const navigate = useNavigate()

    const handleLogout = e => {
        e.preventDefault()
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        navigate('/tasker-mern')
    }

    const getData = async() => {
        const { userId, user } = await getUserId()
        setUserId(userId)
        setUserName(user)
        loadingFalse()
    }

    useEffect(()=> { 
        getData()
    }, [])

    return(
        isLoading?
            <Loading></Loading>
        :
            <div>
                <header className="navbar">
                    <div className="container-fluid">
                    <span className="fw-semibold text-truncate" style={{maxWidth: 210 + 'px'}}> Bienvenido {userName} </span>
                        <div className="d-flex">
                            <button className="btn btn-outline-danger btn-sm" onClick={e => handleLogout(e)}>Cerrar Sesión</button>
                        </div>
                    </div>
                </header>
                <Tasks userId={userId}/>
            </div>
    )
}

export default Profile
