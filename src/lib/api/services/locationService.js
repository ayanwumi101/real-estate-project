import axiosInstance from '../axiosConfig';
import API_ROUTES from '../endpoints';

export const GetAllCountries = async () => {
  const response = await axiosInstance.get(API_ROUTES.GET_ALL_COUNTRIES);
  return response.data;
};

export const GetCountryStates = async (id) => {
  const response = await axiosInstance.get(
    `${API_ROUTES.UPDATE_ASSET_DELIVERY_STATUS}/${id}`
  );
  return response.data;
};

export const GetStateDetails = async (id) => {
  const response = await axiosInstance.get(
    `${API_ROUTES.GET_STATE_DETAILS}/${id}`
  );
  return response.data;
};

export const GET_STATE_CITIES = async (id) => {
  const response = await axiosInstance.get(
    `${API_ROUTES.GET_STATE_CITIES}/${id}`
  );
  return response.data;
};

export const GetCityLgas = async (id) => {
  const response = await axiosInstance.get(
    `${API_ROUTES.GET_CITY_LGAS}/${id}`
  );
  return response.data;
};