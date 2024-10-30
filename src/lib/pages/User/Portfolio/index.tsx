'use client';

import React from 'react';
import Header from './components/Header';
import {
  Box,
  Stack,
  Flex,
  TableContainer,
  Table,
  Td,
  Th,
  Thead,
  Tr,
  Tbody,
  Image,
  Heading,
  Text,
  Button,
} from '@chakra-ui/react';
import NavigationTab from './components/NavigationTab';
import {
  LocationIcon,
  ProfitIcon,
  LossIcon,
  ArrowForward,
  OutwardTransactionIcon, InwardTransactionIcon
} from '~/lib/components/Icons/Icons';
import { IoMdArrowForward } from 'react-icons/io';
import Link from 'next/link';
import { useRouter } from 'next/navigation';





const TransactionListItem = () => {
  return (
    <Box>
      <Flex alignItems="flex-start" justifyContent="space-between">
        <Box
          w="48px"
          h="48px"
          bg="#F5F5F5"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="5px"
        >
          <OutwardTransactionIcon />
        </Box>
        <Box w='125px'>
          <Stack spacing="6px">
            <Text fontWeight={500} fontSize={14} color="#222222">
              Skyline Residences Remittance
            </Text>
            <Text color="#2E353F" fontSize={12}>
              Aug 30,2024
            </Text>
          </Stack>
        </Box>
        <Text fontWeight={500} fontSize={14} color="#4040A0">
          -₦ 50,000
        </Text>
      </Flex>
    </Box>
  );
};


const TransactionsList = () => {
  return (
    <Box>
      <Stack spacing="16px">
        <Heading fontSize={15} fontWeight={700}>
          Transactions
        </Heading>
        <Box>
          <Stack spacing="16px">
            <TransactionListItem />
            <TransactionListItem />
            <TransactionListItem />
            <TransactionListItem />
            <TransactionListItem />
          </Stack>
        </Box>
        <Button
          bg="#EDEDFF"
          w="100px"
          fontSize={14}
          color="#000080"
          fontWeight={500}
        >
          <Flex alignItems="center" gap="10px">
            <Text>See All</Text>
            <IoMdArrowForward />
          </Flex>
        </Button>
      </Stack>
    </Box>
  );
};

const PropertyListTable = () => {
  const router = useRouter();
  return (
    <Box>
      <TableContainer>
        <Table border="none" variant="unstyled">
          <Thead color="#222222" bg="#F5F5F5" py="22px" h="53px" border="none">
            <Tr border="none">
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                Property
              </Th>
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                Holding
              </Th>
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                Current Value
              </Th>
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                Profit/Loss
              </Th>
            </Tr>
          </Thead>
          <Tbody color="#222222">
            {[1, 2, 3, 4].map(() => {
              return (
                <Tr
                  // as="a"
                  // passHref="/user/portfolio/property-details"
                  border="none"
                  _hover={{ bg: '#f5f5f5' }}
                  px="0"
                  cursor="pointer"
                  onClick={() =>
                    router.push('/user/portfolio/property-details')
                  }
                >
                  <Td fontSize={18} fontWeight={700} px="0">
                    <Flex alignItems="center" gap="10px">
                      <Image
                        src="/assets/images/house-1.png"
                        w="50px"
                        h="50px"
                        objectFit="cover"
                      />
                      <Stack spacing="3px">
                        <Heading color="#2E353F" fontWeight={500} fontSize={16}>
                          Harborview Towers
                        </Heading>
                        <Flex alignItems="center" gap="3px">
                          <LocationIcon />
                          <Text color="#2E353F" fontWeight={400} fontSize={12}>
                            Lekki Phase 1, Lagos
                          </Text>
                        </Flex>
                      </Stack>
                    </Flex>
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    10 shares
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    ₦10,003,000
                  </Td>
                  <Td fontWeight={500} fontSize={13} px="0">
                    <Flex alignItems="center" gap="10px">
                      <Flex alignItems="center" gap="3px">
                        <ProfitIcon />
                        <Text color="#1BD155"> ₦3000 (+2.01%)</Text>
                      </Flex>
                      <Text
                        bg="#EDEDFF"
                        color="#000080"
                        fontSize={12}
                        py="3px"
                        px="12px"
                        textAlign="center"
                        borderRadius="50px"
                      >
                        Trade
                      </Text>
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const index = () => {
  const tabs = ['Active', 'Liquidated'];
  const [activeTab, setActiveTab] = React.useState('Active');
  return (
    <Box pb='50px'>
      <Stack spacing="40px">
        <Header />
        <Box px="40px">
          <Flex gap="30px">
            <Box w="70%">
              <Stack spacing="30px">
                <NavigationTab
                  tabs={tabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <PropertyListTable />
              </Stack>
            </Box>
            <Box w="30%">
              <TransactionsList />
            </Box>
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
};

export default index;
