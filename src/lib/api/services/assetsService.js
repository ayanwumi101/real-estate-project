import axiosInstance from '../axiosConfig';
import API_ROUTES from '../endpoints';

export const AddAssetDetails = async (data) => {
  const response = await axiosInstance.post(API_ROUTES.ADD_ASSET_DETAILS, data);
  return response.data;
};

export const UpdateAssetDeliveryStatus = async (propertyId, data) => {
  const response = await axiosInstance.post(
    `${API_ROUTES.UPDATE_ASSET_DELIVERY_STATUS}/${propertyId}`,
    data
  );
  return response.data;
};

export const UpdateAssetPaymentPlan = async (data, propertyId) => {
  const response = await axiosInstance.post(
    `${API_ROUTES.UPDATE_ASSET_PAYMENT_PLAN}/${propertyId}`,
    data
  );
  return response.data;
};

export const UPDATE_ASSET_CASHFLOW_DETAILS = async (data, propertyId) => {
  const response = await axiosInstance.post(
    `${API_ROUTES.UPDATE_ASSET_CASHFLOW_DETAILS}/${propertyId}`,
    data
  );
  return response.data;
};