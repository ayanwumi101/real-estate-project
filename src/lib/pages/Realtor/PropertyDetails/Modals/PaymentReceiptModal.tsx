import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
  Stack,
  Badge,
} from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import {
  DownloadReceiptIcon,
  CloseReceiptIcon,
} from '~/lib/components/Icons/Icons';
import CustomModal from '~/lib/components/Modal';
import { FormatAmount } from '~/lib/utils/formatAmount';

const PaymentReceiptModal = ({
  isOpen,
  onClose,
  selectedPayment,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedPayment: any;
}) => {
  return (
    <CustomModal size="lg" isOpen={isOpen} onClose={onClose}>
      <Stack spacing="16px" w="full">
        <Box>
          <Flex alignItems="center" justifyContent="space-between">
            <Button
              bg="bg.200"
              color="brand.100"
              fontSize={14}
              fontWeight={600}
              leftIcon={<DownloadReceiptIcon />}
            >
              Download
            </Button>
            <Button variant="ghost" onClick={onClose}>
              <CloseReceiptIcon />
            </Button>
          </Flex>
        </Box>
        <Box>
          <Heading fontSize={16} mb="6px" fontWeight={600}>
            Samantha Evans
          </Heading>
          <Flex alignItems="center" gap="6px" fontSize={13} color="brand.800">
            <Text>+226-795-552-31</Text>{' '}
            <Box w="4px" h="4px" rounded="full" bg="#C0C0C0"></Box>{' '}
            <Text>manhhachkt08@gmail.com</Text>
          </Flex>
        </Box>
        <Box
          border="1px solid"
          borderColor="border.100"
          rounded="10px"
          p="16px"
        >
          <Flex gap="20px" mb="20px">
            <Stack w="50%">
              <Text
                fontSize={11}
                fontWeight={500}
                textTransform="uppercase"
                color="brand.800"
                letterSpacing="1px"
              >
                Asset Name
              </Text>
              <Text fontSize={15} fontWeight={500} color="brand.400">
                {selectedPayment?.property_name || 'Skyline Residences'}
              </Text>
            </Stack>
            <Stack w="50%">
              <Text
                fontSize={11}
                fontWeight={500}
                textTransform="uppercase"
                color="brand.800"
                letterSpacing="1px"
              >
                Amount Paid
              </Text>
              <Text fontSize={15} fontWeight={500} color="brand.400">
                {FormatAmount(
                  selectedPayment?.amount_paid ||
                    selectedPayment?.amount_sold ||
                    selectedPayment?.amount
                )}
              </Text>
            </Stack>
          </Flex>
          <Flex gap="20px">
            <Stack w="50%">
              <Text
                fontSize={11}
                fontWeight={500}
                textTransform="uppercase"
                color="brand.800"
                letterSpacing="1px"
              >
                Payment Status
              </Text>
              <Badge
                fontSize={12}
                textTransform="capitalize"
                bg="bg.700"
                color="color.400"
                fontWeight={500}
                rounded="50px"
                px="12px"
                py="3px"
                w="fit-content"
              >
                {selectedPayment?.payment_status || selectedPayment?.status}
              </Badge>
            </Stack>
            <Stack w="50%">
              <Text
                fontSize={11}
                fontWeight={500}
                textTransform="uppercase"
                color="brand.800"
                letterSpacing="1px"
              >
                Payment Date
              </Text>
              <Text fontSize={15} fontWeight={500} color="brand.400">
                {moment(
                  selectedPayment?.date || selectedPayment?.payment_date
                ).format('DD MMM YYYY')}
              </Text>
            </Stack>
          </Flex>
        </Box>
      </Stack>
    </CustomModal>
  );
};

export default PaymentReceiptModal;
