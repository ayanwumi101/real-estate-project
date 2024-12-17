import axiosInstance from '../axiosConfig';
import API_ROUTES from '../endpoints';

export const UpdatebankDetails = async (data) => {
  const response = await axiosInstance.post(
    API_ROUTES.UPDATE_BANK_DETAILS,
    data
  );
  return response.data;
};

export const UpdateNextOfKinDetails = async (data) => {
  const response = await axiosInstance.post(
    API_ROUTES.UPDATE_NEXT_OF_KIN_DETAILS,
    data
  );
  return response.data;
};

export const SaveUserDetails = async (data) => {
  const response = await axiosInstance.post(
    API_ROUTES.SAVE_USER_DETAILS,
    data
  );
  return response.data;
};


export const GetNigerianBanks = async () => {
  const response = await axiosInstance.get('https://nigerianbanks.xyz/');
  return response;
}