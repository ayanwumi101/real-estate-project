import axiosInstance from '../axiosConfig';
import API_ROUTES from '../endpoints';

export interface UpcomingPayment {
  amount: string;
  asset_type: 'cashflow' | 'owned' | 'instalment';
  cashflow_duration: 'string';
  created_at: string | Date;
  days_overdue: number;
  days_until_due: number;
  due_status: string;
  id: number;
  is_due: boolean;
  payment_date: string | null;
  payment_due_date: string;
  payment_type: string;
  property_id: string;
  property_name: string;
  property_type: string;
  address: string;
  location: string;
  house_number: string;
  street_name: string;
  city_name: string;
  lga: string;
  state: string;
  status: 'pending' | 'completed';
}

export interface CurrencyResponse {
  ngn: number;
  usd: number;
  display_value: number;
  display_currency: string;
}

export interface UpcomingPaymentSummary {
  as_of: string;
  due: {
    count: number;
    total_amount: number | CurrencyResponse;
  };
  upcoming: {
    count: number;
    total_amount: number | CurrencyResponse;
  };
  all: {
    count: number;
    total_amount: number | CurrencyResponse;
  };
}

export interface DashboardUpcomingPayments {
  data: UpcomingPayment[];
  message: 'Pending payments retrieved successfully';
  status: true;
  summary: {
    as_of: '2026-10-27';
    due: {
      count: 0;
      total_amount: {
        ngn: 0;
        usd: 0;
        display_value: 0;
        display_currency: 'USD';
      };
    };
    upcoming: {
      count: 0;
      total_amount: {
        ngn: 0;
        usd: 0;
        display_value: 0;
        display_currency: 'USD';
      };
    };
    all: {
      count: 0;
      total_amount: {
        ngn: 0;
        usd: 0;
        display_value: 0;
        display_currency: 'USD';
      };
    };
  };
  filters: {
    filter: 'all';
    type: null;
    start_date: '2026-10-01';
    end_date: '2026-12-31';
    sort_order: 'asc';
  };
  meta: {
    current_page: 1;
    last_page: 1;
    per_page: 15;
    total: 0;
  };
}

export const GetDashboardUpcomingPayments = async (params?: {
  filter?: string;
  type?: string;
  page?: number;
  per_page?: number;
  start_date?: string;
  end_date?: string;
}) => {
  const response = await axiosInstance.get(
    API_ROUTES.GET_DASHBOARD_UPCOMING_PAYMENTS,
    { params }
  );
  return response.data;
};
