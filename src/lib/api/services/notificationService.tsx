import axiosInstance from '../axiosConfig';
import API_ROUTES from '../endpoints';

export interface NotificationPreference {
  category: string;
  label: string;
  events: {
    event_key: string;
    label: string;
    description: string;
    in_app: boolean;
    email: boolean;
    whatsapp: boolean;
  }[];
}

export interface UpdateNotificationPreference {
  preferences: {
    event_key: string;
    in_app: boolean;
    email: boolean;
    whatsapp: boolean;
  }[];
}

export interface Notification {
  id: string;
  event_key: string;
  category: string;
  title: string;
  body: string;
  data: {
    amount: string;
    payment_id: number;
    property_id: string;
  };
  read: boolean;
  read_at: null | Date;
  created_at: Date;
}

export const GetUserNotifications = async () => {
  const response = await axiosInstance.get(API_ROUTES.GET_USER_NOTIFICATIONS);
  return response.data;
};

export const GetUnreadUserNotifications = async () => {
  const response = await axiosInstance.get(
    API_ROUTES.GET_UNREAD_USER_NOTIFICATIONS
  );
  return response.data;
};

export const MarkNotificationAsRead = async (id: string) => {
  const response = await axiosInstance.post(
    `${API_ROUTES.MARK_NOTIFICATION_AS_READ}/${id}/read`
  );
  return response.data;
};

export const MarkAllNotificationAsRead = async () => {
  const response = await axiosInstance.post(
    `${API_ROUTES.MARK_ALL_NOTIFICATIONS_AS_READ}`
  );
  return response.data;
};
export const DeleteNotification = async (id: string) => {
  const response = await axiosInstance.delete(
    `${API_ROUTES.DELETE_NOTIFICATION}/${id}`
  );
  return response.data;
};

export const GetUserNotificationPreferences = async () => {
  const response = await axiosInstance.get(
    `${API_ROUTES.GET_USER_NOTIFICATION_PREFERENCES}`
  );
  return response.data;
};

export const UpdateUserNotificationPreference = async (
  payload: UpdateNotificationPreference
) => {
  const response = await axiosInstance.put(
    `${API_ROUTES.UPDATE_USER_NOTIFICATION_PREFERENCE}`,
    payload
  );
  return response.data;
};
