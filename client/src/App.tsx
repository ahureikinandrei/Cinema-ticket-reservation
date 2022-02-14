import React, { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/header/Header/Header';
import FilmsPage from './pages/films-page/FilmsPage';
import { useAction } from './hooks/redux';
import LocalStorageService from './services/localStorage.service';
import Alert from './components/alert/Alert';

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
                <Route path="create" element={<div>Create</div>} />
                <Route path="signIn" element={<div>SignIn</div>} />
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
