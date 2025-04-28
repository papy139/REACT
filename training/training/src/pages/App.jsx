import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.webp'

export default function App() {
    const navigate = useNavigate()

    function seConnecter() {
        navigate('/login')
    }

    return (
        <>
            <nav className="flex items-center justify-between bg-gray-800 p-4">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-10 w-10 rounded" />
                    <span className="ml-4 text-2xl text-white">GSB</span>
                </div>
                <div>
                    <button
                        onClick={seConnecter}
                        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        Se connecter
                    </button>
                </div>
            </nav>

            <div className="h-1/2 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-black">Bienvenue sur GSB!</h1>
                <p className="mt-4 text-lg text-black">
                    Utilisez votre compte pour accéder à vos rapports et médecins.
                </p>
            </div>
        </>
    )
}
