'use client';

import React, { useState } from 'react';
import NavigationTab from './components/NavigationTab';
import { Box } from '@chakra-ui/react';
import Profile from './components/Profile';
import Notifications from './components/Notifications';
import Privacy from './components/Privacy';
import Security from './components/Security';
import NextOfKins from './components/NextOfKins';
import DashboardHeader from '~/lib/layout/components/DashboardHeader';

const index = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const tabs = [
    'Profile',
    'Next of Kins',
    'Notifications',
    'Privacy',
    'Security',
  ];
  return (
    <DashboardHeader title="Settings">
      <Box>
        <NavigationTab
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Box>
          {activeTab === 'Profile' && <Profile />}
          {activeTab === 'Next of Kins' && <NextOfKins />}
          {activeTab === 'Notifications' && <Notifications />}
          {activeTab === 'Privacy' && <Privacy />}
          {activeTab === 'Security' && <Security />}
        </Box>
      </Box>
    </DashboardHeader>
  );
};

export default index;
