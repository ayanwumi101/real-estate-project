import axiosInstance from '../axiosConfig';
import API_ROUTES from '../endpoints';

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post(API_ROUTES.LOGIN, credentials);
  return response.data;
};

export const SignupUser = async (data) => {
  const response = await axiosInstance.post(API_ROUTES.SIGNUP, data);
  return response.data;
}

export const AddPassowrd = async (data) => {
  const response = await axiosInstance.post(API_ROUTES.ADD_PASSWORD, data);
  return response.data;
}

export const ValidateOtp = async (data) => {
  const response = await axiosInstance.post(API_ROUTES.VALIDATE_USER_OTP, data)
  return response.data;
}

export const ResendOtp = async (data) => {
  const response = await axiosInstance.post(API_ROUTES.RESEND_OTP, data);
  return response.data;
}

export const ForgotPassword = async (data) => {
  const response = await axiosInstance.post(API_ROUTES.FORGOT_PASSWORD, data);
  return response.data;
}

export const VerifyResetPasswordToken = async(data) => {
  const response = await axiosInstance.post(API_ROUTES.VERIFY_RESET_PASSWORD_TOKEN, data);
  return response.data;
}

export const SaveUserDetails = async (data) => {
  const response = await axiosInstance.post(API_ROUTES.SAVE_USER_DETAIL, data);
  return response.data;
}