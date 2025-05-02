import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/api'

export default function FicheMedecin() {
    const { idMedecin } = useParams()
    const [medecin, setMedecin] = useState(null)
    const [formData, setFormData] = useState(null)
    const [message, setMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [affichage, setAffichage] = useState('fiche')

    useEffect(() => {
        api.get(`/medecin/${idMedecin}`)
            .then(response => {
                setMedecin(response.data)
                setFormData(response.data)
            })
            .catch(() => {
                setMessage("Erreur lors du chargement du médecin.")
                setTypeMessage('error')
            })
    }, [idMedecin])

    function handleChange(e) {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setLoading(true)
            await api.put('/majMedecin', formData)
            setMessage('Médecin modifié avec succès !')
            setTypeMessage('success')
            setMedecin(formData)
        } catch {
            setMessage("Erreur lors de la modification du médecin.")
            setTypeMessage('error')
        } finally {
            setLoading(false)
        }
    }

    function RapportsMedecin() {
        const [rapports, setRapports] = useState([])

        useEffect(() => {
            api.get(`/rapports/${idMedecin}`)
                .then(res => {
                    const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date))
                    setRapports(sorted)
                })
                .catch(() => {
                    setMessage("Erreur lors du chargement des rapports.")
                    setTypeMessage('error')
                })
        }, [idMedecin])

        return (
            <table className="w-full border mt-4">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Motif</th>
                        <th className="p-2 border">Bilan</th>
                        <th className="p-2 border">Médecin</th>
                    </tr>
                </thead>
                <tbody>
                    {rapports.map(r => (
                        <tr key={r.id}>
                            <td className="border p-2">{medecin.id}</td>
                            <td className="border p-2">{r.motif}</td>
                            <td className="border p-2">{r.bilan}</td>
                            <td className="border p-2">{r.nom} {r.prenom}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    if (!medecin) return <p className="text-center mt-6">Chargement...</p>

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Médecin : {medecin.nom} {medecin.prenom}</h2>

            {message && (
                <div className={`mb-4 p-3 text-center font-semibold rounded ${typeMessage === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}

            <div className="flex gap-4 justify-center mb-6">
                <button
                    className={`px-4 py-2 rounded ${affichage === 'fiche' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                    onClick={() => setAffichage('fiche')}
                >
                    Info Médecin
                </button>
                <button
                    className={`px-4 py-2 rounded ${affichage === 'rapports' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                    onClick={() => setAffichage('rapports')}
                >
                    Rapports Médecin
                </button>
            </div>

            {affichage === 'fiche' && (
                <Fiche
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    loading={loading}
                />
            )}
            {affichage === 'rapports' && <RapportsMedecin />}
        </div>
    )
}

function Fiche({ formData, handleChange, handleSubmit, loading }) {
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block">Nom</label>
                <input
                    name="nom"
                    value={formData?.nom || ''}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>
            <div>
                <label className="block">Prénom</label>
                <input
                    name="prenom"
                    value={formData?.prenom || ''}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>
            <div>
                <label className="block">Adresse</label>
                <input
                    name="adresse"
                    value={formData?.adresse || ''}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>
            <div>
                <label className="block">Spécialité</label>
                <input
                    name="specialitecomplementaire"
                    value={formData?.specialitecomplementaire || ''}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={loading}
            >
                Enregistrer
            </button>
        </form>
    )
}
