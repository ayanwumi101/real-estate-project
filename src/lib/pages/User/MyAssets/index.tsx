'use client'

import { Box, Stack, Flex, Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import AssetsStatistics from './components/AssetsStatistics'
import NavigationTab from './components/NavigationTab'
import { HiPlus } from 'react-icons/hi2'
import OwnedAssets from './components/OwnedAssets'
import Cashflow from './components/Cashflow'
import Installment from './components/Installment'
import Link from 'next/link'



const index = () => {
  const [activeTab, setActiveTab] = useState<string>('Owned')
  return (
    <Box pb="40px">
      <Stack>
        <AssetsStatistics />
        <Box pr="40px">
          <Flex justifyContent="space-between" alignItems="center">
            <NavigationTab
              tabs={['Owned', 'Cashflow', 'Installment']}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <Link href='/user/my-assets/add-assets'>
              <Button
                bg="#000080"
                fontSize={14}
                color="#ffffff"
                fontWeight={500}
                // onClick={() => setShowFundWalletModal(true)}
              >
                <Flex alignItems="center" gap="10px">
                  <Text>Add new asset</Text>
                  <HiPlus color="white" fontSize={20} fontWeight={700} />
                </Flex>
              </Button>
            </Link>
          </Flex>
        </Box>
        <Box px="40px">
          {activeTab === 'Owned' && <OwnedAssets />}
          {activeTab === 'Installment' && <Installment />}
          {activeTab === 'Cashflow' && <Cashflow />}
        </Box>
      </Stack>
    </Box>
  );
}

export default index