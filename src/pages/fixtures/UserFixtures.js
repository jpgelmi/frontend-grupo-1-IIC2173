import React, { useEffect, useState } from "react";
import { getBonosCompradosPorAdmin } from "../../api/axios.js";
import { useAuth0 } from "@auth0/auth0-react";

const AdminFixtures = () => {
    const [bonos, setBonos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    useEffect(() => {
        const fetchBonos = async () => {
            if (!isAuthenticated) return;
            
            setIsLoading(true);
            try {
                const token = await getAccessTokenSilently();
                const response = await getBonosCompradosPorAdmin(token);
                console.log("Respuesta del endpoint:", response);
                
                if (response && Array.isArray(response)) {
                    console.log("Bonos obtenidos:", response);
                    setBonos(response);
                } else {
                    throw new Error("Formato de respuesta inválido");
                }
            } catch (error) {
                console.error("Error fetching bonos:", error);
                setError(error.message);
                setBonos([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBonos();
    }, [getAccessTokenSilently, isAuthenticated]);

    if (isLoading) {
        return <div className="p-4">Cargando bonos...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User Fixtures</h1>
            <p className="mb-4">User Fixtures.</p>
            
            {bonos.length > 0 ? (
                <ul className="space-y-2">
                    {bonos.map((bono, index) => (
                        <li key={bono?._id || index} className="p-3 bg-gray-100 rounded-lg">
                            {bono?.fixtureId || `Bono ${index + 1}`}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay bonos disponibles</p>
            )}
        </div>
    );
};

export default AdminFixtures;

