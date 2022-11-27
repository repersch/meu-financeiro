import Nav from './components/Nav/nav.js';
import Login from './components/Login/login.js';
import Home from './components/Home/home.js';
import Financa from './components/Financa/financa.js';
import Usuario from './components/Usuario/usuario.js';

import { BrowserRouter as Router, Routes, Route, Link, Outlet, useParams } from 'react-router-dom'

function AppRoutes() {
    return (
        <Router>
            <Nav />

            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/financa' element={<Financa />} />
                <Route path='/usuario' element={<Usuario />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;