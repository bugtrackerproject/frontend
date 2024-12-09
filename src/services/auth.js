import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const baseUrl = "/api/auth";

var accessToken = null;

const setAccessToken = (newToken) => {
    accessToken = `bearer ${newToken}`;
    console.log(accessToken)
};

const getAuthConfig = () => ({
    headers: { Authorization: accessToken },
});

const checkToken = async () => {
    if (!accessToken || isTokenExpired(accessToken)) {
        const newAccessToken = await refreshToken();
        if (!newAccessToken) {
            console.error("Failed to refresh token");
            return false; // Explicitly return false
        } else {
            setAccessToken(newAccessToken);
        }
    }
    return true;
}

const login = async (credentials) => {
  
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

const refreshToken = async () => {
    const trimmedToken = accessToken.replace("bearer ", ""); 
    try {
        const response = await axios.post(`${baseUrl}/refresh-token`, trimmedToken);
        console.log(response.data)
        return response.data;

    } catch (error) {
        console.error("Failed to refresh token:", error);
        window.localStorage.removeItem("loggedBugtrackerAppUser");
    }
        
};

const isTokenExpired = () => {
    const trimmedToken = accessToken.replace("bearer ", ""); 
    if (!trimmedToken) return true;

    try {
        const decoded = jwtDecode(trimmedToken);
        const currentTime = Date.now() / 1000; // Current time in seconds

        return decoded.exp < currentTime;
    } catch (e) {
        console.error("Invalid token:", e);
        return true; // Token is invalid
    }
};


export { checkToken, getAuthConfig, setAccessToken, refreshToken, isTokenExpired, login };
