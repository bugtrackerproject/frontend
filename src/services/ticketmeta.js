import axios from "axios";
const baseUrl = "/api/ticketmeta";

let token = null;
const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};



const getTicketTypes = async () => {
    const config = {
        headers: { Authorization: token },
    };

    try {
        const response = await axios.get(`${baseUrl}/types`, config);
        return response.data;
    } catch (error) {
        console.error("Error fetching ticket types:", error);
        throw error;
    }
}


const getTicketPriorities = async () => {
    const config = {
        headers: { Authorization: token },
    };

    try {
        const response = await axios.get(`${baseUrl}/priorities`, config);
        return response.data;
    } catch (error) {
        console.error("Error fetching ticket priorities:", error);
        throw error;
    }
}


const getTicketStatuses = async () => {
    const config = {
        headers: { Authorization: token },
    };

    try {
        const response = await axios.get(`${baseUrl}/statuses`, config);
        return response.data;
    } catch (error) {
        console.error("Error fetching ticket statuses:", error);
        throw error;
    }
}

export default { getTicketTypes, getTicketPriorities, getTicketStatuses };