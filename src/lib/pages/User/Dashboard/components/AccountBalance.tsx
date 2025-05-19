'use client';

import { Box, Heading, Text, Stack, Flex, Button } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { Fragment, useContext, useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { HiOutlineEye } from 'react-icons/hi2';
import { PortfolioStatCard } from '~/lib/components/Cards';
import { DashboardCautionIcon } from '~/lib/components/Icons/Icons';
import { AppContext } from '~/lib/layout';
import { FormatAmount } from '~/lib/utils/formatAmount';



const AccountBalance = ({ totalInvestment, totalAssets }: { totalInvestment: number, totalAssets: number }) => {
  const { userDetails } = useContext(AppContext);
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const walletVisibility = Cookies.get('walletVisibility');

  return (
    <Box>
      {/* banner that shows user name and profile setup */}
      <Box w="100%" px={['20px', '40px']} pt="20px">
        <Box
          w="100%"
          borderRadius="5px"
          py="20px"
          px={['16px', '25px']}
          bgGradient="linear(to-r, #D8D8FF, #EDEDFF, #FFE6C4)"
        >
          <Stack spacing="20px">
            {' '}
            <Stack spacing="5px">
              <Text fontSize={14} fontWeight={500} color="brand.300">
                Welcome back.
              </Text>
              <Heading fontSize={24} fontWeight={500} color="brand.300">
                {userDetails?.fullname}
              </Heading>
            </Stack>
            {!userDetails?.personal_check &&
              !userDetails?.bank_check &&
              !userDetails?.nok_check &&
              !userDetails?.address_check && (
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  flexWrap="wrap"
                  bg="brand.700"
                  py="16px"
                  px={['16px', '20px']}
                  borderRadius="5px"
                >
                  <Box mb={['16px', '0']}>
                    <Flex alignItems="flex-start" gap="21px">
                      <DashboardCautionIcon />
                      <Stack spacing="6px" color="#000000">
                        <Heading fontWeight={700} fontSize={15}>
                          Please complete Profile Setup
                        </Heading>
                        <Text fontSize={13} fontWeight={500}>
                          To get the most out of your experience here, please
                          take a moment to complete your profile.
                        </Text>
                      </Stack>
                    </Flex>
                  </Box>
                  <Link href="/user/profile-setup">
                    <Button
                      borderRadius="50px"
                      bg="#222222"
                      color="#ffffff"
                      py="6px"
                      px="16px"
                      fontSize={13}
                      fontWeight={600}
                    >
                      Complete Now
                    </Button>
                  </Link>
                </Flex>
              )}
          </Stack>
        </Box>
      </Box>
      {/* the asset sumary and account balance goes here */}
      <Box
        w="100%"
        px={['20px', '40px']}
        py="30px"
        borderBottom="1px solid #E4E4E4"
        overflow="auto"
       
      >
        <Flex alignItems="ceter" gap="16px" w="100%" pb='3' overflow="auto">
          <Box
            minW={['300px', '49%']}
            borderRadius="5px"
            py="32px"
            px="20px"
            border="1px solid #E4E4E4"
            boxShadow="md"
            h="140px"
          >
            <Stack spacing="16px" w="100%">
              <Text color="brand.300" fontWeight={500}>
                Total Asset Registered
              </Text>
              <Flex alignItems="center" gap="16px" w="100%">
                <Heading fontSize={24} fontWeight={500} color="#222222">
                  {totalAssets || 0}
                </Heading>
              </Flex>
            </Stack>
          </Box>
          <Box
            minW={['300px', '49%']}
            borderRadius="5px"
            py="32px"
            px="20px"
            border="1px solid #E4E4E4"
            boxShadow="md"
            h="140px"
          >
            <Stack spacing="16px" w="100%">
              <Text color="brand.300" fontWeight={500}>
                Total Assets Valuation (Naira)
              </Text>
              <Flex alignItems="center" gap="16px" w="100%">
                <Heading fontSize={24} fontWeight={500} color="#222222">
                  {FormatAmount(Number(totalInvestment) || 0)}
                </Heading>
                <FiEye color="#2E353F" fontSize={20} />
              </Flex>
            </Stack>
          </Box>
          {/* <PortfolioStatCard
            label="Total Asset Registered"
            balance={totalAssets || 0}
            showHideIcon={false}
          />
          <PortfolioStatCard
            label="Total Assets Valuation (Naira)"
            balance={FormatAmount(Number(totalInvestment) || 0)}
            showHideIcon={true}
          /> */}
        </Flex>
        {/* <Box
          borderRadius="5px"
          bgGradient="linear(to-r,#D8D8FF, #D8D8FF4D, #FFEFD9)"
          py={['24px', '32px']}
          px={['16px', '24px']}
          w="100%"
        >
          <Stack spacing="16px">
            <Heading fontSize={16} fontWeight={500} color="#222222">
              Total Investments
            </Heading>
            <Box>
              <Flex
                alignItems={walletVisibility === 'true' ? 'center' : 'flex-end'}
                gap="10px"
              >
                <Heading fontSize={24} fontWeight={500} color="#222222">
                  {walletVisibility === 'true'
                    ? `${FormatAmount(totalInvestment) || 0.0}`
                    : '********'}
                </Heading>
                <Button
                  bg="none"
                  p="0"
                  _hover={{ bg: 'none', p: 0 }}
                  onClick={() => {
                    const newVisibility = !showBalance;
                    setShowBalance(newVisibility);
                    Cookies.set('walletVisibility', newVisibility.toString());
                  }}
                >
                  <HiOutlineEye color="black" fontSize={22} />
                </Button>
              </Flex>
            </Box>
          </Stack>
        </Box> */}
      </Box>
    </Box>
  );
};

export default AccountBalance;
