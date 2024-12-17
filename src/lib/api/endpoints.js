const API_ROUTES = {
  //auth endpoints
  LOGIN: '/login',
  SIGNUP: '/auth/register',
  ADD_PASSWORD: '/auth/add-password',
  VALIDATE_USER_OTP: '/auth/validate-new-user-otp-email',
  RESEND_OTP: '/auth/resend-otp',
  FORGOT_PASSWORD: '/auth/forgot-password',
  VERIFY_RESET_PASSWORD_TOKEN: '/auth/verify-reset-password-token',

  //profile endpoints
  SAVE_USER_DETAILS: '/user/saveDetail',
  UPDATE_NEXT_OF_KIN_DETAILS: '/user/next-of-kin',
  UPDATE_BANK_DETAILS: '/user/bank-details',

  //assets endpoints
  ADD_ASSET_DETAILS: '/user/add',
  UPDATE_ASSET_DELIVERY_STATUS: '/user/asset/delivery-status',
  UPDATE_ASSET_PAYMENT_PLAN: '/user/asset/payment-plan',
  UPDATE_ASSET_CASHFLOW_DETAILS: '/user/asset/cashflow-details',

  //location endpoints
  GET_ALL_COUNTRIES: '/countries',
  GET_COUNTRY_STATES: '/countries',
  GET_STATE_DETAILS: '/states',
  GET_STATE_CITIES: 'city-state',
  GET_CITY_LGAS: 'lgas',

  //social auth endpoints

};

export default API_ROUTES;
