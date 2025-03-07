import { useState } from 'react'
import api from '../api/api.js'
import imgLogo from '../assets/logo.webp'
import imgDoc from '../assets/doctor.webp'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [error, setError] = useState('')
    const [login, setLogin] = useState('')
    const [mdp, setMdp] = useState('')
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()

        api.get('/connexion', {
            params: {
                login: login,
                mdp: mdp,
            },
        })
            .then(response => {
                if (response.data != null) {
                    console.log(response.data)
                    localStorage.setItem('user', JSON.stringify(response.data))
                    navigate('/accueil')
                } else {
                    setError('Identifiants incorrects')
                }
            })
            .catch(error => {
                setError('Erreur lors de la connexion')
                console.error(error)
            })
    }

    return (
        <div className='flex min-h-screen bg-gray-100'>
            <div className='flex flex-1 items-center justify-center'>
                <img src={imgDoc} alt='Logo' className='w-2/3' />
            </div>
            <div className='w-1/4 bg-white p-6 shadow-lg'>
                <img src={imgLogo} alt='Logo' className='w-auto' />
                <h2 className='mb-4 text-center text-2xl font-bold'>Connexion</h2>
                {error && <p className='mb-2 text-center text-red-500'>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Login</label>
                        <input
                            className='w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            id='login'
                            value={login}
                            onChange={e => setLogin(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Mot de passe</label>
                        <input
                            type='password'
                            className='w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            id='mdp'
                            value={mdp}
                            onChange={e => setMdp(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
