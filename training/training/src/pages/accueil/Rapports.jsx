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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Gestion des Rapports</h1>

            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setAffichage('ajouter')}
                    className={`rounded-lg px-6 py-2 ${affichage === 'ajouter' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                >
                    Ajouter un rapport
                </button>
                <button
                    onClick={() => setAffichage('modifier')}
                    className={`rounded-lg px-6 py-2 ${affichage === 'modifier' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                >
                    Modifier un rapport
                </button>
            </div>

            {affichage === 'ajouter' ? <AjouterRapport /> : <ModifierRapport />}
            {/* <AfficherRapports /> */}
        </div>
    )
}
