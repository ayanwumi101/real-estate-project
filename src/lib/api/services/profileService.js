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


export const UpdateUserAddress = async (data) => {
  const response = await axiosInstance.post(
    API_ROUTES.UPDATE_USER_ADDRESS,
    data
  );
  return response.data;
};


export const SaveUserDetails = async (data) => {
  const response = await axiosInstance.post(
    API_ROUTES.SAVE_USER_DETAILS,
    data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return response.data;
};


export const GetNigerianBanks = async () => {
  const response = await axiosInstance.get('https://nigerianbanks.xyz/');
  return response;
}

export const GetUserProfileDetails = async () => {
  const response = await axiosInstance.get(API_ROUTES.GET_USER_PROFILE_DETAILS);
  return response.data;
}