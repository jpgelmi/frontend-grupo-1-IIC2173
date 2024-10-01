import axios from "../api/axios";
import useAuth from "./useAuth"

function useRefreshToken() {
    const {setAuth} = useAuth();
    
    const refresh = async () => {
        const response = await axios.get("/refresh",{
            withCredentials: true
        });
        setAuth(prev => {
            return {...prev,
                email: response.data.email,
                roles: response.data.roles,
                accessToken: response.data.accessToken,
                nombre: response.data.nombre}
        })
        return response.data.accessToken;
    }
    return refresh
}

export default useRefreshToken