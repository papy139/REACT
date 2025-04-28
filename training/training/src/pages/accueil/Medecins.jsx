import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/api'

export default function Medecins() {
    const navigate = useNavigate()
    const [nomMedecin, setNomMedecin] = useState('')
    const [listeMedecins, setListeMedecins] = useState([])
    const [listeVisible, setListeVisible] = useState(false)
    const [version, setVersion] = useState(0)

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
                })
                .catch(error => {
                    console.error(error.response?.data || error.message)
                })
        } else {
            setListeMedecins([])
            setListeVisible(false)
        }
    }

    function selectMedecin(medecin) {
        setListeVisible(false)
        setNomMedecin(medecin.nom)
        setVersion(version + 1)
        navigate(`/accueil/medecins/${medecin.id}`)
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Gestion des Médecins</h1>

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
    )
}
