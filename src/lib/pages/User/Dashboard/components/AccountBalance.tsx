'use client';

import {
  Box,
  Heading,
  Text,
  Stack,
  Flex,
  Button,
  Image,
  Skeleton,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { Fragment, use, useContext, useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { AppContext } from '~/lib/layout';
import { FormatAmount } from '~/lib/utils/formatAmount';
import InfoCard from './InfoCard';
import {
  DashboardAddNextOfKinIcon,
  RegisterPaymentIcon,
  AddNewAssetIcon,
} from '~/lib/components/Icons/Icons';
import useNavigate from '~/lib/utils/useNavigate';

const AccountBalance = ({
  totalInvestment,
  totalAssets,
  assetsLoading,
  currency,
  currentValuation,
}: {
  totalInvestment: number;
  totalAssets: number;
  assetsLoading: boolean;
  currency: string;
  currentValuation: number;
}) => {
  const { userDetails, isUserDetailsLoading } = useContext(AppContext);
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const walletVisibility = Cookies.get('walletVisibility');
  const navigate = useNavigate();
  return (
    <Box>
      {/* banner that shows user name and profile setup */}
      <Box w="100%" px={['20px', '40px']} pt="20px">
        <Stack spacing="25px">
          {/* complete profile setup banner goes here */}
          <Fragment>
            {isUserDetailsLoading ? (
              <Box
                w="full"
                h={['157px', '130px']}
                rounded="5px"
                border="1px solid"
                borderColor="#e4e4e7"
                py={['10px', '16px']}
                px={['15px', '20px']}
              >
                <Stack h="full" justifyContent="space-between">
                  <Skeleton rounded="2px" h="10px" w="50%" />
                  <Skeleton rounded="2px" h="15px" w="75%" />
                  <Skeleton w="150px" rounded="40px" h="42px" />
                </Stack>
              </Box>
            ) : (
              <Fragment>
                {!userDetails?.personal_check &&
                  !userDetails?.bank_check &&
                  !userDetails?.nok_check &&
                  !userDetails?.address_check && (
                    <Box
                      w="full"
                      h={['157px', '130px']}
                      rounded="5px"
                      border="1px solid"
                      borderColor="brand.900"
                      py={['10px', '16px']}
                      px={['15px', '20px']}
                      bgGradient="linear(to-r, rgba(216, 216, 255, 0.2) 30%, rgba(237, 237, 255, 0.5) 20%, rgba(255, 230, 196, 0.4) 50%)"
                    >
                      <Flex
                        alignItems={['flex-end', 'center']}
                        justifyContent="space-between"
                        w="full"
                        h="full"
                      >
                        <Stack spacing={['7px', '10px']}>
                          <Heading fontSize={14} fontWeight={700}>
                            Please complete your profile setup
                          </Heading>
                          <Text
                            fontSize={12}
                            fontWeight={500}
                            color="brand.300"
                          >
                            To get the most out of your experience here, please
                            take a moment to complete your profile.
                          </Text>
                          <Button
                            w="113px"
                            fontSize={12}
                            fontWeight={600}
                            color="brand.700"
                            bg="black"
                            rounded="50px"
                            onClick={() => navigate('/user/profile-setup')}
                            _hover={{ bg: 'black' }}
                            h={['30px', '40px']}
                          >
                            Complete Now
                          </Button>
                        </Stack>
                        <Image
                          src="/assets/images/banner-image.png"
                          objectFit="cover"
                          h={['105px', '130%']}
                          w={['100px', 'auto']}
                        />
                      </Flex>
                    </Box>
                  )}
              </Fragment>
            )}
          </Fragment>
          {/* Welcome back text */}
          <Box>
            <Stack spacing="6px">
              <Text fontSize={16} fontWeight={500} color="brand.300">
                Welcome Back
              </Text>
              {isUserDetailsLoading ? (
                <Skeleton rounded="3px" w="30%" h="25px" />
              ) : (
                <Heading fontSize={24} fontWeight={500} color="brand.300">
                  {' '}
                  {userDetails?.fullname}
                </Heading>
              )}
            </Stack>
          </Box>
          {/* info cards */}
          <Box w="full" overflow="auto">
            <Flex
              alignItems="center"
              justifyContent="space-between"
              w="full"
              overflow="auto"
              gap={['20px', '5px']}
              pb={['4', '2']}
            >
              {/* <Link href="/user/my-assets/add-assets"> */}
              <InfoCard
                icon={<AddNewAssetIcon />}
                title="Add new asset"
                description="Register newly acquired property"
                onClick={() => navigate('/user/my-assets/add-assets')}
              />
              {/* </Link> */}
              {/* <Link href="/user/portfolio"> */}
              <InfoCard
                icon={<RegisterPaymentIcon />}
                title="View Remittance"
                description="Track and update your earnings"
                onClick={() => navigate('/user/portfolio')}
              />
              {/* </Link> */}
              {/* <Link href="/user/nok/add"> */}{' '}
              <InfoCard
                icon={<DashboardAddNextOfKinIcon />}
                title="Add next of kin"
                description="Register a new next of kin"
                onClick={() => navigate('/user/nok/add')}
              />
              {/* </Link> */}
              {/* <Link href="/user/settings"> */}{' '}
              <InfoCard
                icon={<AddNewAssetIcon />}
                title="Go to settings"
                description="Update personal data and profile picture"
                onClick={() => navigate('/user/settings')}
              />
              {/* </Link> */}
            </Flex>
          </Box>
        </Stack>
      </Box>
      {/* the asset sumary and account balance goes here */}
      <Box
        w="100%"
        px={['20px', '40px']}
        py="30px"
        borderBottom="1px solid #E4E4E4"
        overflow="auto"
      >
        {assetsLoading ? (
          <Flex alignItems="ceter" gap="16px" w="100%" pb="3" overflow="auto">
            <Box
              minW={['300px', '49%']}
              borderRadius="5px"
              py="32px"
              px="30px"
              border="1px solid #E4E4E4"
              h="135px"
            >
              <Stack spacing="16px" w="100%">
                <Skeleton rounded="4px" h="20px" w="50%" />
                <Skeleton rounded="4px" h="35px" w="70%" />
              </Stack>
            </Box>
            <Box
              minW={['300px', '49%']}
              borderRadius="5px"
              py="32px"
              px="30px"
              border="1px solid #E4E4E4"
              h="135px"
            >
              <Stack spacing="16px" w="100%">
                <Skeleton rounded="4px" h="20px" w="50%" />
                <Skeleton rounded="4px" h="35px" w="70%" />
              </Stack>
            </Box>
          </Flex>
        ) : (
          <Flex alignItems="ceter" gap="16px" w="100%" pb="3" overflow="auto">
            <Box
              minW={['300px', '32%']}
              borderRadius="5px"
              py="32px"
              px="20px"
              border="1px solid #E4E4E4"
              h="135px"
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
              minW={['300px', '32%']}
              borderRadius="5px"
              py="32px"
              px="20px"
              border="1px solid #E4E4E4"
              h="135px"
            >
              <Stack spacing="16px" w="100%">
                <Text color="brand.300" fontWeight={500}>
                  Total Investments ({currency})
                </Text>
                <Flex alignItems="center" gap="16px" w="100%">
                  <Heading fontSize={24} fontWeight={500} color="#222222">
                    {FormatAmount(Number(totalInvestment || 0), currency)}
                  </Heading>
                  <FiEye color="#2E353F" fontSize={20} />
                </Flex>
              </Stack>
            </Box>
            <Box
              minW={['300px', '32%']}
              borderRadius="5px"
              py="32px"
              px="20px"
              border="1px solid #E4E4E4"
              h="135px"
            >
              <Stack spacing="16px" w="100%">
                <Text color="brand.300" fontWeight={500}>
                  Current Assets Valuation ({currency})
                </Text>
                <Flex alignItems="center" gap="16px" w="100%">
                  <Heading fontSize={24} fontWeight={500} color="#222222">
                    {FormatAmount(Number(currentValuation || 0), currency)}
                  </Heading>
                  <FiEye color="#2E353F" fontSize={20} />
                </Flex>
              </Stack>
            </Box>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default AccountBalance;
