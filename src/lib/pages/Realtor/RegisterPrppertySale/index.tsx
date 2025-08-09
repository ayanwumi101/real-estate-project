import {
  Text,
  Flex,
  Heading,
  Stack,
  Button,
  Select,
  Input,
  FormLabel,
  FormControl,
  Box,
} from '@chakra-ui/react';
import React from 'react';
import { BsChevronRight } from 'react-icons/bs';
import { CloseIcon } from '~/lib/components/Icons/Icons';
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader';

const index = () => {
  return (
    <RealtorDashboardLayout
      title={
        <Flex alignItems="center" gap="8px">
          <Text fontSize={16} fontWeight={600} color="brand.400">
            Properties
          </Text>
          <BsChevronRight size={15} fontWeight={900} />
          <Text fontSize={16} fontWeight={600} color="brand.400">
            Available Properties
          </Text>
          <BsChevronRight size={15} fontWeight={900} />
          <Text fontSize={16} fontWeight={600} color="brand.800">
            Skyline Residences
          </Text>
        </Flex>
      }
    >
      <Box maxW="700px" mx="auto">
        <Stack spacing="24px">
          <Heading fontSize={24} fontWeight={600}>
            Register Property Sale
          </Heading>
          <FormControl>
            <FormLabel fontWeight={600} fontSize={15} color="brand.400">
              Client's Name
            </FormLabel>
            <Select
              placeholder="Select from client list"
              rounded="50px"
              color="brand.800"
              outline="none"
              h="50px"
              border="1px solid"
              borderColor="border.200"
              bg="brand.700"
              mb="10px"
            >
              <option value="client1">Client 1</option>
              <option value="client2">Client 2</option>
            </Select>
            <Flex alignItems="center" gap="5px">
              <Text fontWeight={500} fontSize={14} color="brand.400">
                Can’t find the client?{' '}
                <Box as="span" color="brand.100" cursor="pointer">
                  Create client profile
                </Box>
              </Text>
            </Flex>
          </FormControl>
          <Flex alignItems="center" gap="24px">
            <FormControl>
              <FormLabel fontWeight={600} fontSize={15} color="brand.400">
                Amount Sold
              </FormLabel>
              <Input
                placeholder="Enter amount sold"
                rounded="50px"
                color="brand.800"
                outline="none"
                h="50px"
                border="1px solid"
                borderColor="border.200"
                bg="brand.700"
                mb="10px"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight={600} fontSize={15} color="brand.400">
                Commission Received
              </FormLabel>
              <Input
                placeholder="Enter commission received"
                rounded="50px"
                color="brand.800"
                outline="none"
                h="50px"
                border="1px solid"
                borderColor="border.200"
                bg="brand.700"
                mb="10px"
              />
            </FormControl>
          </Flex>
          <FormControl>
            <FormLabel fontWeight={600} fontSize={15} color="brand.400">
              Duration of Payment
            </FormLabel>
            <Input
              placeholder="Enter commission received"
              rounded="50px"
              color="brand.800"
              outline="none"
              h="50px"
              border="1px solid"
              borderColor="border.200"
              bg="brand.700"
              mb="10px"
            />
          </FormControl>
          <Flex alignItems="center" gap="24px">
            <FormControl>
              <FormLabel fontWeight={600} fontSize={15} color="brand.400">
                First payment date
              </FormLabel>
              <Input
                placeholder="Enter amount sold"
                rounded="50px"
                color="brand.800"
                outline="none"
                h="50px"
                border="1px solid"
                borderColor="border.200"
                bg="brand.700"
                mb="10px"
                type="date"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight={600} fontSize={15} color="brand.400">
                Next payment date
              </FormLabel>
              <Input
                placeholder="Enter commission received"
                rounded="50px"
                color="brand.800"
                outline="none"
                h="50px"
                border="1px solid"
                borderColor="border.200"
                bg="brand.700"
                mb="10px"
                type="date"
              />
            </FormControl>
          </Flex>
          <FormControl>
            <FormLabel fontWeight={600} fontSize={15} color="brand.400">
              Date Sold
            </FormLabel>
            <Input
              placeholder="dd/mm/yyyy"
              rounded="50px"
              color="brand.800"
              outline="none"
              h="50px"
              border="1px solid"
              borderColor="border.200"
              bg="brand.700"
              mb="10px"
              type="date"
            />
          </FormControl>
          <FormControl mb='10px'>
            <FormLabel fontWeight={600} fontSize={15} color="brand.400">
              Payment Plan
            </FormLabel>
            <Select
              placeholder="Select payment plan"
              rounded="50px"
              color="brand.800"
              outline="none"
              h="50px"
              border="1px solid"
              borderColor="border.200"
              bg="brand.700"
            >
              <option value="client1">Monthly</option>
              <option value="client2">Weekly</option>
              <option value="client3">Quarterly</option>
            </Select>
          </FormControl>
          <Flex alignItems="center" justifyContent="space-between">
            <Button
              variant="ghost"
              color="brand.100"
              fontWeight={500}
              leftIcon={<CloseIcon />}
            >
              Cancel
            </Button>
            <Button
              px="40px"
              fontWeight={500}
              fontSize={15}
              color="brand.200"
              bg="brand.100"
            >
              Save payment
            </Button>
          </Flex>
        </Stack>
      </Box>
    </RealtorDashboardLayout>
  );
};

export default index;
