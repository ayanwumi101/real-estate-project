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
  propertyName,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedPayment: any;
  propertyName?: string;
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
        <Box
          border="1px solid"
          borderColor="border.100"
          rounded="10px"
          p="16px"
        >
          <Flex gap="20px" mb="30px">
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
                {propertyName ||
                  selectedPayment?.property_name ||
                  'Skyline Residences'}
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
                bg={
                  selectedPayment?.status === 'completed' ? 'bg.700' : 'bg.800'
                }
                color={
                  selectedPayment?.status === 'completed'
                    ? 'color.400'
                    : 'bg.900'
                }
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
                {selectedPayment?.status === 'completed'
                  ? 'Payment Date'
                  : 'Payment Due Date'}
              </Text>
              <Text fontSize={15} fontWeight={500} color="brand.400">
                {selectedPayment?.status === 'completed'
                  ? moment(selectedPayment?.payment_date).format('DD MMM YYYY')
                  : moment(selectedPayment?.payment_due_date).format(
                      'DD MMM YYYY'
                    )}
              </Text>
            </Stack>
          </Flex>
        </Box>
      </Stack>
    </CustomModal>
  );
};

export default PaymentReceiptModal;
