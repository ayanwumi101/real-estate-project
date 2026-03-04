import axiosInstance from '../axiosConfig';
import API_ROUTES from '../endpoints';


export const GetRealtorClients = async () => {
    const response = await axiosInstance.get(API_ROUTES.GET_CLIENTS);
    return response.data;
};

export const AddRealtorClient = async (clientData: any) => {
    const response = await axiosInstance.post(API_ROUTES.ADD_CLIENT, clientData);
    return response.data;
}

export const GetClientDetails = async (clientId: string, filters: {
    state: string;
    sale_type?: string;
    payment_status?: string;
    allocation_status?: string;
    documentation_status?: string;
    handover_status?: string;
}) => {
    const cleanedParams = Object.fromEntries(
    Object.entries(filters).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ''
    )
  );
    const response = await axiosInstance.get(`${API_ROUTES.GET_CLIENT_DETAILS}/${clientId}`, {
        params: cleanedParams,
    });
    return response.data;
}

export const GetClientTransactions = async (clientId: string) => {
    const response = await axiosInstance.get(`${API_ROUTES.GET_CLIENT_DETAILS}/${clientId}/transactions`);
    return response.data;
}

export const GetClientAnalytics = async (clientId: string) => {
    const response = await axiosInstance.get(`${API_ROUTES.GET_CLIENT_DETAILS}/${clientId}/analytics`);
    return response.data;
}