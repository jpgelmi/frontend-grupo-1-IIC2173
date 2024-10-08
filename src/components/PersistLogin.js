import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from './hooks/useRefreshToken.js';
import useAuth from './hooks/useAuth.js';
import Cargando from "./Cargando.js";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, []);

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <Cargando/>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin