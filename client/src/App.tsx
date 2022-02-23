import React, { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAction } from './hooks/redux';
import LocalStorageService from './services/localStorage.service';
import Header from './components/header/Header';
import AdminPage from './pages/admin-page/AdminPage';
import FilmsPage from './pages/films-page/FilmsPage';
import Alert from './components/alert/Alert';
import { AdminRouter } from './routes/AdminRoute';

import './App.scss';
import FilmPage from './pages/film-page/FIlmPage';
import SessionPage from './pages/session-page/SessionPage';

const App: FC = () => {
    const { authUser } = useAction();

    useEffect(() => {
        const token = LocalStorageService.getTokenFromLocalStorage();
        if (token) {
            authUser(token);
        }
    }, [authUser]);

    return (
        <div className="wrapper">
            <Header />
            <Routes>
                <Route path="/" element={<FilmsPage />} />
                <Route path="/film/:id" element={<FilmPage />} />
                <Route path="/session/:id" element={<SessionPage />} />
                <Route
                    path="create"
                    element={
                        <AdminRouter>
                            <AdminPage />
                        </AdminRouter>
                    }
                />
                <Route
                    path="*"
                    element={
                        <div>
                            404 <br /> Page not found
                        </div>
                    }
                />
            </Routes>
            <Alert />
        </div>
    );
};

export default App;
