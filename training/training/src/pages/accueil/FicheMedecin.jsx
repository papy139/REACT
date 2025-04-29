// Chemin : src/pages/accueil/FicheMedecin.jsx

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/api'

export default function FicheMedecin() {
    const { idMedecin } = useParams()
    const [medecin, setMedecin] = useState(null)
    const [message, setMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        api.get(`/medecin/${idMedecin}`)
            .then(response => setMedecin(response.data))
            .catch(() => {
                setMessage("Erreur lors du chargement du médecin.")
                setTypeMessage('error')
            })
    }, [idMedecin])

    function handleChange(e) {
        const { name, value } = e.target
        setMedecin({ ...medecin, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (!medecin.nom || !medecin.prenom || !medecin.adresse || !medecin.specialite) {
            setMessage('Tous les champs sont obligatoires.')
            setTypeMessage('error')
            return
        }

        try {
            setLoading(true)
            await api.put('/majMedecin', medecin)
            setMessage('Médecin modifié avec succès !')
            setTypeMessage('success')
        } catch {
            setMessage("Erreur lors de la modification du médecin.")
            setTypeMessage('error')
        } finally {
            setLoading(false)
        }
    }

    if (!medecin) {
        return <p className="text-center mt-6">Chargement des données...</p>
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 py-6 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl bg-white rounded-lg p-4 sm:p-6 shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Fiche Médecin</h2>

                {message && (
                    <div className={`mb-4 p-3 rounded-lg font-semibold text-center ${typeMessage === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="pb-8 min-h-[400px]">
                    <div className="mb-4">
                        <label className="block text-gray-700">Nom</label>
                        <input
                            name="nom"
                            value={medecin.nom}
                            onChange={handleChange}
                            className="w-full rounded-lg border p-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Prénom</label>
                        <input
                            name="prenom"
                            value={medecin.prenom}
                            onChange={handleChange}
                            className="w-full rounded-lg border p-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Adresse</label>
                        <input
                            name="adresse"
                            value={medecin.adresse}
                            onChange={handleChange}
                            className="w-full rounded-lg border p-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Spécialisation</label>
                        <input
                            name="specialite"
                            value={medecin.specialite || ''}
                            onChange={handleChange}
                            className="w-full rounded-lg border p-2"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600"
                    >
                        Enregistrer les modifications
                    </button>
                </form>
            </div>
        </div>
    )
}
