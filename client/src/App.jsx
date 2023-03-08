import { Routes, Route } from 'react-router-dom'
import { ProtectedRouted } from './hooks/Auth'
import Register from './pages/register/Register'
import Profile from './pages/profile/Profile'
import Login from './pages/login/Login'

function App(){
    return(
        <main className='container'>
            <Routes>
                <Route path='/' element={<ProtectedRouted> <Login /> </ProtectedRouted>} />
                <Route path='/register' element={<ProtectedRouted> <Register /> </ProtectedRouted>} />
                <Route path='/profile' element={<ProtectedRouted> <Profile /> </ProtectedRouted>}/>
            </Routes>
        </main>
    )
}

export default App