import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './pages/App'
import Login from './pages/Login'
import Accueil from './pages/accueil/Accueil'
import Rapports from './pages/accueil/Rapports'
import Medecins from './pages/accueil/Medecins'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/login' element={<Login />} />
                <Route path='/accueil' element={<Accueil />} />
                <Route path='/rapport' element={<Rapports />} />
                <Route path='/medecin' element={<Medecins />} />
            </Routes>
        </Router>
    </React.StrictMode>,
)
