'use client';

import { Box, Flex, Text, Button, Stack, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { HiPlus } from 'react-icons/hi2';
import { formatCurrency } from '~/lib/utils/formatAmount';

const NavigationTab = ({
  tabs,
  activeTab,
  setActiveTab,
  assetType,
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: (value: string) => void;
  totalAmountReceived: number;
  assetType: string;
}) => {
  return (
    <Box py="15px" w="full">
      <Flex
        borderBottom={['none', '1px solid #E4E4E4']}
        alignItems="center"
        justifyContent="space-between"
        flexWrap={['wrap', 'nowrap']}
        gap={['24px', '0']}
      >
        <Flex alignItems="center">
          {' '}
          {tabs.map((tab, index) => (
            <Button
              bg={tab === activeTab ? '#F5F5F5' : 'none'}
              borderRadius="0px"
              borderX={tab === activeTab ? '1px solid #E4E4E4' : 'none'}
              borderTop={tab === activeTab ? '1px solid #E4E4E4' : 'none'}
              color={tab === activeTab ? '#4040A0' : '#8295AA'}
              h={['45px', '55px']}
              px={[5, '7']}
              fontWeight={500}
              onClick={() => setActiveTab(tab)}
              textTransform="capitalize"
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
                  Total Installment Paid
                </Text>
                <Heading fontWeight={600} fontSize={16} color="brand.300">
                  ₦25,005,900
                </Heading>
              </Stack>
            </Box>
            <Link href="/user/my-assets/add-assets">
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
