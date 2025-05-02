import Navbar from '../../components/Navbar'
import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import imgDoc from '../../assets/doctor.webp'

export default function Accueil() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'))
        if (data) {
            setUser(data)
        } else {
            navigate('/login')
        }
    }, [navigate])

    return (
        <>
            <Navbar />
            {location.pathname === '/accueil' && (
                <div className="flex flex-col items-center p-4">
                    <img
                        src={imgDoc}
                        alt="Image Médecin Accueil"
                        className="w-1/3 max-w-4xl object-contain"
                    />
                    {user && (
                        <p className="mt-4 text-xl font-semibold text-gray-700">
                            Bienvenue {user.prenom} {user.nom}
                        </p>
                    )}
                </div>
            )}

            <Outlet />
        </>
    )
}