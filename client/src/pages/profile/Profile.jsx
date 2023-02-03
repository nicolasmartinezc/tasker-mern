import { checkToken } from '../../components/Auth'
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

function Profile(){
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    useEffect(()=> {
        const redirectUser = async() => {
            const token = await checkToken()
            if (!token) navigate('/')
            else setUser(token)
        }
        redirectUser()
    }, [])
    console.log(user);
    return(
        <h1>{`Hola mundo ${user.user}`}</h1>
    )
}

export default Profile
