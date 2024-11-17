'use client';

import React from 'react';
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  Flex,
  Stack,
  TableContainer,
  Table,
  Td,
  Th,
  Thead,
  Tr,
  Tbody,
} from '@chakra-ui/react';
import {
  LocationIcon,
  InvestIcon,
  OutwardTransactionIcon,
  ProfitIcon,
} from '~/lib/components/Icons/Icons';
import { HiPlus } from 'react-icons/hi2';
import { SingleApartmentCard, StatCard } from '~/lib/components/Cards';
import PurchasePropertyFlow from '../../propertyDetails/components/PurchasePropertyFlow';
import { IoMdArrowForward } from 'react-icons/io';
import { useRouter } from 'next/navigation';

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
                Asset
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
            {[1, 2, 3].map(() => {
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
                  <Td fontSize={15} color="#222222" fontWeight={600} px="0">
                    Mini Flat – ₦15M (150,000/share)
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
        <Box w="160px">
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

const SingleDetail = ({
  label,
  description,
}: {
  label: string;
  description: string;
}) => {
  return (
    <Box>
      <Stack spacing="6px">
        <Text color="#ABABFF" fontSize={16} fontWeight={600}>
          {label}
        </Text>
        <Text color="#222222" fontSize={16} fontWeight={500}>
          {description}
        </Text>
      </Stack>
    </Box>
  );
};

const OtherDetails = () => {
  return (
    <Box w="38%">
      <Stack spacing="30px">
        <SingleDetail
          label="Security Details:"
          description="First mortgage on the property."
        />
        <SingleDetail label="Payout Type:" description="Quarterly Dividends" />
        <SingleDetail
          label="Repayment Plan:"
          description="Equity-based, with expected capital appreciation upon sale or refinance."
        />
        <SingleDetail
          label="Investment Type:"
          description=" Fractional Ownership"
        />
        <Box bg="#EDEDFF" pt="12px" pb="10px" px="10px" borderRadius="50px">
          <Flex gap="2px" alignItems="flex-start">
            {/* <CautionIcon /> */}
            <Image
              src="/assets/images/info.png"
              w="28px"
              h="28px"
              objectFit="cover"
            />
            <Text mt="1" color="#000080" fontWeight={600} fontSize={13}>
              Shares will be liquidated into portfolio balance
            </Text>
          </Flex>
        </Box>
        <TransactionsList />
      </Stack>
    </Box>
  );
};

const MainDetails = ({
  openPurchaseModal,
  setOpenPurchaseModal,
}: {
  openPurchaseModal: boolean;
  setOpenPurchaseModal: (value: boolean) => void;
}) => {
  return (
    <Box w="62%">
      <Stack spacing="30px">
        <PropertyListTable />
        <Box py="30px" borderY="1px solid #E4E4E4">
          <Text color="#222222" fontSize={17} fontWeight={500}>
            A modern high-rise located in the heart of Victoria Island, Lagos,
            offering luxurious amenities and stunning city views. Ideal for
            urban professionals.
          </Text>
        </Box>
        <Box>
          <Flex alignItems="center" justifyContent="space-between">
            <Image
              src="/assets/images/house-1.png"
              w="190px"
              h="160px"
              objectFit="cover"
            />
            <Image
              src="/assets/images/house-1.png"
              w="190px"
              h="160px"
              objectFit="cover"
            />
            <Image
              src="/assets/images/house-1.png"
              w="190px"
              h="160px"
              objectFit="cover"
            />
          </Flex>
        </Box>
        <Box>
          <Stack>
            <Box mb="16px">
              <Text fontWeight={600} color="#ABABFF" mb="10px">
                Units
              </Text>
              <Text color="#222222" fontWeight={500}>
                Contains 4 units
              </Text>
            </Box>
            <SingleApartmentCard
              title="Mini Flat – ₦15M (150,000M/share)"
              description="1 sitting room, 1 bedroom, one toilet and bathroom, kitchen"
              buyProperty={() => setOpenPurchaseModal(true)}
            />
            <SingleApartmentCard
              title="Mini Flat – ₦15M (150,000M/share)"
              description="1 sitting room, 1 bedroom, one toilet and bathroom, kitchen"
              buyProperty={() => setOpenPurchaseModal(true)}
            />
            <SingleApartmentCard
              title="Mini Flat – ₦15M (150,000M/share)"
              description="1 sitting room, 1 bedroom, one toilet and bathroom, kitchen"
              buyProperty={() => setOpenPurchaseModal(true)}
            />
            <SingleApartmentCard
              title="Mini Flat – ₦15M (150,000M/share)"
              description="1 sitting room, 1 bedroom, one toilet and bathroom, kitchen"
              buyProperty={() => setOpenPurchaseModal(true)}
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

const PropertyDetailsContainer = () => {
  const [openPurchaseModal, setOpenPurchaseModal] = React.useState(false);
  return (
    <Box py="30px" px="40px" borderBottom="1px solid #E4E4E4">
      <Flex gap="40px">
        <MainDetails
          openPurchaseModal={openPurchaseModal}
          setOpenPurchaseModal={setOpenPurchaseModal}
        />
        <OtherDetails />
      </Flex>
      <PurchasePropertyFlow
        isOpen={openPurchaseModal}
        onClose={() => setOpenPurchaseModal(false)}
      />
    </Box>
  );
};

const Header = () => {
  return (
    <Box py="30px" px="40px" borderY="1px solid #E4E4E4">
      <Flex alignItems="flex-start" justifyContent="space-between">
        <Box>
          <Flex alignItems="flex-start" gap="10px">
            <Image
              src="/assets/images/house-1.png"
              w="90px"
              h="80px"
              objectFit="cover"
            />
            <Stack spacing="10px">
              <Heading fontSize={24} fontWeight={500} color="#222222">
                Skyline Residences
              </Heading>
              <Flex alignItems="center" gap="10px">
                <LocationIcon />
                <Text color="#2E353F" fontWeight={500}>
                  Victoria Island, Lagos
                </Text>
              </Flex>
            </Stack>
          </Flex>
        </Box>
        <Box>
          <Flex alignItems="center" gap="12px">
            <Button
              bg="#EDEDFF"
              color="#4040A0"
              fontWeight={600}
              fontSize={14}
              borderRadius="50px"
            >
              Sell shares
            </Button>
            <Button bg="#000080" fontSize={14} color="#ffffff" fontWeight={500}>
              <Flex alignItems="center" gap="10px">
                <Text>Buy more shares</Text>
                <HiPlus color="white" fontSize={20} fontWeight={700} />
              </Flex>
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

const PropertyDetails = () => {
  return (
    <Box>
      <Header />
      <Box py="40px" px="40px" overflow="auto" borderBottom="1px solid #E4E4E4">
        <Flex alignItems="center" gap="16px">
          <StatCard />
          <StatCard />
          <StatCard />
          <StatCard />
        </Flex>
      </Box>
      <PropertyDetailsContainer />
    </Box>
  );
};

export default PropertyDetails;
