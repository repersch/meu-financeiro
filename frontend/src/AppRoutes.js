import Nav from './components/Nav/nav';
import Home from './components/Home/home';

import { BrowserRouter as Router, Routes, Route, Link, Outlet, useParams } from 'react-router-dom'

function AppRoutes() {
    return (
        <Router>
            <Nav />

            <Routes>
            <Route path='/' element={<Home />} />

                {/*                 <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/alunos' element={<Students />}>
                    <Route index element={<StudentsList />} />
                    <Route path=':code' element={<StudentInfo />} />
                </Route> */}
            </Routes>
        </Router>
    )
}

export default AppRoutes;