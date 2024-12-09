import axios from "axios";
import { getAuthConfig, checkToken } from './auth'



const create = async (projectId, userId) => {

    const tokenCheckResult = await checkToken();

    if (!tokenCheckResult) {
        return;
    }

    try {
        const response = await axios.post(`/api/projects/${projectId}/users`, { Id: userId }, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error adding user to project", error);
        throw error;
    }
}


const remove = async (projectId, userId) => {

    const tokenCheckResult = await checkToken();

    if (!tokenCheckResult) {
        return;
    }

    try {
        await axios.delete(`/api/projects/${projectId}/users/${userId}`, getAuthConfig());
        return userId;
    } catch (error) {
        console.error("Error removing user from project", error);
        throw error;
    }
}

export default { create, remove };