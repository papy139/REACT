import React from 'react'
import logo from '../assets/logo.webp'
import { useNavigate, Link } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()

    function handleLogout() {
        const confirmation = window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')
        if (confirmation) {
            localStorage.removeItem('user')
            navigate('/login')
        }
    }

    return (
        <nav className='flex items-center justify-between bg-blue-600 p-5'>
            <div className='flex items-center'>
                <img src={logo} alt='Logo' className='h-10 w-10 rounded' />
            </div>
            <div className='ml-10 flex-1 justify-center space-x-6 text-center'>
                <Link to='/accueil' className='rounded-lg bg-gray-700 p-2 px-7 text-white hover:bg-gray-800'>Dashboard</Link>
                <Link to='/accueil/rapports' className='rounded-lg bg-gray-700 p-2 px-7 text-white hover:bg-gray-800'>Rapport</Link>
                <Link to='/accueil/medecins' className='rounded-lg bg-gray-700 p-2 px-7 text-white hover:bg-gray-800'>Médecin</Link>
            </div>
            <button
                onClick={handleLogout}
                className='rounded-lg bg-red-500 p-2 px-7 text-white hover:bg-red-600'
            >
                Déconnexion
            </button>
        </nav>
    )
}
