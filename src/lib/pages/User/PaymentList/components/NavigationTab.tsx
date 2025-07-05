'use client';

import { Box, Flex, Text, Button, Stack, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { HiPlus } from 'react-icons/hi2';
import { FormatAmount, formatCurrency } from '~/lib/utils/formatAmount';

const NavigationTab = ({
  tabs,
  activeTab,
  setActiveTab,
  assetType,
  totalAmountReceived,
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: (value: string) => void;
  totalAmountReceived: number;
  assetType: string;
  }) => {
  const { id } = useParams();
  return (
    <Box py="15px" w="full">
      <Flex
        borderBottom={['none', '1px solid #E4E4E4']}
        alignItems="center"
        justifyContent="space-between"
        flexWrap={['wrap', 'nowrap']}
        gap={['24px', '0']}
      >
        <Flex alignItems="center" h="full">
          {' '}
          {tabs.map((tab, index) => (
            <Button
              bg={tab === activeTab ? '#EDEDFF' : 'none'}
              borderRadius={activeTab === tab ? '50px' : '0px'}
              key={index}
              color={tab === activeTab ? 'brand.100' : '#8295AA'}
              px="20px"
              py="16px"
              fontWeight={tab === activeTab ? 600 : 500}
              onClick={() => setActiveTab(tab)}
              textTransform="capitalize"
              fontSize={14}
              _hover={{ bg: 'none' }}
            >
              {tab}
            </Button>
          ))}
        </Flex>
        <Box>
          <Flex alignItems="center" gap="20px">
            <Box
              borderLeft="1px solid"
              borderColor="brand.100"
              px="20px"
              py="10px"
              bg="bg.500"
            >
              <Stack>
                <Text fontWeight={500} fontSize={13} color="brand.400">
                  Total {assetType === 'cashflow' ? 'Cashflow' : 'Installment'}{' '}
                  Paid
                </Text>
                <Heading fontWeight={600} fontSize={16} color="brand.300">
                  {FormatAmount(Number(totalAmountReceived) || 0)}
                </Heading>
              </Stack>
            </Box>
            <Link href={`/user/my-assets/${id}/add-payment`}>
              <Button
                bg="#000080"
                fontSize={14}
                color="#ffffff"
                fontWeight={500}
                _hover={{ bg: 'brand.100' }}
              >
                <Flex alignItems="center" gap="10px">
                  <HiPlus color="white" fontSize={20} fontWeight={700} />
                  <Text>Add new payment</Text>
                </Flex>
              </Button>
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default NavigationTab;
