'use client';

import {
  Box,
  Heading,
  Text,
  Stack,
  Flex,
  Input,
  Select,
  FormErrorMessage,
  FormControl,
  Button,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';
import SuccessModal from './Modals/SuccessModal';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

const index = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    serviceType: '',
    deliveryMethod: '',
    contactFirstName: '',
    contactLastName: '',
    contactNumber: '',
    propertyAddress: '',
    propertyDescription: '',
    additionalNotes: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email address is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    serviceType: Yup.string().required('Service type is required'),
    deliveryMethod: Yup.string().required('Delivery method is required'),
    contactFirstName: Yup.string().required(
      'Contact person first name is required'
    ),
    contactLastName: Yup.string().required(
      'Contact person last name is required'
    ),
    contactNumber: Yup.string().required('Contact person number is required'),
    propertyAddress: Yup.string().required('Property address is required'),
    propertyDescription: Yup.string().required(
      'Property description is required'
    ),
    additionalNotes: Yup.string(),
  });

  const handleSubmit = async () => {};
  return (
    <Box
      maxW={['95%',"800px"]}
      mx="auto"
      border="1px solid"
      borderColor="border.100"
      rounded="40px"
      p="20px"
      bg="rgba(245, 245, 245, 0.7)"
      my={['60px',"100px"]}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, values, setFieldTouched }) => {
          return (
            <Form>
              <Stack spacing="40px">
                <Box>
                  <Heading mb="10px" fontSize={[24,30]} lineHeight={10}>
                    Request a Property Verification Service
                  </Heading>
                  <Text letterSpacing="0.5px" fontSize={[15,16]}>
                    Fill in your details below and our team will process your
                    request promptly.
                  </Text>
                </Box>
                <Stack spacing="16px">
                  <Flex gap="16px" flexWrap={['wrap', 'nowrap']}>
                    <FormControl
                      isInvalid={!!errors.firstName && !!touched.firstName}
                    >
                      <FormLabel fontWeight={600} fontSize={15} color="#222222">
                        First Name
                      </FormLabel>
                      <Field
                        as={Input}
                        name="firstName"
                        border="0.5px solid"
                        borderColor="border.200"
                        bg="#FBFBFB"
                        h="50px"
                        borderRadius="40px"
                        placeholder="Enter your first name"
                        _placeholder={{
                          color: '#8295AA',
                          fontWeight: 500,
                          fontSize: 14,
                        }}
                      />
                      <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.lastName && !!touched.lastName}
                    >
                      <FormLabel fontWeight={600} fontSize={15} color="#222222">
                        Last Name
                      </FormLabel>
                      <Field
                        as={Input}
                        name="lastName"
                        border="0.5px solid"
                        borderColor="border.200"
                        bg="#FBFBFB"
                        h="50px"
                        borderRadius="40px"
                        placeholder="Enter your last name"
                        _placeholder={{
                          color: '#8295AA',
                          fontWeight: 500,
                          fontSize: 14,
                        }}
                      />
                      <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Flex gap="16px" flexWrap={['wrap', 'nowrap']}>
                    <FormControl isInvalid={!!errors.email && !!touched.email}>
                      <FormLabel fontWeight={600} fontSize={15} color="#222222">
                        Email Address
                      </FormLabel>
                      <Field
                        as={Input}
                        name="email"
                        border="0.5px solid"
                        borderColor="border.200"
                        bg="#FBFBFB"
                        h="50px"
                        borderRadius="40px"
                        placeholder="Enter your email address"
                        _placeholder={{
                          color: '#8295AA',
                          fontWeight: 500,
                          fontSize: 14,
                        }}
                        type="email"
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.phoneNumber && !!touched.phoneNumber}
                    >
                      <FormLabel fontWeight={600} fontSize={15} color="#222222">
                        Phone Number (Whatsapp)
                      </FormLabel>
                      <Field
                        as={Input}
                        name="phoneNumber"
                        border="0.5px solid"
                        borderColor="border.200"
                        bg="#FBFBFB"
                        h="50px"
                        borderRadius="40px"
                        placeholder="Enter your phone number"
                        _placeholder={{
                          color: '#8295AA',
                          fontWeight: 500,
                          fontSize: 14,
                        }}
                      />
                      <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <FormControl
                    isInvalid={!!errors.serviceType && !!touched.serviceType}
                  >
                    <FormLabel fontWeight={600} fontSize={15} color="#222222">
                      Select Service Type
                    </FormLabel>
                    <Field
                      as={Select}
                      name="serviceType"
                      border="0.5px solid"
                      borderColor="border.200"
                      bg="#FBFBFB"
                      h="50px"
                      borderRadius="40px"
                      placeholder="Select service type"
                      _placeholder={{
                        color: '#8295AA',
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                    >
                      <option value="risk assessment">Risk Assessment</option>
                      <option value="due dilligence">Due Dilligence</option>
                      <option value="title search and verification">
                        Title Search & Verification
                      </option>
                    </Field>
                    <FormErrorMessage>{errors.serviceType}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      !!errors.deliveryMethod && !!touched.deliveryMethod
                    }
                  >
                    <FormLabel fontWeight={600} fontSize={15} color="#222222">
                      Preferred Delivery Method*
                    </FormLabel>
                    <Field
                      as={Select}
                      name="deliveryMethod"
                      border="0.5px solid"
                      borderColor="border.200"
                      bg="#FBFBFB"
                      h="50px"
                      borderRadius="40px"
                      placeholder="Select preferred delivery method"
                      _placeholder={{
                        color: '#8295AA',
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                    >
                      <option value="whatsapp">WhatsApp</option>
                      <option value="email">Email</option>
                      <option value="both">Both</option>
                    </Field>
                    <FormErrorMessage>{errors.deliveryMethod}</FormErrorMessage>
                  </FormControl>
                  <Flex gap="16px" flexWrap={['wrap', 'nowrap']}>
                    <FormControl
                      isInvalid={
                        !!errors.contactFirstName && !!touched.contactFirstName
                      }
                    >
                      <FormLabel fontWeight={600} fontSize={15} color="#222222">
                        Contact Person First Name
                      </FormLabel>
                      <Field
                        as={Input}
                        name="contactFirstName"
                        border="0.5px solid"
                        borderColor="border.200"
                        bg="#FBFBFB"
                        h="50px"
                        borderRadius="40px"
                        placeholder="Enter contact person first name"
                        _placeholder={{
                          color: '#8295AA',
                          fontWeight: 500,
                          fontSize: 14,
                        }}
                      />
                      <FormErrorMessage>
                        {errors.contactFirstName}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        !!errors.contactLastName && !!touched.contactLastName
                      }
                    >
                      <FormLabel fontWeight={600} fontSize={15} color="#222222">
                        Contact Person Last Name
                      </FormLabel>
                      <Field
                        as={Input}
                        name="contactLastName"
                        border="0.5px solid"
                        borderColor="border.200"
                        bg="#FBFBFB"
                        h="50px"
                        borderRadius="40px"
                        placeholder="Enter contact person last name"
                        _placeholder={{
                          color: '#8295AA',
                          fontWeight: 500,
                          fontSize: 14,
                        }}
                      />
                      <FormErrorMessage>
                        {errors.contactLastName}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <FormControl
                    isInvalid={
                      !!errors.contactNumber && !!touched.contactNumber
                    }
                  >
                    <FormLabel fontWeight={600} fontSize={15} color="#222222">
                      Contact Person Number
                    </FormLabel>
                    <Field
                      as={Input}
                      name="contactNumber"
                      border="0.5px solid"
                      borderColor="border.200"
                      bg="#FBFBFB"
                      h="50px"
                      borderRadius="40px"
                      placeholder="Enter contact person number"
                      _placeholder={{
                        color: '#8295AA',
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                    />
                    <FormErrorMessage>{errors.contactNumber}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      !!errors.propertyAddress && !!touched.propertyAddress
                    }
                  >
                    <FormLabel fontWeight={600} fontSize={15} color="#222222">
                      Property Address
                    </FormLabel>
                    <Field
                      as={Input}
                      name="propertyAddress"
                      border="0.5px solid"
                      borderColor="border.200"
                      bg="#FBFBFB"
                      h="50px"
                      borderRadius="40px"
                      placeholder="Enter your property full address"
                      _placeholder={{
                        color: '#8295AA',
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                    />
                    <FormErrorMessage>
                      {errors.propertyAddress}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      !!errors.propertyDescription &&
                      !!touched.propertyDescription
                    }
                  >
                    <FormLabel fontWeight={600} fontSize={15} color="#222222">
                      Property Description
                    </FormLabel>
                    <Field
                      as={Textarea}
                      name="propertyDescription"
                      border="0.5px solid"
                      borderColor="border.200"
                      bg="#FBFBFB"
                      h="90px"
                      borderRadius="10px"
                      placeholder="Enter property description"
                      _placeholder={{
                        color: '#8295AA',
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                      resize="none"
                    />
                    <FormErrorMessage>
                      {errors.propertyDescription}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      !!errors.additionalNotes && !!touched.additionalNotes
                    }
                  >
                    <FormLabel fontWeight={600} fontSize={15} color="#222222">
                      Additional Notes
                    </FormLabel>
                    <Field
                      as={Textarea}
                      name="additionalNotes"
                      border="0.5px solid"
                      borderColor="border.200"
                      bg="#FBFBFB"
                      h="90px"
                      borderRadius="10px"
                      placeholder="Enter any other information necessary"
                      _placeholder={{
                        color: '#8295AA',
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                      resize="none"
                    />
                    <FormErrorMessage>
                      {errors.additionalNotes}
                    </FormErrorMessage>
                  </FormControl>
                  <Button
                    type="submit"
                    h="48px"
                    fontSize={15}
                    fontWeight={700}
                    bg="brand.100"
                    color="brand.200"
                    _hover={{ bg: 'brand.100' }}
                  >
                    Request Service
                  </Button>
                </Stack>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default index;
