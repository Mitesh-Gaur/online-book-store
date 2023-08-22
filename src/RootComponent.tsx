import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import SignupPage from './pages/SignupPage'
import {Admin, Dashboard} from './pages';
import { ROUTES } from './resources/routes-constants'
import './styles/main.sass'
import { Books } from './pages/admin/components'

const RootComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage />} />
                <Route path={ROUTES.ADMINPAGE} element={<Admin />} />
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                <Route path={ROUTES.SIGNUPPAGE} element={<SignupPage />} />
                <Route path={ROUTES.LOGINPAGE} element={<LoginPage />} />
                <Route path={ROUTES.ADMINBOOKS} element={<Books />} />
            </Routes>
        </Router>
    )
}

export default RootComponent
