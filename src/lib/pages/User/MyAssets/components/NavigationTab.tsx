'use client';

import { Box, Flex, Text, Button, Stack, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import React, { useContext } from 'react';
import { HiPlus } from 'react-icons/hi2';
import { AppContext } from '~/lib/layout';
import { FormatAmount, formatCurrency } from '~/lib/utils/formatAmount';
import useNavigate from '~/lib/utils/useNavigate';


const NavigationTab = ({
  tabs,
  activeTab,
  setActiveTab,
  ownedAssetsCount,
  cashflowAssetsCount,
  installmentAssetsCount,
  totalOwnedValuation,
  totalCashflowValuation,
  totalInstallmentValuation,
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: (value: string) => void;
  ownedAssetsCount: number;
  cashflowAssetsCount: number;
  installmentAssetsCount: number;
  totalOwnedValuation: number;
  totalCashflowValuation: number;
  totalInstallmentValuation: number;
  }) => {
  const navigate = useNavigate()
  const {selectedCurrency} = useContext(AppContext)
  return (
    <Box py="35px" w="full">
      <Flex
        borderBottom={['none', '1px solid #E4E4E4']}
        alignItems="center"
        justifyContent="space-between"
        flexWrap={['wrap', 'nowrap']}
        gap={['24px', '0']}
        pb="2"
      >
        <Flex
          w={['full', 'auto']}
          alignItems="center"
          justifyContent={['center', 'flex-start']}
        >
          {' '}
          {tabs.map((tab, index) => (
            <Button
              bg={tab === activeTab ? '#EDEDFF' : 'none'}
              borderRadius={activeTab === tab ? '50px' : '0px'}
              color={tab === activeTab ? '#4040A0' : '#8295AA'}
              px="18px"
              py="16px"
              fontWeight={tab === activeTab ? 600 : 500}
              onClick={() => setActiveTab(tab)}
              fontSize={14}
              _hover={{ bg: 'none' }}
              key={index}
            >
              {tab} {tab === 'Owned' ? `(${ownedAssetsCount})` : ''}{' '}
              {tab === 'Cashflow' ? `(${cashflowAssetsCount})` : ''}{' '}
              {tab === 'Installment' ? `(${installmentAssetsCount})` : ''}
            </Button>
          ))}
        </Flex>
        <Box w={['full', 'auto']}>
          <Flex
            alignItems={['flex-start', 'center']}
            w="full"
            gap="20px"
            flexDir={['column-reverse', 'row']}
            borderBottom={['1px solid', 'none']}
            borderColor="#E4E4E4"
            pb={[2, 0]}
          >
            {ownedAssetsCount > 0 && (
              <Box
                borderLeft="1px solid"
                borderColor="brand.100"
                px="20px"
                py="10px"
                bg="bg.500"
                w={['100%', 'auto']}
              >
                <Stack>
                  <Text fontWeight={500} fontSize={13} color="brand.400">
                    {activeTab === 'Owned'
                      ? 'Total Owned Valuation'
                      : activeTab === 'Cashflow'
                        ? 'Total Cashflow Valuation'
                        : 'Total Installment Valuation'}
                  </Text>
                  <Heading fontWeight={600} fontSize={16} color="brand.300">
                    {activeTab === 'Owned'
                      ? FormatAmount(Number(totalOwnedValuation), selectedCurrency?.code)
                      : activeTab === 'Cashflow'
                        ? FormatAmount(Number(totalCashflowValuation), selectedCurrency?.code)
                        : FormatAmount(Number(totalInstallmentValuation), selectedCurrency?.code)}
                  </Heading>
                </Stack>
              </Box>
            )}
            {/* <Link href="/user/my-assets/add-assets"> */}
              <Button
                bg="#000080"
                fontSize={14}
                color="#ffffff"
                fontWeight={500}
                _hover={{ bg: 'brand.100' }}
                w={['full', 'auto']}
                onClick={() => navigate('/user/my-assets/add-assets')}
              >
                <Flex alignItems="center" gap="10px">
                  <Text>Add new asset</Text>
                  <HiPlus color="white" fontSize={20} fontWeight={700} />
                </Flex>
              </Button>
            {/* </Link> */}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default NavigationTab;
