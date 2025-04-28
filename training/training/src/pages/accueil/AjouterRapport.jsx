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
    const [loading, setLoading] = useState(false)

    function chargerMedecins(nom) {
        if (nom.length > 0) {
            api.get('/medecins', { params: { nom: nom } })
                .then(response => {
                    setListeMedecins(response.data)
                })
                .catch(error => {
                    console.error(error.response?.data || error.message)
                })
        } else {
            setListeMedecins([])
        }
    }

    function selectMedecin(selectedMedecin) {
        setMedecin(selectedMedecin)
        setNomMedecin(selectedMedecin.nom)
        setListeMedecins([])
    }

    async function ajouterRapport(e) {
        e.preventDefault()

        if (!medecin) {
            setMessage('Veuillez sélectionner un médecin.')
            return
        }

        const aujourdHui = new Date().toISOString().split('T')[0]
        if (date < aujourdHui) {
            setMessage('La date de visite ne peut pas être dans le passé.')
            return
        }

        const user = JSON.parse(localStorage.getItem('user'))

        try {
            setLoading(true)
            await api.put('/ajouterRapport', {
                idMedecin: medecin.id,
                idVisiteur: user.id,
                date: date,
                motif: motif,
                bilan: bilan
            })
            setMessage('Rapport ajouté avec succès !')
            setDate('')
            setMotif('')
            setBilan('')
            setMedecin(null)
            setNomMedecin('')
        } catch (error) {
            console.error(error.response?.data || error.message)
            setMessage('Erreur lors de l\'ajout du rapport.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Ajouter un Rapport</h2>

            {message && <div className="mb-4 text-center text-blue-600">{message}</div>}
            {loading && <p className="text-center text-gray-500 mb-4">Chargement...</p>}

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

            {medecin && (
                <form onSubmit={ajouterRapport}>
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
            )}
        </div>
    )
}
