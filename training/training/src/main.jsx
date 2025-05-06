import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './pages/App'
import Login from './pages/Login'
import Accueil from './pages/accueil/Accueil'
import Rapports from './pages/accueil/Rapports'
import Medecins from './pages/accueil/Medecins'
import Visiteur from './pages/accueil/Visiteur'
import FicheMedecin from './pages/accueil/FicheMedecin.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/accueil" element={<Accueil />}>
                    <Route path="medecins" element={<Medecins />} />
                    <Route path="rapports" element={<Rapports />} />
                    <Route path="medecins/:idMedecin" element={<FicheMedecin />} />
                    <Route path="visiteur" element={<Visiteur />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)