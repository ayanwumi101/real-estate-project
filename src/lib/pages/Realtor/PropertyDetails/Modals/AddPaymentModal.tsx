import {
  Heading,
  Text,
  Button,
  Input,
  InputLeftElement,
  InputGroup,
  Select,
  Stack,
  FormLabel,
  FormControl,
  Box,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import { CalendarIcon } from '~/lib/components/Icons/Icons';
import CustomModal from '~/lib/components/Modal';

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPaymentModal = ({ isOpen, onClose }: AddPaymentModalProps) => {
  return (
    <CustomModal size="xl" isOpen={isOpen} onClose={onClose}>
      <Stack spacing="24px">
        <Heading fontSize={20} fontWeight={600}>
          Add Instalment Payment
        </Heading>
        <Box>
          <Flex alignItems="center" gap="32px">
            <Stack spacing="6px">
              <Heading fontSize={16} fontWeight={600} color="brand.600">
                Paid Instalment
              </Heading>
              <Text fontSize={16} fontWeight={500} color="brand.400">
                ₦5,000,000
              </Text>
            </Stack>
            <Stack spacing="6px">
              <Heading fontSize={16} fontWeight={600} color="brand.600">
                Months Paid
              </Heading>
              <Text>7</Text>
            </Stack>
          </Flex>
        </Box>
        <Box>
          <Stack spacing="20px">
            <FormControl>
              <FormLabel fontSize={16} fontWeight={600} color="brand.300">
                Payment Status
              </FormLabel>
              <Select
                placeholder="Select payment status"
                rounded="50px"
                color="brand.800"
                outline="none"
                h="50px"
                border="1px solid"
                borderColor="border.200"
                _focus={{ border: 'none', outline: 'none' }}
              >
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={16} fontWeight={600} color="brand.300">
                Instalment Due Date
              </FormLabel>
              <Input
                type="date"
                placeholder="dd/mm/yyyy"
                rounded="50px"
                color="brand.800"
                outline="none"
                h="50px"
                border="1px solid"
                borderColor="border.200"
                _focus={{ border: 'none', outline: 'none' }}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={16} fontWeight={600} color="brand.300">
                Payment Date
              </FormLabel>
              <Input
                type="date"
                placeholder="dd/mm/yyyy"
                rounded="50px"
                color="brand.800"
                outline="none"
                h="50px"
                border="1px solid"
                borderColor="border.200"
                _focus={{ border: 'none', outline: 'none' }}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={16} fontWeight={600} color="brand.300">
                Instalment Amount
              </FormLabel>
              <Input
                type="text"
                placeholder="Enter instalment amount received"
                rounded="50px"
                color="brand.800"
                outline="none"
                h="50px"
                border="1px solid"
                borderColor="border.200"
                _focus={{ border: 'none', outline: 'none' }}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={16} fontWeight={600} color="brand.300">
                Commission
              </FormLabel>
              <Input
                type="text"
                placeholder="Enter commission received"
                rounded="50px"
                color="brand.800"
                outline="none"
                h="50px"
                border="1px solid"
                borderColor="border.200"
                _focus={{ border: 'none', outline: 'none' }}
              />
            </FormControl>
          </Stack>
        </Box>
        <Box>
          <Flex alignItems="center" gap="16px" justifyContent="flex-end">
            <Button
              bg="brand.500"
              color="brand.100"
              fontWeight={500}
                          onClick={onClose}
                          fontSize={15}
                          px='30px'
            >
              Cancel
            </Button>
            <Button bg="brand.100" fontWeight={500} color="brand.200" px="40px">
              Save
            </Button>
          </Flex>
        </Box>
      </Stack>
    </CustomModal>
  );
};

export default AddPaymentModal;
