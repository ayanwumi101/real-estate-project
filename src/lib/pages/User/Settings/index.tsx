'use client';

import React, { Suspense, useEffect, useState } from 'react';
import NavigationTab from './components/NavigationTab';
import { Box } from '@chakra-ui/react';
import Profile from './components/Profile';
import Notifications from './components/Notifications';
import Privacy from './components/Privacy';
import Security from './components/Security';
import NextOfKins from './components/NextOfKins';
import DashboardHeader from '~/lib/layout/components/DashboardHeader';
import { useSearchParams } from 'next/navigation';
import { GetUserNotificationPreferences } from '~/lib/api/services/notificationService';
import { NotificationPreference } from '~/lib/api/services/notificationService';

const NotificationsContainer = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const tabs = [
    'Profile',
    'Next of Kins',
    'Notifications',
    'Privacy',
    'Security',
  ];
  const [activeTab, setActiveTab] = useState<
    'Profile' | 'Next of Kins' | 'Notifications' | 'Privacy' | 'Security'
  >('Profile');
  const [notificationPreferences, setNotificationPreferences] = useState<
    NotificationPreference[]
  >([]);

  const FetchNotificationPreferences = async () => {
    try {
      const response = await GetUserNotificationPreferences();
      setNotificationPreferences(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchNotificationPreferences();
  }, []);

  useEffect(() => {
    if (tab && tabs.includes(tab as string)) {
      setActiveTab(
        tab as
          | 'Profile'
          | 'Next of Kins'
          | 'Notifications'
          | 'Privacy'
          | 'Security'
      );
    } else {
      setActiveTab('Profile');
    }
  }, [tab, tabs]);
  return (
    <DashboardHeader title="Settings">
      <Box>
        <NavigationTab
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {activeTab === 'Profile' && <Profile />}
        {activeTab === 'Next of Kins' && <NextOfKins />}
        {activeTab === 'Notifications' && (
          <Notifications preferences={notificationPreferences} />
        )}
        {activeTab === 'Privacy' && <Privacy />}
        {activeTab === 'Security' && <Security />}
      </Box>
    </DashboardHeader>
  );
};

const Index = () => {
  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <NotificationsContainer />
    </Suspense>
  );
};

export default Index;
