import '../../App.css'
import Navbar from '../../components/Navbar'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Accueil() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'))

        if (data) {
            setUser(data)
        }
    }, [navigate])

    if (user === null) {
        return <p>Chargement...</p>
    }

    const nom = user.nom || ''
    const prenom = user.prenom || ''

    return (
        <>
            <Navbar />
            <h1>
                Bonjour, {nom} {prenom}
            </h1>
        </>
    )
}

export default Accueil
