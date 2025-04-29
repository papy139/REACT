// Chemin : src/pages/accueil/AjouterRapport.jsx

import { useState } from 'react'
import api from '../../api/api'

export default function AjouterRapport() {
    const [nomMedecin, setNomMedecin] = useState('')
    const [listeMedecins, setListeMedecins] = useState([])
    const [medecin, setMedecin] = useState(null)
    const [date, setDate] = useState('')
    const [motif, setMotif] = useState('')
    const [bilan, setBilan] = useState('')
    const [message, setMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const user = JSON.parse(localStorage.getItem('user'))

    function chargerMedecins(nom) {
        if (nom.length > 0) {
            api.get('/medecins', { params: { nom: nom } })
                .then(response => setListeMedecins(response.data))
                .catch(() => alert("Erreur lors du chargement des médecins"))
        } else {
            setListeMedecins([])
        }
    }

    function selectMedecin(selectedMedecin) {
        setMedecin(selectedMedecin)
        setNomMedecin(`${selectedMedecin.nom} ${selectedMedecin.prenom}`)
        setListeMedecins([])
    }

    async function ajouterRapport(e) {
        e.preventDefault()

        if (!medecin) {
            setMessage('Veuillez sélectionner un médecin.')
            setTypeMessage('error')
            return
        }

        if (!date || !motif.trim() || !bilan.trim()) {
            setMessage('Tous les champs sont obligatoires.')
            setTypeMessage('error')
            return
        }

        const aujourdHui = new Date().toISOString().split('T')[0]
        if (date < aujourdHui) {
            setMessage('La date de visite ne peut pas être dans le passé.')
            setTypeMessage('error')
            return
        }

        try {
            setLoading(true)
            await api.put('/ajouterRapport', {
                idMedecin: medecin.id,
                idVisiteur: user.id,
                date,
                motif,
                bilan
            })
            setMessage('Rapport ajouté avec succès !')
            setTypeMessage('success')
            setDate('')
            setMotif('')
            setBilan('')
            setMedecin(null)
            setNomMedecin('')
        } catch {
            setMessage("Erreur lors de l'ajout du rapport.")
            setTypeMessage('error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 py-6 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl bg-white rounded-lg p-4 sm:p-6 shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Ajouter un Rapport</h2>

                {message && (
                    <div className={`mb-4 p-3 rounded-lg font-semibold text-center ${typeMessage === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message}
                    </div>
                )}

                {loading && <p className="text-center text-gray-500 mb-4">Chargement...</p>}

                <form onSubmit={ajouterRapport} className="pb-8 min-h-[400px]">
                    <div className="mb-4">
                        <label className="block text-gray-700">Rechercher un médecin</label>
                        <input
                            type="text"
                            value={nomMedecin}
                            onChange={(e) => {
                                setNomMedecin(e.target.value)
                                chargerMedecins(e.target.value)
                            }}
                            className="w-full rounded-lg border p-2"
                            placeholder="Tapez un nom..."
                            required
                        />
                        {listeMedecins.length > 0 && (
                            <ul className="mt-2 max-h-40 overflow-y-auto rounded-lg border bg-white shadow-md">
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

                    <div className="mb-4">
                        <label className="block text-gray-700">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full rounded-lg border p-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Motif</label>
                        <input
                            type="text"
                            value={motif}
                            onChange={(e) => setMotif(e.target.value)}
                            className="w-full rounded-lg border p-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Bilan</label>
                        <textarea
                            value={bilan}
                            onChange={(e) => setBilan(e.target.value)}
                            className="w-full rounded-lg border p-2"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600"
                        disabled={loading}
                    >
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    )
}