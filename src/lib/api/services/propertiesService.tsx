import { Update } from 'next/dist/build/swc';
import axiosInstance from '../axiosConfig';
import API_ROUTES from '../endpoints';

export const GetRealtorProperties = async () => {
  const response = await axiosInstance.get(API_ROUTES.GET_REALTOR_PROPERTIES);
  return response.data;
};

export const AddRealtorProperty = async (propertyData: any) => {
  const response = await axiosInstance.post(
    API_ROUTES.ADD_REALTOR_PROPERTY,
    propertyData
  );
  return response.data;
};

export const GetRealtorPropertyDetails = async (propertyId: string) => {
  const response = await axiosInstance.get(
    `${API_ROUTES.GET_PROPERTY_DETAILS}/${propertyId}`
  );
  return response.data;
};

export const GetAllPropertyPayments = async () => {
  const response = await axiosInstance.get(
    `${API_ROUTES.GET_PROPERTY_PAYMENTS}`
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
    `${API_ROUTES.GET_PROPERTY_PAYMENTS}/sold`,
    soldData
  );
  return response.data;
};

interface InstalmentPropertyPayment {
  client_id: string;
  amount_sold: number;
  first_deposit: number;
  payment_duration: string;
  instalment_amount: number;
  commission_received: number;
  payment_plan: string;
  first_payment_date: string | Date;
  next_payment_date: string | Date;
  allocation_status: string;
  documentation_status: string;
  handover_status: string;
}
export const CreateInstalmentPropertyPayment = async (
  instalmentData: InstalmentPropertyPayment
) => {
  const response = await axiosInstance.post(
    `${API_ROUTES.GET_PROPERTY_PAYMENTS}/instalment`,
    instalmentData
  );
  return response.data;
};
