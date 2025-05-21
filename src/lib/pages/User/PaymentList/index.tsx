'use client'

import React from 'react';
import NavigationTab from './components/NavigationTab';
import { Box, Stack, Button, Heading } from '@chakra-ui/react';

const index = () => {
  const tabs = ['pending payments', 'completed payments'];
  const [activeTab, setActiveTab] = React.useState<string>('pending payments');
  return (
    <Box>
      <NavigationTab
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        assetType="instalment"
        totalAmountReceived={1500000}
      />
    </Box>
  );
};

export default index;
