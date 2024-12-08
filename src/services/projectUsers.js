import axios from "axios";

let token = null;
const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};



const create = async (projectId, userId) => {
    const config = {
        headers: { Authorization: token },
    };

    try {
        const response = await axios.post(`/api/projects/${projectId}/users`, { Id: userId }, config);
        return response.data;
    } catch (error) {
        console.error("Error adding user to project", error);
        throw error;
    }
}


const remove = async (projectId, userId) => {
    const config = {
        headers: { Authorization: token },
    };

    try {
        const response = await axios.delete(`/api/projects/${projectId}/users/${userId}`, config);
        return userId;
    } catch (error) {
        console.error("Error removing user from project", error);
        throw error;
    }
}

export default { create, remove, setToken };