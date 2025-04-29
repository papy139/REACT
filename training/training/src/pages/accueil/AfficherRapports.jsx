// Chemin : src/pages/accueil/AfficherRapports.jsx

import { useState, useEffect } from 'react'
import api from '../../api/api'

export default function AfficherRapports() {
    const [rapports, setRapports] = useState([])
    const [rapportsFiltres, setRapportsFiltres] = useState([])
    const [loading, setLoading] = useState(false)
    const [erreur, setErreur] = useState('')
    const [message, setMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')
    const [dateRecherche, setDateRecherche] = useState('')
    const [user] = useState(() => JSON.parse(localStorage.getItem('user')))

    useEffect(() => {
        fetchRapports()
    }, [user])

    async function fetchRapports() {
        if (!user) return

        try {
            setLoading(true)
            const response = await api.get(`/rapports/${user.id}`)
            if (Array.isArray(response.data) && response.data.length > 0) {
                setRapports(response.data)
                setRapportsFiltres(response.data)
                setMessage('')
                setTypeMessage('')
            } else {
                setMessage("Aucun rapport trouvé pour ce visiteur.")
                setTypeMessage('error')
                setRapports([])
                setRapportsFiltres([])
            }
        } catch (error) {
            console.error(error.response?.data || error.message)
            setMessage("Erreur de communication avec le serveur.")
            setTypeMessage('error')
            setRapports([])
            setRapportsFiltres([])
        } finally {
            setLoading(false)
        }
    }

    function filtrerParDate(date) {
        setDateRecherche(date)

        if (!date) {
            setRapportsFiltres(rapports)
            return
        }

        const filtres = rapports.filter(r => {
            const dateRapport = new Date(r.date).toLocaleDateString('fr-CA')
            return dateRapport === date
        })
        setRapportsFiltres(filtres)

        if (filtres.length === 0) {
            setMessage('Aucun rapport trouvé pour cette date.')
            setTypeMessage('error')
        } else {
            setMessage('')
            setTypeMessage('')
        }
    }

    function reinitialiserRecherche() {
        setDateRecherche('')
        setRapportsFiltres(rapports)
        setMessage('')
        setTypeMessage('')
    }

    return (
        <div className="min-h-screen flex items-start justify-center">
            <div className="w-full max-w-4xl bg-white rounded-lg p-6 shadow-lg mt-10">
                <h2 className="text-xl font-bold mb-4">Mes Rapports</h2>

                {message && (
                    <div className={`mb-4 p-3 rounded-lg font-semibold text-center ${typeMessage === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message}
                    </div>
                )}
                {loading && <p className="text-center text-gray-500 mb-4">Chargement...</p>}

                <div className="mb-6">
                    <label className="block mb-2 text-gray-700">Rechercher par date :</label>
                    <div className="flex space-x-2">
                        <input
                            type="date"
                            value={dateRecherche}
                            onChange={(e) => filtrerParDate(e.target.value)}
                            className="rounded-lg border p-2 w-full"
                        />
                        <button
                            onClick={reinitialiserRecherche}
                            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        >
                            Réinitialiser
                        </button>
                    </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border p-2 text-left">Date</th>
                                <th className="border p-2 text-left">Motif</th>
                                <th className="border p-2 text-left">Bilan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rapportsFiltres.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="border p-4 text-center text-gray-500 italic">
                                        {dateRecherche ? 'Aucun rapport trouvé pour cette date.' : 'Aucun rapport disponible.'}
                                    </td>
                                </tr>
                            ) : (
                                rapportsFiltres.map((rapport) => (
                                    <tr key={rapport.id} className="hover:bg-gray-100">
                                        <td className="border p-2">{new Date(rapport.date).toLocaleDateString()}</td>
                                        <td className="border p-2">{rapport.motif}</td>
                                        <td className="border p-2">{rapport.bilan}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
