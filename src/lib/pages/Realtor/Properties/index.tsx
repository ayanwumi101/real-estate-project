'use client'

import { Stack, Box } from '@chakra-ui/react'
import React from 'react'
import RealtorDashboardHeader from '~/lib/layout/components/RealtorDashboardHeader'
import NavigationTab from './components/NavigationTab'
import AvailableProperties from './components/AvailableProperties'
import SoldProperties from './components/SoldProperties'
import InstalmentProperties from './components/InstalmentProperties'




const index = () => {
  const tabs = ['available', 'sold', 'instalment']
  const [activeTab, setActiveTab] = React.useState<'available' | 'sold' | 'instalment'>('available')
  return (
    <RealtorDashboardHeader title="Properties">
      <Stack spacing="30px">
        <NavigationTab tabs={tabs} setActiveTab={setActiveTab} activeTab={activeTab} />
        <Box>
          {activeTab === 'available' && <AvailableProperties />}
          {activeTab === 'sold' && <SoldProperties />}
          {activeTab === 'instalment' && <InstalmentProperties />}
        </Box>
      </Stack>
    </RealtorDashboardHeader>
  );
}

export default index