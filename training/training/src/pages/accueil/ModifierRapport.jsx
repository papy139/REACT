import { useState, useEffect } from 'react'
import api from '../../api/api'

export default function ModifierRapport() {
    const [dateRecherche, setDateRecherche] = useState('')
    const [rapports, setRapports] = useState([])
    const [rapportSelectionne, setRapportSelectionne] = useState(null)
    const [motif, setMotif] = useState('')
    const [bilan, setBilan] = useState('')
    const [message, setMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        chercherRapports()
    }, [])

    async function chercherRapports() {
        if (!user) return

        try {
            setLoading(true)
            const response = await api.get(`/rapports/${user.id}`)
            console.log('Rapports récupérés :', response.data)

            if (Array.isArray(response.data)) {
                setRapports(response.data)
                setMessage(response.data.length === 0 ? 'Aucun rapport trouvé.' : '')
                setTypeMessage('error')
            } else {
                setMessage('Réponse invalide de l’API.')
                setTypeMessage('error')
                setRapports([])
            }
        } catch (error) {
            console.error(error.response?.data || error.message)
            setMessage('Erreur serveur')
            setTypeMessage('error')
        } finally {
            setLoading(false)
        }
    }

    function filtrerParDate(date) {
        setDateRecherche(date)

        if (!date) {
            chercherRapports()
            return
        }

        const filtres = rapports.filter(r => {
            const dateRapport = new Date(r.date).toISOString().split('T')[0]
            console.log('Comparaison:', { rapport: dateRapport, input: date }) // debug
            return dateRapport === date
        })

        setRapports(filtres)
    }

    function selectionnerRapport(rapport) {
        setRapportSelectionne(rapport)
        setMotif(rapport.motif)
        setBilan(rapport.bilan)
    }

    async function modifierRapport(e) {
        e.preventDefault()
        if (!rapportSelectionne) return

        if (!motif.trim() || !bilan.trim()) {
            setMessage('Le motif et le bilan sont obligatoires.')
            setTypeMessage('error')
            return
        }

        try {
            setLoading(true)
            await api.put('/majRapport', {
                idRapport: rapportSelectionne.id,
                idVisiteur: user.id,
                motif,
                bilan
            })
            setMessage('Rapport modifié avec succès !')
            setTypeMessage('success')
            chercherRapports()
            setRapportSelectionne(null)
            setMotif('')
            setBilan('')
        } catch {
            setMessage('Erreur lors de la modification.')
            setTypeMessage('error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 py-6 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl bg-white rounded-lg p-4 sm:p-6 shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Modifier un Rapport</h2>

                {message && (
                    <div className={`mb-4 p-3 rounded-lg font-semibold text-center ${typeMessage === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message}
                    </div>
                )}
                {loading && <p className="text-center text-gray-500 mb-4">Chargement...</p>}

                <div className="mb-6">
                    <label className="block text-gray-700">Rechercher par date</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="date"
                            value={dateRecherche}
                            onChange={(e) => filtrerParDate(e.target.value)}
                            className="w-full rounded-lg border p-2"
                        />
                        <button
                            onClick={chercherRapports}
                            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        >
                            Rechercher
                        </button>
                    </div>
                </div>

                {rapports.length > 0 && !rapportSelectionne && (
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
                                {rapports.map((r) => (
                                    <tr
                                        key={r.id}
                                        className="cursor-pointer hover:bg-gray-100"
                                        onClick={() => selectionnerRapport(r)}
                                    >
                                        <td className="border p-2">{new Date(r.date).toLocaleDateString()}</td>
                                        <td className="border p-2">{r.motif}</td>
                                        <td className="border p-2">{r.bilan}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {rapportSelectionne && (
                    <form onSubmit={modifierRapport} className="mt-6 pb-8 min-h-[400px]">
                        <h3 className="mb-4 text-lg font-semibold">
                            Modifier le rapport du {new Date(rapportSelectionne.date).toLocaleDateString()}
                        </h3>

                        <div className="mb-4">
                            <label className="block text-gray-700">Motif</label>
                            <input
                                type="text"
                                value={motif}
                                onChange={(e) => setMotif(e.target.value)}
                                className="w-full rounded-lg border p-2"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Bilan</label>
                            <textarea
                                value={bilan}
                                onChange={(e) => setBilan(e.target.value)}
                                className="w-full rounded-lg border p-2"
                            ></textarea>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="submit"
                                className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                            >
                                Enregistrer
                            </button>
                            <button
                                type="button"
                                onClick={() => setRapportSelectionne(null)}
                                className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
