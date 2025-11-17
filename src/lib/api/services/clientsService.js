import axiosInstance from '../axiosConfig';
import API_ROUTES from '../endpoints';


export const GetRealtorClients = async () => {
    const response = await axiosInstance.get(API_ROUTES.GET_CLIENTS);
    return response.data;
};

export const AddRealtorClient = async (clientData) => {
    const response = await axiosInstance.post(API_ROUTES.ADD_CLIENT, clientData);
    return response.data;
}

export const GetClientDetails = async (clientId) => {
    const response = await axiosInstance.get(`${API_ROUTES.GET_CLIENT_DETAILS}/${clientId}`);
    return response.data;
}