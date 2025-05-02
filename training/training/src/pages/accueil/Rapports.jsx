import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AjouterRapport from './AjouterRapport'
import ModifierRapport from './ModifierRapport'
import AfficherRapports from './AfficherRapports'

export default function Rapports() {
    const [affichage, setAffichage] = useState('ajouter')
    const navigate = useNavigate()

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (!user) {
            navigate('/login')
        }
    }, [navigate])

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-6 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl">
                <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg">
                    <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">Gestion des Rapports</h1>

                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-8">
                        <button
                            onClick={() => setAffichage('ajouter')}
                            className={`rounded-lg px-4 py-2 text-sm sm:text-base ${affichage === 'ajouter' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                        >
                            Ajouter un rapport
                        </button>
                        <button
                            onClick={() => setAffichage('modifier')}
                            className={`rounded-lg px-4 py-2 text-sm sm:text-base ${affichage === 'modifier' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                        >
                            Modifier un rapport
                        </button>
                    </div>

                    <div className="overflow-hidden pb-8 min-h-[400px]">
                        {affichage === 'ajouter' && <AjouterRapport />}
                        {affichage === 'modifier' && <ModifierRapport />}
                    </div>
                </div>
            </div>
        </div>
    )
}