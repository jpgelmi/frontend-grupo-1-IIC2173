import axios from "../../api/axios.js";
import useAuth from "./useAuth.js"

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
                name: response.data.name}
        })
        return response.data.accessToken;
    }
    return refresh
}

export default useRefreshToken