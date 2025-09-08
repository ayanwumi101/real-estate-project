import axiosInstance from '../axiosConfig';
import API_ROUTES from '../endpoints';

export const GetRealtorProperties = async () => {
  const response = await axiosInstance.get(API_ROUTES.GET_REALTOR_PROPERTIES);
  return response.data;
};

export const AddRealtorProperty = async (propertyData: any) => {
  const response = await axiosInstance.post(API_ROUTES.ADD_REALTOR_PROPERTY, propertyData);
  return response.data;
};
