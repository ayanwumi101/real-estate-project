import { GET } from "~/app/api/hello/route";

const API_ROUTES = {
  //auth endpoints
  LOGIN: '/login',
  SIGNUP: '/auth/register',
  ADD_PASSWORD: '/auth/add-password',
  VALIDATE_USER_OTP: '/auth/validate-new-user-otp-email',
  RESEND_OTP: '/auth/resend-otp',
  FORGOT_PASSWORD: '/auth/forgot-password',
  VERIFY_RESET_PASSWORD_TOKEN: '/auth/verify-reset-password-token',
  RESET_PASSWORD: '/auth/password-reset',
  CHANGE_PASSWORD: '/user/profile/change-password',
  

  //profile endpoints
  SAVE_USER_DETAILS: '/user/saveDetail',
  UPDATE_NEXT_OF_KIN_DETAILS: '/user/next-of-kin',
  UPDATE_BANK_DETAILS: '/user/bank-details',
  UPDATE_USER_ADDRESS: '/user/add-address',
  GET_USER_PROFILE_DETAILS: '/user/profile',
  ADD_NEXT_OF_KIN: '/user/next-of-kin',
  GET_NEXT_OF_KIN: '/user/next-of-kins',
  UPDATE_USER_PROFILE: '/user/profile/update',
  UPDATE_PROFILE: '/user/profile/update',
  ADD_PROFILE_IMAGE: '/user/update-profile-image',
  DISPLAY_CURRENCY_PREFERENCE: '/user/settings/display-currency',

  //assets endpoints
  ADD_ASSET_DETAILS: '/user/asset/create',
  UPDATE_ASSET_DELIVERY_STATUS: '/user/asset/delivery-status',
  UPDATE_ASSET_PAYMENT_PLAN: '/user/asset/payment-plan',
  UPDATE_ASSET_CASHFLOW_DETAILS: '/user/asset/cashflow-details',
  GET_USER_ASSETS: '/user/assets',
  GET_ASSET_DETAILS: '/user/asset',
  ADD_ASSET_IMAGES: '/user/asset/add-images',
  ADD_NEXT_OF_KIN_TO_ASSET: '/user/asset/attach_noks',
  DELETE_ASSET: '/user/asset/delete',
  UPDATE_ASSET_DETAILS: '/user/asset/update',
  GET_ASSET_REMITTANCES: '/user/asset/remittance',
  ADD_ASSET_REMITTANCE: '/user/asset/remittance',
  REMOVE_NEXT_OF_KIN_FROM_ASSET: '/user/asset/remove-nok',
  GET_ASSET_DUE_DATES: '/user/asset',
  ADD_PAYMENT_TO_ASSET: '/user/asset/payment/add',
  ADD_PAYMENT_TO_INSTALMENT_ASSET: '/user/asset/instalment-payment/add',

  //location endpoints
  GET_ALL_COUNTRIES: '/countries',
  GET_COUNTRY_STATES: '/countries',
  GET_STATE_DETAILS: '/states',
  GET_STATE_CITIES: 'city-state',
  GET_CITY_LGAS: 'lgas',

  //next of kin endpoints
  EDIT_NEXT_OF_KIN_DETAILS: '/user/next-of-kin',
  DELETE_NEXT_OF_KIN: '/user/next-of-kin',

  //realtor property endpoints
  GET_REALTOR_PROPERTIES: '/realtor/properties/all',
  ADD_REALTOR_PROPERTY: '/realtor/properties/add',
  UPDATE_REALTOR_PROPERTY: '/realtor/properties',


  //clients endpoints
  GET_CLIENTS: '/realtor/clients',
  ADD_CLIENT: '/realtor/clients/add',
  GET_CLIENT_DETAILS: '/realtor/clients',
  GET_PROPERTY_DETAILS: '/realtor/properties',
  GET_PROPERTY_PAYMENTS: '/realtor/property-payments/sold',
  GET_INSTALMENT_PROPERTIES: '/realtor/properties/instalments',
  GET_INSTALMENT_PROPERTY_DETAILS: '/realtor/property-payments/instalments/payment',

  //contact us and reques service endpoints
  CONTACT_US: 'contact-us',
  PROPERTY_VERIFICATION: '/property-verifications'

};

export default API_ROUTES;
