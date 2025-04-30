// Chemin : src/components/Navbar.jsx

import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()

    function logout() {
        if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
            localStorage.removeItem('user')
            navigate('/login')
        }
    }

    return (
        <header className="bg-blue-600 text-white shadow">
            <nav className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 py-4 gap-4">
                <h1 className="text-xl font-bold">GSB</h1>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm sm:text-base">
                    <button
                        onClick={() => navigate('/accueil')}
                        className="hover:underline hover:text-gray-200"
                    >
                        Accueil
                    </button>
                    <button
                        onClick={() => navigate('/accueil/medecins')}
                        className="hover:underline hover:text-gray-200"
                    >
                        Médecins
                    </button>
                    <button
                        onClick={() => navigate('/accueil/rapports')}
                        className="hover:underline hover:text-gray-200"
                    >
                        Rapports
                    </button>
                    <button
                        onClick={logout}
                        className="rounded bg-white text-blue-600 px-3 py-1 font-semibold hover:bg-gray-100"
                    >
                        Déconnexion
                    </button>
                </div>
            </nav>
        </header>
    )
}
