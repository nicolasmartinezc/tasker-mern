import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { Loading } from "../components/Loading"
import { useLoading } from './loading'

export const ProtectedRouted = ({ children }) => {
    const { isLoading, loadingFalse, loadingTrue } = useLoading()
    const [ isAuthorized, setIsAuthorized ] = useState(false)

    const checkToken = async() => {
        const token = document.cookie.replace('token=', '')
        try{
            if (token === '') {
                setIsAuthorized(false)
            } else{
                const res = await fetch('http://localhost:3000/api/verify-token', {
                                    method: 'POST',
                                    headers: { 'authorization': token }
                                })
                const data = await res.json()
                if(data) setIsAuthorized(true)
            }
        } catch (e) {
            console.log(`Error: ${e}`)
        } finally {
            setTimeout(()=>{
                loadingFalse()
            }, 750)
        }   
    } 
    
    useEffect(()=> {
        loadingTrue()
        checkToken()
    }, [children])

    if (children[1].type.name === 'Profile') {
        return (
            isLoading?
                <Loading />
                :
                isAuthorized?
                    children
                    :
                    <Navigate to='/'/>
        )
    }

    return (
        isLoading?
            <Loading />
            :
            isAuthorized?
                <Navigate to='/profile'/>
                :
                children
    )
}