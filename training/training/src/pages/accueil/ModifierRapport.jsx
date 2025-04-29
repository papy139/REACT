import { useState } from 'react'
import api from '../../api/api'

export default function ModifierRapport() {
    const [dateRecherche, setDateRecherche] = useState('')
    const [rapports, setRapports] = useState([])
    const [rapportSelectionne, setRapportSelectionne] = useState(null)
    const [motif, setMotif] = useState('')
    const [bilan, setBilan] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const user = JSON.parse(localStorage.getItem('user'))

    async function chercherRapports() {
        if (!user) return

        try {
            setLoading(true)
            const response = await api.get(`/rapports/${user.id}`)

            setRapports(response.data)
            setMessage(response.data.length === 0 ? 'Aucun rapport trouvé.' : '')
        } catch (error) {
            console.error(error.response?.data || error.message)
            setMessage('Erreur serveur')
        } finally {
            setLoading(false)
        }
    }



    function selectionnerRapport(rapport) {
        setRapportSelectionne(rapport)
        setMotif(rapport.motif)
        setBilan(rapport.bilan)
    }

    async function modifierRapport(e) {
        e.preventDefault()
        if (!rapportSelectionne) return
        try {
            setLoading(true)
            await api.put('/majRapport', {
                idRapport: rapportSelectionne.id,
                idVisiteur: user.id,
                motif,
                bilan
            })
            setMessage('Rapport modifié avec succès !')
            chercherRapports()
            setRapportSelectionne(null)
            setMotif('')
            setBilan('')
        } catch {
            setMessage('Erreur lors de la modification')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Modifier un Rapport</h2>

            {message && <div className="mb-4 text-center text-blue-600">{message}</div>}
            {loading && <p className="text-center text-gray-500 mb-4">Chargement...</p>}

            <div className="mb-6">
                <label className="block text-gray-700">Date</label>
                <input
                    type="date"
                    value={dateRecherche}
                    onChange={(e) => setDateRecherche(e.target.value)}
                    className="w-full rounded-lg border p-2"
                />
                <button
                    onClick={chercherRapports}
                    className="mt-3 w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600"
                >
                    Chercher
                </button>
            </div>

            {rapports.length > 0 && (
                <ul className="mt-4 max-h-40 overflow-y-auto rounded-lg border bg-white shadow-md">
                    {rapports.map((r, idx) => (
                        <li
                            key={(r.id ?? 'tmp') + '-' + idx}
                            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                            onClick={() => selectionnerRapport(r)}
                        >
                            {r.motif || 'Motif indisponible'}
                        </li>
                    ))}
                </ul>

            )}

            {rapportSelectionne && (
                <form onSubmit={modifierRapport} className="mt-6">
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

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-green-500 py-2 text-white hover:bg-green-600"
                    >
                        Modifier
                    </button>
                </form>
            )}
        </div>
    )
}
