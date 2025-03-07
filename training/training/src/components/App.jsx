import { useState } from 'react'
import '../App.css'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

function App() {
    const navigate = useNavigate()

    function seConnecter() {
        navigate('/login')
    }
    return (
        <>
            <nav className='flex items-center justify-between bg-gray-800 p-4'>
                <div className='flex items-center'>
                    <img src={logo} alt='Logo' className='h-10 w-10 rounded' />
                    <span className='font ml-4 text-2xl text-white'>GSB</span>
                </div>
                <div className='flex items-center'>
                    <button
                        onClick={seConnecter}
                        className='rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        Se connecter
                    </button>
                </div>
            </nav>

            <div className='h-50% flex flex-col items-center justify-center'>
                <h1 className='text-4xl font-bold text-black'>Bienvenue sur GSB!</h1>
                <p className='mt-4 text-lg font-medium text-black'>
                    Vous pouvez utiliser votre compte pour accéder à toutes les fonctionnalités de votre
                    espace GSB.
                </p>
                <button>.</button>
            </div>
        </>
    )
}
export default App
