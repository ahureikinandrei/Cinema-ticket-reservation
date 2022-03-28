import React, { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAction } from './hooks/redux';
import LocalStorageService from './services/localStorage.service';
import Header from './components/header/Header';
import Alert from './components/alert/Alert';
import AdminPage from './pages/admin-page/AdminPage';
import FilmsPage from './pages/films-page/FilmsPage';
import FilmPage from './pages/film-page/FilmPage';
import SessionPage from './pages/session-page/SessionPage';
import OrderPage from './pages/order-page/OrderPage';
import ErrorPage from './pages/error-page/ErrorPage';
import ProfilePage from './pages/profile-page/ProfilePage';
import { AdminRouter } from './routes/AdminRoute';
import './App.scss';
import { PrivateRouter } from './routes/PrivateRouter';

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
                <Route path="/order" element={<OrderPage />} />
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
                    path="/profile/:id"
                    element={
                        <PrivateRouter>
                            <ProfilePage />
                        </PrivateRouter>
                    }
                />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Alert />
        </div>
    );
};

export default App;
