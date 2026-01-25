import { Update } from 'next/dist/build/swc';
import axiosInstance from '../axiosConfig';
import API_ROUTES from '../endpoints';

export const GetRealtorProperties = async () => {
  const response = await axiosInstance.get(API_ROUTES.GET_REALTOR_PROPERTIES);
  return response.data;
};

export const GetSoldRealtorProperties = async () => {
  const response = await axiosInstance.get(
    `${API_ROUTES.GET_PROPERTY_PAYMENTS}`
  );
  return response.data;
};

export const GetInstalmentRealtorProperties = async () => {
  const response = await axiosInstance.get(
    `${API_ROUTES.GET_INSTALMENT_PROPERTIES}`
  );
  return response.data;
};

export const AddRealtorProperty = async (propertyData: any) => {
  const response = await axiosInstance.post(
    API_ROUTES.ADD_REALTOR_PROPERTY,
    propertyData
  );
  return response.data;
};

export const GetAllPropertyPayments = async () => {
  const response = await axiosInstance.get(
    `${API_ROUTES.GET_PROPERTY_PAYMENTS}`
  );
  return response.data;
};

export const GetAvailablePropertyDetails = async (propertyId: string) => {
  const response = await axiosInstance.get(
    `${API_ROUTES.GET_PROPERTY_DETAILS}/available/${propertyId}`
  );
  return response.data;
};


export const GetInstalmentPropertyPaymentHistory = async (
  propertyId: string
) => {
  const response = await axiosInstance.get(
    `/realtor/properties/${propertyId}/sales-history`
  );
  return response.data;
};

export const GetSoldPropertyDetails = async (propertyId: string) => {
  const response = await axiosInstance.get(
    `/realtor/property-payments/sold/${propertyId}/details`
  );
  return response.data;
};

export const GetSoldPropertyPayments = async (propertyId: string) => {
  const response = await axiosInstance.get(
    `/realtor/property-payments/sold/${propertyId}/details`
  );
  return response.data;
};

export const GetInstalmentPropertyDetails = async (propertyId: string) => {
  const response = await axiosInstance.get(
    `/realtor/property-payments/instalments/payment/${propertyId}/details`
  );
  return response.data;
};

interface PaymentDetails {
  instalment_id: string;
  amount_sold: number;
  instalment_amount: number;
  commission: number;
  payment_date: string | Date;
  payment_plan: string;
  status: 'pending' | 'completed';
}

export const CreateNewPropertyPayment = async (paymentData: PaymentDetails) => {
  const response = await axiosInstance.post(
    API_ROUTES.GET_PROPERTY_PAYMENTS,
    paymentData
  );
  return response.data;
};

export const GetPropertyPaymentDetails = async (paymentId: string) => {
  const response = await axiosInstance.get(
    `${API_ROUTES.GET_PROPERTY_PAYMENTS}/${paymentId}`
  );
  return response.data;
};

interface UpdatePaymentDetails {
  amount_sold: number;
  instalment_amount: number;
  commission: number;
  payment_date: string | Date;
  payment_plan: string;
  status: 'pending' | 'completed';
}
export const UpdatePropertyPayment = async (
  paymentId: string,
  paymentData: UpdatePaymentDetails
) => {
  const response = await axiosInstance.put(
    `${API_ROUTES.GET_PROPERTY_PAYMENTS}/${paymentId}`,
    paymentData
  );
  return response.data;
};

export const DeletePropertyPayment = async (paymentId: string) => {
  const response = await axiosInstance.delete(
    `${API_ROUTES.GET_PROPERTY_PAYMENTS}/${paymentId}`
  );
  return response.data;
};

interface SoldPropertyPayment {
  realtor_property_id: string;
  client_id: string;
  // sale_price: number;
  amount_sold: number;
  commission: number;
  date_sold: string | Date;
  allocation_status: string;
  documentation_status: string;
  handover_status: string;
  payment_plan: string;
}
export const CreateSoldPropertyPayment = async (
  soldData: SoldPropertyPayment
) => {
  const response = await axiosInstance.post(
    `/realtor/property-payments/sold`,
    soldData
  );
  return response.data;
};

interface InstalmentPropertyPayment {
  client_id: string;
  amount_sold: number;
  first_deposit: number;
  duration: string;
  payment_duration: string;
  instalment_amount: number;
  commission: number;
  payment_plan: string;
  first_payment_date: string | Date;
  next_instalment_date: string | Date;
  allocation_status: string;
  documentation_status: string;
  handover_status: string;
}
export const CreateInstalmentPropertyPayment = async (
  propertyId: string,
  instalmentData: InstalmentPropertyPayment
) => {
  const response = await axiosInstance.post(
    `/realtor/property-payments/instalments/${propertyId}/start`,
    instalmentData
  );
  return response.data;
};

export const AddPaymentToInstalmentProperty = async (data: {
  property_sale_id: string;
  client_id: string;
  amount_paid: number;
  payment_date: string | Date;
  due_date: string | Date;
  commission: number;
  payment_status: string;
}) => {
  const response = await axiosInstance.post(
    '/realtor/property-payments/instalments/add-payment',
    data
  );
  return response.data;
};

export const GetPropertyDueDates = async (instalmentId: string) => {
  const response = await axiosInstance.get(
    `/realtor/property-payments/instalments/dues/${instalmentId}`
  );
  return response.data;
};

export const GetPropertyPaymentHistory = async (propertyId: string) => {
  const response = await axiosInstance.get(
    `/realtor/property-sales/${propertyId}/history`
  );
  return response.data;
};

export const UpdateProperty = async (
  propertyId: string,
  propertyData: {
    property_name: string;
    property_type: string;
    size: string;
    house_number: string;
    street_name: string;
    city_name: string;
    state_id: string;
    lga_id: string;
    property_cost: string;
    comment: string;
  }
) => {
  const response = await axiosInstance.put(
    `/realtor/properties/${propertyId}`,
    propertyData
  );
  return response.data;
};
