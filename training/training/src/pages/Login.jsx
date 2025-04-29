// Chemin : src/pages/Login.jsx

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import imgLogo from '../assets/logo.webp'
import imgJdoc from '../assets/jdoc.webp'

export default function Login() {
    const [error, setError] = useState('')
    const [login, setLogin] = useState('')
    const [mdp, setMdp] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            navigate('/accueil')
        }
    }, [navigate])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await api.get('/connexion', {
                params: { login: login, mdp: mdp }
            })

            if (response.data) {
                const user = {
                    id: response.data.id,
                    nom: response.data.nom,
                    prenom: response.data.prenom,
                    adresse: response.data.adresse,
                    cp: response.data.cp,
                    ville: response.data.ville
                }
                localStorage.setItem('user', JSON.stringify(user))
                navigate('/accueil')
            } else {
                setError('Identifiants incorrects')
            }
        } catch (error) {
            console.error(error.response?.data || error.message)
            setError('Erreur lors de la connexion')
        }
    }

    return (
        <div className='flex min-h-screen bg-gray-100'>
            <div className='flex flex-1 items-center justify-center lg:w-1/2'>
                <img
                    src={imgJdoc}
                    alt='Docteur Sins'
                    className='w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl object-contain mx-auto p-4'
                />
            </div>
            <div className='w-full bg-white p-6 shadow-lg lg:w-1/4'>
                <img
                    src={imgLogo}
                    alt='Logo'
                    className='w-3/4 max-w-xs mx-auto mb-6 object-contain'
                />
                <h2 className='mb-4 text-center text-2xl font-bold'>Connexion</h2>
                {error && <p className='mb-2 text-center text-red-500'>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Login</label>
                        <input
                            className='w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Mot de passe</label>
                        <input
                            type='password'
                            className='w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            value={mdp}
                            onChange={(e) => setMdp(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600'
                    >
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    )
}
