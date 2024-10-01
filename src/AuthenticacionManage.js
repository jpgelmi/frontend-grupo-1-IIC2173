import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function AuthenticacionManage() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      setMessage(`Bienvenido, ${user.name}`);
    } else {
      setMessage('Usuario no autenticado');
    }
  }, [isAuthenticated, user]);

  return (
    <div>
      <h1>{message}</h1>
      {isAuthenticated ? (
        <>
          <p>Usuario autenticado</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Cerrar sesión
          </button>
        </>
      ) : (
        <>
          <p>Usuario no autenticado</p>
          <button onClick={loginWithRedirect}>Iniciar sesión</button>
        </>
      )}
    </div>
  );
}

export default AuthenticacionManage;
