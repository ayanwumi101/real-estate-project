import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
  Stack,
  Badge, Divider
} from '@chakra-ui/react';
import React from 'react';
import {
  DownloadReceiptIcon,
  CloseReceiptIcon, PendingReceiptIcon, CompletedReceiptIcon
} from '~/lib/components/Icons/Icons';
import CustomModal from '~/lib/components/Modal';

const PaymentDetailsModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <CustomModal size="lg" isOpen={isOpen} onClose={onClose}>
      <Stack spacing="40px" w="full">
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
          <Stack
            spacing="8px"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Flex alignItems="center" justifyContent="center" gap="2">
              <PendingReceiptIcon />
              <Text fontSize={14} fontWeight={500} color="brand.300">
                Amount To Be Paid
              </Text>
            </Flex>
            <Heading fontSize={24} color="brand.300" fontWeight={700}>
              ₦1,000,000
            </Heading>
            <Text color="brand.800" fontWeight={500} fontSize={14}>
              30 Oct 2025 at 4.40 PM
            </Text>
          </Stack>
        </Box>
        <Box border="1px solid" borderColor="border.100" rounded="10px">
          <Heading p="16px" fontSize={18} fontWeight={700} color="brand.400">
            Payment Details
          </Heading>
          <Divider />
          <Stack spacing="12px" p="16px">
            <Flex justifyContent="space-between">
              <Text fontSize={16} fontWeight={500} color="brand.800">
                Amount Paid
              </Text>
              <Text fontSize={16} fontWeight={500} color="brand.400">
                ₦1,000,000
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontSize={16} fontWeight={500} color="brand.800">
                Asset Name
              </Text>
              <Text fontSize={16} fontWeight={500} color="brand.400">
                Skyline Residence
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontSize={16} fontWeight={500} color="brand.800">
                Payment Status
              </Text>
              <Badge fontSize={12} textTransform="capitalize" bg='bg.800' color='bg.900' fontWeight={500} rounded='50px' px='12px' py='3px'>
                Pending
              </Badge>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontSize={16} fontWeight={500} color="brand.800">
                Month
              </Text>
              <Text fontSize={16} fontWeight={500} color="brand.400">
                5th
              </Text>
            </Flex>
            <Button color='brand.100' fontSize={14} fontWeight={600} bg='bg.200'>Update payment status</Button>
          </Stack>
        </Box>
      </Stack>
    </CustomModal>
  );
};

export default PaymentDetailsModal;
