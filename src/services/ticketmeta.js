import axios from "axios";
import { getAuthConfig, checkToken } from './auth'
const baseUrl = "/api/ticketmeta";


const getTicketTypes = async () => {
    const tokenCheckResult = await checkToken();

    if (!tokenCheckResult) {
        return;
    }

    try {
        const response = await axios.get(`${baseUrl}/types`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching ticket types:", error);
        throw error;
    }
}


const getTicketPriorities = async () => {
    const tokenCheckResult = await checkToken();

    if (!tokenCheckResult) {
        return;
    }


    try {
        const response = await axios.get(`${baseUrl}/priorities`, getAuthConfig);
        return response.data;
    } catch (error) {
        console.error("Error fetching ticket priorities:", error);
        throw error;
    }
}


const getTicketStatuses = async () => {
    const tokenCheckResult = await checkToken();

    if (!tokenCheckResult) {
        return;
    }

    try {
        const response = await axios.get(`${baseUrl}/statuses`, getAuthConfig);
        return response.data;
    } catch (error) {
        console.error("Error fetching ticket statuses:", error);
        throw error;
    }
}

export default { getTicketTypes, getTicketPriorities, getTicketStatuses };