'use client';

import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
  Heading,
  Divider,
  FormErrorMessage,
  useToast,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState, useContext } from 'react';
import * as Yup from 'yup';
import { AddNextOfKin, GetNextOfKins } from '~/lib/api/services/userService';
import { ChevronLeftIcon } from '~/lib/components/Icons/Icons';
import { AppContext } from '~/lib/layout';
import useNavigate from '~/lib/utils/useNavigate';

const index = () => {
  const toast = useToast();
  const router = useRouter();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { nextOfKins, setNextOfKins } = useContext<any>(AppContext);
  const initialValues = {
    email: '',
    phone: '',
    fullname: '',
    relationship: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    fullname: Yup.string().required('Full name is required'),
    relationship: Yup.string().required('Relationship is required'),
  });

  const handleSubmit = async (values: any, resetForm: () => void) => {
    setLoading(true);
    try {
      const res = await AddNextOfKin(values);
      if (res.status) {
        const res = await GetNextOfKins();
        const newData = await res.data;
        setNextOfKins(newData);
        setLoading(false);
        toast({
          title: 'Next of Kin added successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        // Reset form fields after successful submission
        resetForm();
      }
    } catch (error: any) {
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      setLoading(false);
    }
  };
  return (
    <Box borderTop="1px solid" borderColor="border.100">
      <Box maxW="680px" mx="auto">
        {' '}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
        >
          {({ errors, touched }) => {
            return (
              <Form>
                <Stack spacing="24px" textAlign="center" py="40px">
                  <Heading fontSize={24} fontWeight={700} color="brand.100">
                    New Next of Kin
                  </Heading>
                  <FormControl
                    isInvalid={!!errors.fullname && touched.fullname}
                  >
                    <FormLabel>Name of Next of Kin</FormLabel>
                    <Field
                      as={Input}
                      name="fullname"
                      type="text"
                      placeholder="Enter your next of kin’s full name"
                      h="50px"
                      border="1px solid #C0C0C0"
                      borderRadius="50px"
                    />
                    <FormErrorMessage>{errors.fullname}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.relationship && touched.relationship}
                  >
                    <FormLabel>What is the Relationship?</FormLabel>
                    <Field
                      as={Select}
                      name="relationship"
                      placeholder="Select relationship with your next of kin"
                      h="50px"
                      border="1px solid #C0C0C0"
                      borderRadius="50px"
                    >
                      <option value="parent">Parent</option>
                      <option value="sibling">Sibling</option>
                      <option value="spouse">Spouse</option>
                      <option value="child">Child</option>
                      <option value="friend">Friend</option>
                      <option value="other">Other</option>
                    </Field>
                    <FormErrorMessage>{errors.relationship}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.phone && touched.phone}>
                    <FormLabel>Phone Number of next of Kin</FormLabel>
                    <Field
                      as={Input}
                      name="phone"
                      type="text"
                      placeholder="Enter your next of kin’s phone number"
                      h="50px"
                      border="1px solid #C0C0C0"
                      borderRadius="50px"
                    />
                    <FormErrorMessage>{errors.phone}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel>Email Address of next of Kin</FormLabel>
                    <Field
                      as={Input}
                      name="email"
                      type="email"
                      placeholder="Enter your next of kin’s email address"
                      h="50px"
                      border="1px solid #C0C0C0"
                      borderRadius="50px"
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap="30px"
                  >
                    <Button
                      onClick={() => {
                        router.back();
                      }}
                      variant="ghost"
                      leftIcon={<ChevronLeftIcon />}
                      p="0"
                      _hover={{ bg: 'none' }}
                      color="brand.100"
                    >
                      Back
                    </Button>
                    <Button
                      bg="brand.100"
                      color="brand.200"
                      fontWeight={500}
                      minW="150px"
                      type="submit"
                      isDisabled={loading}
                      _hover={{ bg: '#000080' }}
                    >
                      {loading ? <Spinner /> : 'Add Next of Kin'}
                    </Button>
                  </Flex>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default index;
