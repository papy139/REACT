import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './components/App'
import Login from './components/Login'
import Accueil from './components/Accueil'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/login' element={<Login />} />
                <Route path='/accueil' element={<Accueil />} />
            </Routes>
        </Router>
    </React.StrictMode>,
)
