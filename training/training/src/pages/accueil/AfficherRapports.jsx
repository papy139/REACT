import { useState, useEffect } from 'react'
import api from '../../api/api'

export default function AfficherRapports() {
    const [rapports, setRapports] = useState([])
    const [loading, setLoading] = useState(false)

    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        async function fetchRapports() {
            if (!user) return

            try {
                setLoading(true)
                const response = await api.get('/rapport', {
                    params: { idVisiteur: String(user.id) }
                })
                const rapportsTries = response.data.sort((a, b) => new Date(b.date) - new Date(a.date))
                setRapports(rapportsTries)
            } catch (error) {
                console.error(error.response?.data || error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchRapports()
    }, [user])

    return (
        <div className="mt-10 bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Mes Rapports</h2>

            {loading ? (
                <p className="text-center text-gray-500">Chargement...</p>
            ) : (
                <div className="max-h-80 overflow-y-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border p-2">Date</th>
                                <th className="border p-2">Motif</th>
                                <th className="border p-2">Bilan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rapports.map((rapport) => (
                                <tr key={rapport.id} className="hover:bg-gray-100">
                                    <td className="border p-2">{new Date(rapport.date).toLocaleDateString()}</td>
                                    <td className="border p-2">{rapport.motif}</td>
                                    <td className="border p-2">{rapport.bilan}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
