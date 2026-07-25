'use client';

import DashboardHeader from '~/lib/layout/components/DashboardHeader';
import Header from './components/Header';
import Notifications from './components/Notifications';
import { Stack } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { Notification } from '~/lib/api/services/notificationService';
import { AppContext } from '~/lib/layout';

const index = () => {
  const [activeTab, setActiveTab] = useState<
    'all' | 'payments' | 'properties' | 'remittance'
  >('all');
  const { notifications, notificationsLoading, setNotifications } =
    useContext(AppContext);
  const [filteredNotifications, setFilteredNotifications] = useState<
    Notification[]
  >([]);

  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredNotifications(notifications);
    } else {
      const filteredNotifications = notifications?.filter(
        (notification: Notification) => {
          return notification?.category === activeTab;
        }
      );
      setFilteredNotifications(filteredNotifications);
    }
  }, [activeTab, notifications]);
  return (
    <DashboardHeader title="Notifications">
      <Stack spacing="25px" p="25px 20px">
        <Header
          tabs={['all', 'payments', 'properties', 'remittance']}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Notifications
          notifications={filteredNotifications}
          notificationsLoading={notificationsLoading}
        />
      </Stack>
    </DashboardHeader>
  );
};

export default index;
