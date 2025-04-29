import { useState, useEffect } from 'react'
import api from '../../api/api'

export default function AfficherRapports() {
    const [rapports, setRapports] = useState([])
    const [loading, setLoading] = useState(false)
    const [erreur, setErreur] = useState('')
    const [dateRecherche, setDateRecherche] = useState('')
    const [user] = useState(() => JSON.parse(localStorage.getItem('user')))

    useEffect(() => {
        fetchRapports()
    }, [user, dateRecherche])

    async function fetchRapports() {
        if (!user) return;

        try {
            setLoading(true);

            const response = await api.get(`/rapports/${user.id}`);

            if (Array.isArray(response.data)) {
                setRapports(response.data);
            } else {
                setRapports([]);
            }
        } catch (error) {
            console.error(error.response?.data || error.message);
            setErreur('Erreur de communication avec le serveur.');
        } finally {
            setLoading(false);
        }
    }




    return (
        <div className="mt-10 bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Mes Rapports</h2>

            <div className="mb-6">
                <label className="block mb-2 text-gray-700">Rechercher par date :</label>
                <input
                    type="date"
                    value={dateRecherche}
                    onChange={(e) => setDateRecherche(e.target.value)}
                    className="rounded-lg border p-2 w-full"
                />
            </div>

            {loading ? (
                <p className="text-center text-gray-500">Chargement...</p>
            ) : (
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
                            {rapports.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="border p-4 text-center text-gray-500">
                                        Aucun rapport trouvé.
                                    </td>
                                </tr>
                            ) : (
                                rapports.map((rapport) => (
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
            )}
            {erreur && (
                <p className="text-center text-red-500 mt-4">{erreur}</p>
            )}
        </div>
    )
}
