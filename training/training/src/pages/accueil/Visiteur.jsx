import { useEffect, useState } from 'react'
import api from '../../api/api'

export default function Visiteur() {
    const [formData, setFormData] = useState(null)
    const [message, setMessage] = useState('')

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            setFormData(user)
        }
    }, [])

    function handleChange(e) {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        api.put('/majVisiteur', formData)
        setMessage('Enregistrement effectué')
        localStorage.setItem('user', JSON.stringify(formData))
    }

    if (!formData) return null

    return (
        <div className="p-2">
            <h1>Visiteur MAJ</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom</label>
                    <input name="nom" value={formData.nom} onChange={handleChange} className="border m-2" />
                </div>

                <div>
                    <label>Prénom</label>
                    <input name="prenom" value={formData.prenom} onChange={handleChange} className="border m-2" />
                </div>

                <div>
                    <label>Adresse</label>
                    <input name="adresse" value={formData.adresse} onChange={handleChange} className="border m-2" />
                </div>

                <div>
                    <label>CP</label>
                    <input name="cp" value={formData.cp} onChange={handleChange} className="border m-2" />
                </div>

                <div>
                    <label>Ville</label>
                    <input name="ville" value={formData.ville} onChange={handleChange} className="border m-2" />
                </div>

                <button type="submit" className="bg-blue-500 text-white px-2">Valider</button>

                <div className="text-red-500">{message}</div>
            </form>
        </div>
    )
}
