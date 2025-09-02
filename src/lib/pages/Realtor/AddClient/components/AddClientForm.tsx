'use client';

import {
  Box,
  Stack,
  Heading,
  Button,
  Input,
  Select,
  Flex,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { CloseIcon, SelectedOptionIcon } from '~/lib/components/Icons/Icons';

const AddClientForm = () => {
  const [phone, setPhone] = React.useState('234');
  return (
    <Box maxW="800px" mx="auto" py="25px">
      <Stack spacing="24px">
        <Heading fontSize={24} color="brand.100">
          Add a new client
        </Heading>
        <Flex gap="24px">
          <FormControl>
            <FormLabel fontSize={16} fontWeight={600} color="brand.400">
              Client first name
            </FormLabel>
            <Input
              placeholder="Enter client first name"
              border="1px solid"
              borderColor="border.200"
              rounded="50px"
              py="14px"
              px="22px"
              bg="brand.700"
              h="50px"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize={16} fontWeight={600} color="brand.400">
              Client last name
            </FormLabel>
            <Input
              placeholder="Enter client last name"
              border="1px solid"
              borderColor="border.200"
              rounded="50px"
              py="14px"
              px="22px"
              bg="brand.700"
              h="50px"
            />
          </FormControl>
        </Flex>
        <FormControl>
          <FormLabel>Client email</FormLabel>
          <Input
            type="email"
            placeholder="Enter client email"
            border="1px solid"
            borderColor="border.200"
            rounded="50px"
            py="14px"
            px="22px"
            bg="brand.700"
            h="50px"
          />
        </FormControl>
        <Flex gap="24px">
          <FormControl>
            <FormLabel>Client gender</FormLabel>
            <Select
              placeholder="Select client gender"
              border="1px solid"
              borderColor="border.200"
              rounded="50px"
              bg="brand.700"
              h="50px"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Client phone number</FormLabel>
            <PhoneInput
              value={phone}
              // value={formik.values.phone}
              // onChange={(value: string) =>
              //   formik.setFieldValue('phone', value)
              // }
              // onBlur={() => formik.setFieldTouched('phone', true)}
              containerStyle={{
                border: '1px solid #C0C0C0',
                backgroundColor: '#FBFBFB',
                padding: '5px 14px 5px 14px',
                borderRadius: '24px',
                height: '50px',
              }}
              inputStyle={{
                border: 'none',
                paddingLeft: '50px',
                paddingTop: '5px',
                backgroundColor: '#FBFBFB',
              }}
              buttonStyle={{
                border: 'none',
                background: 'transparent',
                backgroundColor: 'transparent',
              }}
            />
          </FormControl>
        </Flex>
        <FormControl>
          <FormLabel>Client address</FormLabel>
          <Input
            type="text"
            placeholder="Enter client address"
            border="1px solid"
            borderColor="border.200"
            rounded="50px"
            py="14px"
            px="22px"
            bg="brand.700"
            h="50px"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Assign property to client</FormLabel>
          <Flex alignItems="center" gap="13px">
            <Button
              leftIcon={<SelectedOptionIcon />}
              variant="outline"
              color="brand.100"
              fontWeight={600}
              borderColor="brand.100"
              fontSize={14}
            >
              Select Existing Property
            </Button>
            <Button
              variant="outline"
              color="brand.800"
              fontWeight={600}
              borderColor="border.200"
              fontSize={14}
            >
              Add New Property
            </Button>
            <Button
              variant="outline"
              color="brand.800"
              fontWeight={600}
              borderColor="border.200"
              fontSize={14}
            >
              Not Now
            </Button>
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel>Select Property</FormLabel>
          <Select
            placeholder="Select property from your list"
            border="1px solid"
            borderColor="border.200"
            rounded="50px"
            bg="brand.700"
            h="50px"
          >
            <option value="property1">Property 1</option>
            <option value="property2">Property 2</option>
            <option value="property3">Property 3</option>
          </Select>
        </FormControl>
        <Flex alignItems="center" justifyContent="space-between">
          <Button
            variant="ghost"
            color="brand.100"
            fontWeight={600}
            fontSize={15}
            leftIcon={<CloseIcon fillColor="#000080" />}
          >
            Cancel
          </Button>
          <Button
            bg="brand.100"
            color="brand.200"
            fontWeight={600}
            borderColor="border.200"
            fontSize={15}
            w="170px"
          >
            Add Client
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default AddClientForm;
