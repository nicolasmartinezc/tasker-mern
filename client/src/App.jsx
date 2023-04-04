import { Routes, Route } from 'react-router-dom'
import { ProtectedRouted } from './hooks/Auth'
import AllRoutes from './pages/allRoutes/AllRoutes'
import Register from './pages/register/Register'
import Profile from './pages/profile/Profile'
import Login from './pages/login/Login'

function App(){
    return(
        <main className='container'>
            <Routes>
                <Route path="/*" element={<AllRoutes />} />
                <Route path='tasker-mern/' element={<Login />} />
                <Route path='tasker-mern/register' element={<Register />} />
                <Route path='tasker-mern/profile' element={<Profile />}/>
            </Routes>
        </main>
    )
}

export default App