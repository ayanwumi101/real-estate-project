import axiosInstance from '../axiosConfig';
import API_ROUTES from '../endpoints';

export const AddAssetDetails = async (data) => {
  const response = await axiosInstance.post(API_ROUTES.ADD_ASSET_DETAILS, data);
  return response.data;
};

export const UpdateAssetDeliveryStatus = async (propertyId, data) => {
  const response = await axiosInstance.post(
    `${API_ROUTES.UPDATE_ASSET_DELIVERY_STATUS}/${propertyId}`,
    data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return response.data;
};

export const UpdateAssetPaymentPlan = async (propertyId, data) => {
  const response = await axiosInstance.post(
    `${API_ROUTES.UPDATE_ASSET_PAYMENT_PLAN}/${propertyId}`,
    data
  );
  return response.data;
};

export const UpdateAssetCashflowDetails = async (propertyId, data) => {
  const response = await axiosInstance.post(
    `${API_ROUTES.UPDATE_ASSET_CASHFLOW_DETAILS}/${propertyId}`,
    data
  );
  return response.data;
};


export const GetUserAssets = async () => {
  const response = await axiosInstance.get(API_ROUTES.GET_USER_ASSETS);
  return response.data;
}


export const AddAssetImages = async (data) => {
  const response = await axiosInstance.post(API_ROUTES.ADD_ASSET_IMAGES, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}


export const AddNextOfKinToAsset = async (data) => {
  const response = await axiosInstance.post(API_ROUTES.ADD_NEXT_OF_KIN_TO_ASSET, data);
  return response.data;
}

export const GetAssetDetails = async (propertyId) => {
  const response = await axiosInstance.get(`${API_ROUTES.GET_ASSET_DETAILS}/${propertyId}`);
  return response.data;
}


export const AddAsset = async (data) => {
  const response = await axiosInstance.post(API_ROUTES.ADD_ASSET_DETAILS, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}


export const DeleteAsset = async (propertyId) => {
  const response = await axiosInstance.delete(`${API_ROUTES.DELETE_ASSET}/${propertyId}`);
  return response.data;
}