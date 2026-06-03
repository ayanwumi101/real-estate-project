import axiosInstance from '../axiosConfig';
import API_ROUTES from '../endpoints';

export const ContactUS = async (data: {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) => {
  const response = await axiosInstance.post(API_ROUTES.CONTACT_US, data);
  return response.data;
};

export const RequestPropertyVerification = async (data: {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  service_type: string;
  delivery_method: string;
  contact_firstname: string;
  contact_lastname: string;
  contact_phone: string;
  property_address: string;
  property_description: string;
  notes: string;
}) => {
  const response = await axiosInstance.post(
    API_ROUTES.PROPERTY_VERIFICATION,
    data
  );
  return response.data;
};
