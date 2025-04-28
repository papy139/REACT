import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/api'

export default function FicheMedecin() {
    const { idMedecin } = useParams()
    const [affichage, setAffichage] = useState('fiche')

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Fiche du Médecin</h1>

            <div className="flex space-x-4 mb-6">
                <button
                    className={`rounded-lg px-6 py-2 ${affichage === 'fiche' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    onClick={() => setAffichage('fiche')}
                >
                    Modifier fiche
                </button>
                <button
                    className={`rounded-lg px-6 py-2 ${affichage === 'rapports' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    onClick={() => setAffichage('rapports')}
                >
                    Rapports du médecin
                </button>
            </div>

            {affichage === 'fiche' ? <Fiche idMedecin={idMedecin} /> : <Rapports idMedecin={idMedecin} />}
        </div>
    )
}

// Sous-composant Fiche
function Fiche({ idMedecin }) {
    const [data, setData] = useState({})
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get(`/medecin/${idMedecin}`)
                setData(response.data)
            } catch (error) {
                console.error(error.response?.data || error.message)
            }
        }
        fetchData()
    }, [idMedecin])

    async function modifierMedecin(e) {
        e.preventDefault()
        try {
            setLoading(true)
            await api.put('/majMedecin', {
                id: idMedecin,
                ...data
            })
            setMessage('Médecin modifié avec succès !')
        } catch (error) {
            console.error(error.response?.data || error.message)
            setMessage('Erreur lors de la modification.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={modifierMedecin} className="bg-gray-100 p-6 rounded-lg">
            {message && <p className="mb-4 text-center text-blue-600">{message}</p>}
            {loading && <p className="text-center text-gray-500 mb-4">Chargement...</p>}

            <div className="mb-4">
                <label className="block text-gray-700">Nom</label>
                <input
                    type="text"
                    value={data.nom || ''}
                    onChange={(e) => setData({ ...data, nom: e.target.value })}
                    className="w-full rounded-lg border p-2"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Prénom</label>
                <input
                    type="text"
                    value={data.prenom || ''}
                    onChange={(e) => setData({ ...data, prenom: e.target.value })}
                    className="w-full rounded-lg border p-2"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Adresse</label>
                <input
                    type="text"
                    value={data.adresse || ''}
                    onChange={(e) => setData({ ...data, adresse: e.target.value })}
                    className="w-full rounded-lg border p-2"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Téléphone</label>
                <input
                    type="text"
                    value={data.tel || ''}
                    onChange={(e) => setData({ ...data, tel: e.target.value })}
                    className="w-full rounded-lg border p-2"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Spécialité complémentaire</label>
                <input
                    type="text"
                    value={data.specialiteComplementaire || ''}
                    onChange={(e) => setData({ ...data, specialiteComplementaire: e.target.value })}
                    className="w-full rounded-lg border p-2"
                />
            </div>

            <button
                type="submit"
                className="w-full rounded-lg bg-green-500 py-2 text-white hover:bg-green-600"
            >
                Modifier
            </button>
        </form>
    )
}

// Sous-composant Rapports
function Rapports({ idMedecin }) {
    const [rapports, setRapports] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchRapports() {
            try {
                setLoading(true)
                const response = await api.get('/rapportMedecin', { params: { idMedecin: idMedecin } })
                setRapports(response.data)
            } catch (error) {
                console.error(error.response?.data || error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchRapports()
    }, [idMedecin])

    return (
        <div className="bg-gray-100 p-6 rounded-lg">
            {loading ? (
                <p className="text-center text-gray-500">Chargement des rapports...</p>
            ) : rapports.length === 0 ? (
                <p className="text-center">Aucun rapport trouvé pour ce médecin.</p>
            ) : (
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Motif</th>
                            <th className="border p-2">Bilan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rapports.map((r) => (
                            <tr key={r.id} className="hover:bg-gray-100">
                                <td className="border p-2">{new Date(r.date).toLocaleDateString()}</td>
                                <td className="border p-2">{r.motif}</td>
                                <td className="border p-2">{r.bilan}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
