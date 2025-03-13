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
  OutwardTransactionIcon, InwardTransactionIcon,
  ArrowUpIcon
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
                Property Type
              </Th>
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                Amount Purchased
              </Th>
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                Status
              </Th>
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                Remittance Amount
              </Th>
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                <Flex alignItems="center" gap="5px">
                  <Text> Next Due Remittance</Text>
                  <ArrowUpIcon />
                </Flex>
              </Th>
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
               
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
                    router.push('/user/portfolio/hfurr88ejhhfye')
                  }
                >
                  <Td fontSize={18} fontWeight={700} px="0">
                    <Flex alignItems="center" gap="10px">
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
                    Land
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    ₦10,003,000
                  </Td>
                  <Td fontWeight={500} fontSize={13} px="0">
                    Annual
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    ₦10,003,000
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    Tue,30 Oct 2025
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    <Button>View asset</Button>
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
  const tabs = ['Active', 'Inactive'];
  const [activeTab, setActiveTab] = React.useState('Active');
  return (
    <Box pb="50px">
      <Stack spacing="40px" w='100%' overflow='auto'>
        <Header />
        <Box px="10px">
          <PropertyListTable />
        </Box>
      </Stack>
    </Box>
  );
};

export default index;
