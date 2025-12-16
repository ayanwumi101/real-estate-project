import {
  Box,
  Flex,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
  Text,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import {
  VerticalEllipsisIcon,
  ViewpropertyIcon,
  ViewPaymentIcon,
  PreviousPageIcon,
  NextPageIcon,
  InputSearchIcon,
} from '~/lib/components/Icons/Icons';
import { FormatAmount } from '~/lib/utils/formatAmount';

const PaymentStats = ({
  salesPrice,
  totalAmountPaid,
  totalCommission,
  noOfSales,
  propertyType,
  outstandingBalance,
  nextDueDate,
}: {
  salesPrice?: number;
  totalAmountPaid?: number;
  totalCommission?: number;
  noOfSales?: number;
  propertyType: string;
  outstandingBalance: number;
  nextDueDate?: string | Date;
}) => {
  return (
    <Box w="full">
      {propertyType === 'instalment' ? (
        <Flex
          w="full"
          alignItems="center"
          justifyContent="space-between"
          gap="10px"
          overflow="auto"
          pb="2"
          flexWrap="wrap"
        >
          {/* first card */}
          <Box
            minW={['260px', '24%']}
            h="auto"
            rounded="5px"
            border="1px solid"
            borderColor="border.100"
          >
            <Box px="16px" py="12px">
              {' '}
              <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
                Sales Price
              </Text>
              <Heading fontSize={24} fontWeight={500}>
                {salesPrice ? FormatAmount(salesPrice) : '₦0.00'}
              </Heading>
            </Box>
          </Box>
          {/* second card */}
          <Box
            minW={['260px', '24%']}
            h="auto"
            rounded="5px"
            border="1px solid"
            borderColor="border.100"
          >
            <Box px="16px" py="12px">
              {' '}
              <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
                Total Paid
              </Text>
              <Heading fontSize={24} fontWeight={500}>
                {totalAmountPaid ? FormatAmount(totalAmountPaid) : '₦0.00'}
              </Heading>
            </Box>
          </Box>
          {/* third card */}
          <Box
            minW={['260px', '24%']}
            h="auto"
            rounded="5px"
            border="1px solid"
            borderColor="border.100"
          >
            <Box px="16px" py="12px">
              {' '}
              <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
                Outstanding
              </Text>
              <Heading fontSize={24} fontWeight={500}>
                {totalCommission ? FormatAmount(outstandingBalance) : '₦0.00'}
              </Heading>
            </Box>
          </Box>
          {/* third card */}
          <Box
            minW={['260px', '24%']}
            h="auto"
            rounded="5px"
            border="1px solid"
            borderColor="border.100"
          >
            <Box px="16px" py="12px">
              {' '}
              <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
                Commision Received
              </Text>
              <Heading fontSize={24} fontWeight={500}>
                {totalCommission ? FormatAmount(totalCommission) : '₦0.00'}
              </Heading>
            </Box>
          </Box>
          <Box
            minW={['260px', '24%']}
            h="auto"
            rounded="5px"
            border="1px solid"
            borderColor="border.100"
          >
            <Box px="16px" py="12px">
              {' '}
              <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
                Next Due Payment
              </Text>
              <Heading fontSize={24} fontWeight={500}>
                {nextDueDate
                  ? moment(nextDueDate).format('ddd, DD MMM YYYY')
                  : 'N/A'}
              </Heading>
            </Box>
          </Box>
        </Flex>
      ) : (
        <Flex
          w="full"
          alignItems="center"
          justifyContent="space-between"
          gap="10px"
          overflow="auto"
          pb="2"
        >
          {/* first card */}
          <Box
            minW={['260px', '33%']}
            h="auto"
            rounded="5px"
            border="1px solid"
            borderColor="border.100"
          >
            <Box px="16px" py="12px">
              {' '}
              <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
                Sales Price
              </Text>
              <Heading fontSize={24} fontWeight={500}>
                {salesPrice ? FormatAmount(salesPrice) : '₦0.00'}
              </Heading>
            </Box>
          </Box>
          {/* second card */}
          <Box
            minW={['260px', '33%']}
            h="auto"
            rounded="5px"
            border="1px solid"
            borderColor="border.100"
          >
            <Box px="16px" py="12px">
              {' '}
              <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
                Total Payments
              </Text>
              <Heading fontSize={24} fontWeight={500}>
                {totalAmountPaid ? FormatAmount(totalAmountPaid) : '₦0.00'}
              </Heading>
            </Box>
          </Box>
          {/* third card */}
          <Box
            minW={['260px', '33%']}
            h="auto"
            rounded="5px"
            border="1px solid"
            borderColor="border.100"
          >
            <Box px="16px" py="12px">
              {' '}
              <Text mb="16px" fontSize={16} fontWeight={500} color="brand.600">
                Commision Received
              </Text>
              <Heading fontSize={24} fontWeight={500}>
                {totalCommission ? FormatAmount(totalCommission) : '₦0.00'}
              </Heading>
            </Box>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default PaymentStats;
