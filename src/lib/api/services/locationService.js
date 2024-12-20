import axiosInstance from '../axiosConfig';
import API_ROUTES from '../endpoints';

export const GetAllCountries = async () => {
  const response = await axiosInstance.get(API_ROUTES.GET_ALL_COUNTRIES);
  return response.data;
};

export const GetCountryStates = async (id) => {
  const response = await axiosInstance.get(
    `${API_ROUTES.GET_COUNTRY_STATES}/${id}`
  );
  return response.data;
};

export const GetStateDetails = async (id) => {
  const response = await axiosInstance.get(
    `${API_ROUTES.GET_STATE_DETAILS}/${id}`
  );
  return response.data;
};

export const GetStateCities = async (id) => {
  const response = await axiosInstance.get(
    `${API_ROUTES.GET_STATE_CITIES}/${id}`
  );
  return response.data;
};

export const GetStateLgas = async (id) => {
  const response = await axiosInstance.get(
    `${API_ROUTES.GET_CITY_LGAS}/${id}`
  );
  return response.data;
};