import axiosInstance from '../axiosConfig';
import API_ROUTES from '../endpoints';

export const AddNextOfKinDetails = async (data) => {
  const response = await axiosInstance.post(API_ROUTES.ADD_NEXT_OF_KIN, data);
  return response.data;
}

export const UpdateNextOfKinDetails = async (nokId, data) => {
  const response = await axiosInstance.put(`${API_ROUTES.UPDATE_NEXT_OF_KIN_DETAILS}/${nokId}`, data);
  return response.data;
}

export const DeleteNextOfKin = async (nokId) => {
  const response = await axiosInstance.delete(`${API_ROUTES.DELETE_NEXT_OF_KIN}/${nokId}`);
  return response.data;
}