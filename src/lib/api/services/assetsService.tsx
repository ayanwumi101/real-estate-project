import axiosInstance from '../axiosConfig';
import API_ROUTES from '../endpoints';

export const AddAssetDetails = async (data: any) => {
  const response = await axiosInstance.post(API_ROUTES.ADD_ASSET_DETAILS, data);
  return response.data;
};

export const UpdateAssetDeliveryStatus = async (
  propertyId: string,
  data: any
) => {
  const response = await axiosInstance.post(
    `${API_ROUTES.UPDATE_ASSET_DELIVERY_STATUS}/${propertyId}`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const UpdateAssetPaymentPlan = async (propertyId: string, data: any) => {
  const response = await axiosInstance.post(
    `${API_ROUTES.UPDATE_ASSET_PAYMENT_PLAN}/${propertyId}`,
    data
  );
  return response.data;
};

export const UpdateAssetCashflowDetails = async (
  propertyId: string,
  data: any
) => {
  const response = await axiosInstance.post(
    `${API_ROUTES.UPDATE_ASSET_CASHFLOW_DETAILS}/${propertyId}`,
    data
  );
  return response.data;
};

export const GetUserAssets = async (perPage: number, page: number) => {
  const response = await axiosInstance.get(`${API_ROUTES.GET_USER_ASSETS}?page=${page}&per_page=${perPage}`);
  return response.data;
};

export const GetUserAssetsWithFilter = async (filters: {
  search: string;
  status: boolean | string;
  duration: string;
  sort_by: string;
  sort_order: string;
}) => {
  const cleanedParams = Object.fromEntries(
    Object.entries(filters).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ''
    )
  );
  const response = await axiosInstance.get(API_ROUTES.GET_USER_ASSETS, {
    params: cleanedParams,
  });
  return response.data;
};

export const AddAssetImages = async (data: any) => {
  const response = await axiosInstance.post(API_ROUTES.ADD_ASSET_IMAGES, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const AddNextOfKinToAsset = async (data: any) => {
  const response = await axiosInstance.post(
    API_ROUTES.ADD_NEXT_OF_KIN_TO_ASSET,
    data
  );
  return response.data;
};

export const GetAssetDetails = async (propertyId: string) => {
  const response = await axiosInstance.get(
    `${API_ROUTES.GET_ASSET_DETAILS}/${propertyId}`
  );
  return response.data;
};

export const AddAsset = async (data: any) => {
  const response = await axiosInstance.post(
    API_ROUTES.ADD_ASSET_DETAILS,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const DeleteAsset = async (propertyId: string) => {
  const response = await axiosInstance.delete(
    `${API_ROUTES.DELETE_ASSET}/${propertyId}`
  );
  return response.data;
};

export const UpdateAssetDetails = async (propertyId: string, data: any) => {
  const response = await axiosInstance.put(
    `${API_ROUTES.UPDATE_ASSET_DETAILS}/${propertyId}`,
    data
  );
  return response.data;
};

export const GetAssetRemittances = async (propertyId: string) => {
  const response = await axiosInstance.get(
    `${API_ROUTES.GET_ASSET_REMITTANCES}/${propertyId}`
  );
  return response.data;
};

export const AddAssetRemittance = async (propertyId: string, data: any) => {
  const response = await axiosInstance.post(
    `${API_ROUTES.ADD_ASSET_REMITTANCE}/${propertyId}`,
    data
  );
  return response.data;
};

export const RemoveNextOfKinFromAsset = async (data: any) => {
  const response = await axiosInstance.delete(
    `${API_ROUTES.REMOVE_NEXT_OF_KIN_FROM_ASSET}`,
    {
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const GetAssetPaymentDueDates = async (propertyId: string) => {
  const response = await axiosInstance.get(
    `${API_ROUTES.GET_ASSET_DUE_DATES}/${propertyId}/payment-due-dates`
  );
  return response.data;
};

export const AddPaymentToAsset = async (data: any) => {
  const response = await axiosInstance.post(
    `${API_ROUTES.ADD_PAYMENT_TO_ASSET}`,
    data
  );
  return response.data;
};

export const AddPaymentToInstalmentAsset = async (data: {
  payment_date: string | Date;
  amount: number;
  status: string;
  property_id: string;
  payment_due_date: string | Date;
}) => {
  const response = await axiosInstance.post(
    `${API_ROUTES.ADD_PAYMENT_TO_INSTALMENT_ASSET}`,
    data
  );
  return response.data;
};


export const ChangeAssetStatus = async (
  propertyId: string,
  data: { is_occupied: boolean }
) => {
  const response = await axiosInstance.put(
    `/user/asset/status/${propertyId}`,
    data
  );
  return response.data;
};
