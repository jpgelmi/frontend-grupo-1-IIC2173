import React from 'react';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
    return (
        <div>
            <h1>Registro</h1>
            <Register />
            <h1>Iniciar sesión</h1>
            <Login />
        </div>
    );
};

export default App;
