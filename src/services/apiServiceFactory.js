import axios from 'axios';
import { getAuthConfig, checkToken } from './auth';

export const apiServiceFactory = (resourceName) => {
    const baseUrl = `/api/${resourceName}`;

    const getAll = async () => {
        const tokenCheckResult = await checkToken(); 

        if (!tokenCheckResult) {
            return;
        }
        try {
            const response = await axios.get(baseUrl, getAuthConfig());
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch ${resourceName}:`, error.response?.data || error.message);
        }
    };

    const create = async (newObject) => {
        const tokenCheckResult = await checkToken();

        if (!tokenCheckResult) {
            return;
        }
        try {
            const response = await axios.post(baseUrl, newObject, getAuthConfig());
            return response.data;
        } catch (error) {
            console.error(`Failed to create ${resourceName}:`, error.response?.data || error.message);
        }
    };

    const update = async (id, updatedObject) => {
        const tokenCheckResult = await checkToken();

        if (!tokenCheckResult) {
            return;
        }
        try {
            const response = await axios.put(`${baseUrl}/${id}`, updatedObject, getAuthConfig());
            return response.data;
        } catch (error) {
            console.error(`Failed to update ${resourceName}:`, error.response?.data || error.message);
        }
    };

    const remove = async (id) => {
        const tokenCheckResult = await checkToken();

        if (!tokenCheckResult) {
            return;
        }
        try {
            await axios.delete(`${baseUrl}/${id}`, getAuthConfig());
        } catch (error) {
            console.error(`Failed to delete ${resourceName}:`, error.response?.data || error.message);
        }
    };

    return {
        getAll,
        create,
        update,
        remove,
    };
};

export const userService = apiServiceFactory('users');
export const projectService = apiServiceFactory('projects');
export const ticketService = apiServiceFactory('tickets');
export const roleService = apiServiceFactory('roles');
