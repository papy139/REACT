// Chemin : src/pages/accueil/Medecins.jsx

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/api'

export default function Medecins() {
    const navigate = useNavigate()
    const [nomMedecin, setNomMedecin] = useState('')
    const [listeMedecins, setListeMedecins] = useState([])
    const [listeVisible, setListeVisible] = useState(false)
    const [version, setVersion] = useState(0)
    const [message, setMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (!user) {
            navigate('/login')
        }
    }, [navigate])

    function chargerMedecins(nom) {
        if (nom.length > 0) {
            api.get('/medecins', { params: { nom: nom } })
                .then(response => {
                    setListeMedecins(response.data)
                    setListeVisible(true)
                    if (response.data.length === 0) {
                        setMessage("Aucun médecin trouvé.")
                        setTypeMessage("error")
                    } else {
                        setMessage('')
                        setTypeMessage('')
                    }
                })
                .catch(error => {
                    console.error(error.response?.data || error.message)
                    setMessage("Erreur lors du chargement.")
                    setTypeMessage("error")
                })
        } else {
            setListeMedecins([])
            setListeVisible(false)
            setMessage('')
        }
    }

    function selectMedecin(medecin) {
        setListeVisible(false)
        setNomMedecin(medecin.nom)
        setVersion(version + 1)
        navigate(`/accueil/medecins/${medecin.id}`)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 py-6 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl bg-white rounded-lg p-4 sm:p-6 shadow-lg">
                <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">Gestion des Médecins</h1>

                {message && (
                    <div className={`mb-4 p-3 rounded-lg font-semibold text-center ${typeMessage === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message}
                    </div>
                )}

                <div className="mb-6">
                    <label className="block text-gray-700">Rechercher un médecin :</label>
                    <input
                        type="text"
                        value={nomMedecin}
                        onChange={(e) => {
                            setNomMedecin(e.target.value)
                            chargerMedecins(e.target.value)
                        }}
                        className="w-full rounded-lg border p-3"
                        placeholder="Tapez un nom..."
                    />
                    {listeVisible && listeMedecins.length > 0 && (
                        <ul className="mt-2 max-h-60 overflow-y-auto rounded-lg border bg-white shadow-md">
                            {listeMedecins.map((med) => (
                                <li
                                    key={med.id}
                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                    onClick={() => selectMedecin(med)}
                                >
                                    {med.nom} {med.prenom}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}