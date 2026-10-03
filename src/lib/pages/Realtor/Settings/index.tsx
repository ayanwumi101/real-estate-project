'use client';

import React, { useState, useEffect, Suspense } from 'react';
import NavigationTab from './components/NavigationTab';
import { Box } from '@chakra-ui/react';
import Profile from './components/Profile';
import Notifications from './components/Notifications';
import Privacy from './components/Privacy';
import Security from './components/Security';
import NextOfKins from './components/NextOfKins';
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader';
import { useSearchParams } from 'next/navigation';
import { GetUserNotificationPreferences } from '~/lib/api/services/notificationService';
import { NotificationPreference } from '~/lib/api/services/notificationService';

const NotificationsContainer = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState('Profile');
  const tabs = [
    'Profile',
    // 'Next of Kins',
    'Notifications',
    'Privacy',
    'Security',
  ];
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
    <RealtorDashboardLayout title="Settings">
      <NavigationTab
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Box>
        {activeTab === 'Profile' && <Profile />}
        {/* {activeTab === 'Next of Kins' && <NextOfKins />} */}
        {activeTab === 'Notifications' && (
          <Notifications preferences={notificationPreferences} />
        )}
        {activeTab === 'Privacy' && <Privacy />}
        {activeTab === 'Security' && <Security />}
      </Box>
    </RealtorDashboardLayout>
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
