'use client';

import { Box, Heading, Text, Stack, Flex, Button } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { Fragment, useContext, useState } from 'react';
import { HiOutlineEye } from 'react-icons/hi2';
import { AppContext } from '~/lib/layout';

const AccountBalance = () => {
  const { userDetails } = useContext(AppContext);
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const walletVisibility = Cookies.get('walletVisibility');
  return (
    <Box>
      <Fragment>
        {!userDetails?.personal_check &&
          !userDetails?.bank_check &&
          !userDetails?.nok_check &&
          (!userDetails?.address_check && (
            <Box
              w="100%"
              px={['20px', '40px']}
              pb="30px"
              borderBottom="1px solid #E4E4E4"
            >
              <Box
                w="100%"
                borderRadius="5px"
                py="16px"
                px={['16px', '48px']}
                bgGradient="linear(to-r, #D8D8FF4D, #EDEDFF4D, #FFE6C44D)"
              >
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  flexWrap="wrap"
                >
                  <Box mb={['16px', '0']}>
                    <Stack spacing="6px" color="#000000">
                      <Heading fontWeight={700} fontSize={15}>
                        Complete Profile Setup
                      </Heading>
                      <Text fontSize={13} fontWeight={500}>
                        To get the most out of your experience here, please take
                        a moment to complete your profile.
                      </Text>
                    </Stack>
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
              </Box>
            </Box>
          ))}
      </Fragment>
      <Box
        w="100%"
        px={['20px', '40px']}
        py="30px"
        borderBottom="1px solid #E4E4E4"
      >
        <Box
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
                    ? `₦ ${userDetails?.wallet_balance ? userDetails?.wallet_balance : 0.0}`
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
        </Box>
      </Box>
    </Box>
  );
};

export default AccountBalance;
