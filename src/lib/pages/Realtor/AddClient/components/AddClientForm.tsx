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
  FormErrorMessage,
  border,
  Spinner,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { CloseIcon, SelectedOptionIcon } from '~/lib/components/Icons/Icons';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import Multiselect from 'multiselect-react-dropdown';
import Link from 'next/link';

interface AddClientValues {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  address: string;
  propertyIds: string[];
}

const AddClientForm = ({
  addClient,
  properties,
  loading,
}: {
  properties: any[];
  addClient: (value: any) => Promise<void>;
  loading?: boolean;
}) => {
  const options = [
    { title: 'Select Existing Property', value: 'existing' },
    { title: 'Add New property', value: 'new' },
    { title: 'Not Now', value: 'none' },
  ];
  const [assignOptions, setAssignOptions] = useState<
    'existing' | 'new' | 'none'
  >('existing');

  const initialValues: AddClientValues = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    phone: '234',
    address: '',
    propertyIds: [],
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    gender: Yup.string().required('Gender is required'),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    propertyIds: Yup.array(),
  });

  const handleSubmit = async (values: any) => {
    await addClient(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ errors, touched, values, setFieldValue, setFieldTouched }) => {
        return (
          <Form>
            <Box maxW="800px" mx="auto" px={['16px', 0]} py="25px">
              <Stack spacing="24px">
                <Heading fontSize={[20, 24]} color="brand.100">
                  Add a new client
                </Heading>
                <Flex gap="24px" flexWrap={['wrap', 'nowrap']}>
                  <FormControl
                    isInvalid={!!errors.firstName && touched.firstName}
                  >
                    <FormLabel fontSize={16} fontWeight={600} color="brand.400">
                      Client first name
                    </FormLabel>
                    <Field
                      as={Input}
                      placeholder="Enter client first name"
                      border="1px solid"
                      borderColor="border.200"
                      rounded="50px"
                      py="14px"
                      px="22px"
                      bg="brand.700"
                      h="50px"
                      name="firstName"
                    />
                    <FormErrorMessage>
                      {errors.firstName &&
                        touched.firstName &&
                        errors.firstName}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.lastName && touched.lastName}
                  >
                    <FormLabel fontSize={16} fontWeight={600} color="brand.400">
                      Client last name
                    </FormLabel>
                    <Field
                      as={Input}
                      placeholder="Enter client last name"
                      border="1px solid"
                      borderColor="border.200"
                      rounded="50px"
                      py="14px"
                      px="22px"
                      bg="brand.700"
                      h="50px"
                      name="lastName"
                    />
                    <FormErrorMessage>
                      {errors.lastName && touched.lastName && errors.lastName}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <FormLabel>Client email</FormLabel>
                  <Field
                    as={Input}
                    type="email"
                    placeholder="Enter client email"
                    border="1px solid"
                    borderColor="border.200"
                    rounded="50px"
                    py="14px"
                    px="22px"
                    bg="brand.700"
                    h="50px"
                    name="email"
                  />
                  <FormErrorMessage>
                    {errors.email && touched.email && errors.email}
                  </FormErrorMessage>
                </FormControl>
                <Flex gap="24px" flexWrap={['wrap', 'nowrap']}>
                  <FormControl isInvalid={!!errors.gender && touched.gender}>
                    <FormLabel>Client gender</FormLabel>
                    <Field
                      as={Select}
                      placeholder="Select client gender"
                      border="1px solid"
                      borderColor="border.200"
                      rounded="50px"
                      bg="brand.700"
                      h="50px"
                      name="gender"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Field>
                    <FormErrorMessage>
                      {errors.gender && touched.gender && errors.gender}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Client phone number</FormLabel>
                    <PhoneInput
                      value={values.phone}
                      onChange={(value: string) =>
                        setFieldValue('phone', value)
                      }
                      onBlur={() => setFieldTouched('phone', true)}
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
                <FormControl isInvalid={!!errors.address && touched.address}>
                  <FormLabel>Client address</FormLabel>
                  <Field
                    as={Input}
                    type="text"
                    placeholder="Enter client address"
                    border="1px solid"
                    borderColor="border.200"
                    rounded="50px"
                    py="14px"
                    px="22px"
                    bg="brand.700"
                    h="50px"
                    name="address"
                  />
                  <FormErrorMessage>
                    {errors.address && touched.address && errors.address}
                  </FormErrorMessage>
                </FormControl>
                {/* <FormControl w="full" overflow="auto">
                  <FormLabel>Assign property to client</FormLabel>
                  <Flex
                    w="full"
                    alignItems="center"
                    gap={['7px', '13px']}
                    overflow="auto"
                    flexWrap={['wrap', 'nowrap']}
                  >
                    {options?.map((option) => (
                      <Button
                        leftIcon={
                          option?.value === assignOptions ? (
                            <SelectedOptionIcon />
                          ) : undefined
                        }
                        variant="outline"
                        color={
                          option.value === assignOptions
                            ? 'brand.100'
                            : 'brand.800'
                        }
                        fontWeight={600}
                        borderColor={
                          option?.value === assignOptions
                            ? 'brand.100'
                            : 'border.200'
                        }
                        fontSize={14}
                        // w={["270px", "auto"]}
                        onClick={() =>
                          setAssignOptions(
                            option.value as 'existing' | 'none' | 'new'
                          )
                        }
                      >
                        {option.title}
                      </Button>
                    ))}
                  </Flex>
                </FormControl> */}
                {/* {assignOptions === 'existing' && ( */}
                <FormControl
                  isInvalid={!!errors.propertyIds && !!touched.propertyIds}
                >
                  <FormLabel>Select Property</FormLabel>
                  <Multiselect
                    placeholder="Select property from your list"
                    options={properties?.map((property) => ({
                      name: property.property_name,
                      id: property.id,
                    }))}
                    selectedValues={properties
                      ?.filter((property: any) =>
                        values.propertyIds.includes(property.id)
                      )
                      .map((property: any) => ({
                        name: property.property_name,
                        id: property.id,
                      }))}
                    onSelect={(selectedList) => {
                      const ids = selectedList.map((item: any) => item.id);
                      setFieldValue('propertyIds', ids);
                    }}
                    onRemove={(selectedList) => {
                      const ids = selectedList.map((item: any) => item.id);
                      setFieldValue('propertyIds', ids);
                    }}
                    displayValue="name"
                    style={{
                      multiselectContainer: {
                        border: '1px solid #C0C0C0',
                        borderRadius: '50px',
                        padding: '5px 14px',
                        backgroundColor: '#FBFBFB',
                        height: '50px',
                      },
                      searchBox: {
                        border: 'none',
                        width: '100%',
                      },
                    }}
                  />
                  <FormErrorMessage>
                    {errors.propertyIds &&
                      touched.propertyIds &&
                      errors.propertyIds}
                  </FormErrorMessage>
                </FormControl>
                {/* )} */}
                <Flex alignItems="center" justifyContent="space-between">
                  <Link href="/realtor/clients">
                    <Button
                      variant="ghost"
                      color="brand.100"
                      fontWeight={600}
                      fontSize={15}
                      leftIcon={<CloseIcon fillColor="#000080" />}
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    bg="brand.100"
                    color="brand.200"
                    fontWeight={600}
                    borderColor="border.200"
                    fontSize={15}
                    w="170px"
                    type="submit"
                  >
                    {loading ? <Spinner /> : 'Add Client'}
                  </Button>
                </Flex>
              </Stack>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddClientForm;
