import '../../App.css'
import Navbar from '../../components/Navbar'
import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Accueil() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'))
        if (data) {
            setUser(data)
        }
    }, [])

    if (user === null) {
        return (
            <div className='flex h-1/2 items-center justify-center'>
                <p>Veuillez vous reconnecter en cliquant ici: </p>
                <button
                    className='w-auto rounded-lg bg-gray-700 p-2 px-7 text-white hover:bg-gray-800'
                    onClick={() => navigate('/login')}
                >
                    Ici
                </button>
            </div>
        )
    }

    const nom = user.nom || ''
    const prenom = user.prenom || ''

    return (
        <>
            <Navbar />
            <div>Bonjour, {nom} {prenom}</div>
            <Outlet />
        </>
    )
}

