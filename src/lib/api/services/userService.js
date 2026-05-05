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
  return response;
}

export const ResendOtp = async (data) => {
  const response = await axiosInstance.post(API_ROUTES.RESEND_OTP, data);
  return response;
}

export const ForgotPassword = async (data) => {
  const response = await axiosInstance.post(API_ROUTES.FORGOT_PASSWORD, data);
  return response.data;
}

export const VerifyResetPasswordToken = async(data) => {
  const response = await axiosInstance.post(API_ROUTES.VERIFY_RESET_PASSWORD_TOKEN, data);
  return response.data;
}


export const ResetPassword = async(data) => {
  const response = await axiosInstance.post(API_ROUTES.RESET_PASSWORD, data);
  return response.data;
}


export const ChangePassword = async(data) => {
  const response = await axiosInstance.post(API_ROUTES.CHANGE_PASSWORD, data);
  return response.data;
}


export const AddNextOfKin = async(data) => {
  const response = await axiosInstance.post(API_ROUTES.ADD_NEXT_OF_KIN, data);
  return response.data;
}

export const GetNextOfKins = async() => {
  const response = await axiosInstance.get(API_ROUTES.GET_NEXT_OF_KIN);
  return response.data;
}


export const UpdateUserProfile = async(data) => {
  const response = await axiosInstance.post(API_ROUTES.UPDATE_USER_PROFILE, data);
  return response.data;
}

export const GetCurrencyPreference = async () => {
  const response = await axiosInstance.get(`${API_ROUTES.DISPLAY_CURRENCY_PREFERENCE}`);
  return response.data;
} 

export const UpdateDisplayCurrencyPreference = async (displayCurrency) => {
  const response = await axiosInstance.put(`${API_ROUTES.DISPLAY_CURRENCY_PREFERENCE}`, { display_currency: displayCurrency });
  return response.data;
}