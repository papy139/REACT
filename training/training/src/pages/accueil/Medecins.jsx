import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Medecins() {
    const navigate = useNavigate();

    const [listeVisible, setListeVisible] = useState(false); // Liste des médecins visible ou non
    const [nomMedecin, setNomMedecin] = useState(''); // Nom du médecin recherché
    const [listeMedecins, setListeMedecins] = useState([]); // Liste des médecins
    const [medecin, setMedecin] = useState({}); // Médecin sélectionné
    const [version, setVersion] = useState(0); // Version de la liste des médecins


    function charger() {

    }



    return (
        <div>
            <h1>Page des Médecins:</h1>
            <div className='p-5 rounded-lg'>
                <label className='pr-5' for='search-bar'>Recherchez un médecin :</label>
                <input className='border border-gray-500 p-3 w-2/3' type="text" name="search-bar" id="search-bar" placeholder="Rechercher un médecin..." />
            </div>
        </div>
    )
}


