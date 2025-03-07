import React from 'react'
import '../App.css'
import logo from '../assets/logo.webp'

function Navbar() {
    return (
        <div>
            <nav className='flex items-center bg-blue-600 p-5'>
                <div className='flex items-center'>
                    <img src={logo} alt='Logo' className='h-10 w-10 rounded' />
                    <span className='font ml-4 text-2xl text-white'>GSB</span>
                </div>
                <div className='ml-10 space-x-6'>
                    <button className='rounded-lg bg-blue-900 p-2 px-7 text-white hover:bg-blue-950'>
                        Dashboard
                    </button>
                    <button className='rounded-lg bg-blue-900 p-2 px-7 text-white hover:bg-blue-950'>
                        Rapport
                    </button>
                    <button className='rounded-lg bg-blue-900 p-2 px-7 text-white hover:bg-blue-950'>
                        Médecin
                    </button>
                </div>
            </nav>
        </div>
    )
}
export default Navbar
