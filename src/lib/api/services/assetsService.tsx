import axiosInstance from '../axiosConfig';
import API_ROUTES from '../endpoints';


export interface Money {
  ngn: number;
  usd: number;
  display_value: number;
  display_currency: string;
}

export interface CurrencyMeta {
  rate: number;
  base_currency: string;
  display_currency: string;
  rate_source: string;
  is_fallback: boolean;
  rate_cached_at: string;
  rate_expires_at: string;
}


export interface Payment {
  id: number;
  payment_date: string | null;
  amount: Money;
  status: 'pending' | 'completed';
  property_id: string;
  payment_due_date_id: number;
  payment_due_date: string;
  created_at: string;
  updated_at: string;
  currency_meta: CurrencyMeta;
}

export interface NextOfKin {
  id: number;
  fullname: string;
  phone: string;
  email: string;
  relationship: string;
}

export interface Valuation {
  id: string;
  value: Money;
  value_date: string;
  source: string;
  notes?: string;
  created_at?: string;
}

export interface Property {
  id: string;
  property_name: string;
  property_type: string;
  size: string;
  house_number: string;
  street_name: string;
  city_name: string;
  state_id: string;
  lga_id: string;

  comment: string | null;
  payment_status: string | null;
  allocation_status: string | null;
  documentation_status: string | null;
  handover_status: string | null;

  cashflow_source: string | null;
  is_occupied: boolean;
  last_cashflow_date: string | null;
  cashflow_amount: Money | null;
  cashflow_duration: string | null;
  cashflow_payment_due: string | null;

  asset_type: 'cashflow' | 'instalment' | 'owned';

  equity_ownership: number | null;
  price_per_share: number | null;
  total_shares: number | null;
  available_shares: number | null;

  property_cost: Money;
  property_value: Money | null;

  duration: string | null;
  amount_paid: Money | null;
  amount_left: Money | null;

  payment_plan: string | null;
  payment_date: string | null;
  due_date: string | null;
  bought_date: string | null;

  yield_cashflow: boolean;
  total_payment_amount: Money;

  payments: Payment[];

  realtor_phone: string;
  realtor_name: string;

  no_of_payments: number;
  images: string[];

  nextOfKins: NextOfKin[];

  next_due_date: string | null;

  current_valuation: Valuation | null;
  valuation_history: Valuation[];

  currency_meta: CurrencyMeta;
}


export interface Summary {
  total_assets: number;
  total_current_valuation: Money;
  total_investment: Money;
  appreciation_margin: Money;
  appreciation_percent: number;
}

export interface NGNSummary {
  total_assets: number;
  total_current_valuation: number;
  total_investment: number;
  appreciation_margin: number;
  appreciation_percent: number;
}

export interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PropertiesResponse {
  data: Property[];
  message: string;
  status: boolean;
  summary: Summary;
  meta: Meta;
}

export interface NGNPropertiesResponse {
  data: Property[];
  message: string;
  status: boolean;
  summary: NGNSummary;
  meta: Meta;
}

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
