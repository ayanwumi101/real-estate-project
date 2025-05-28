'use client';

import {
  Box,
  Divider,
  Select,
  Input,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Heading,
  useToast,
  Spinner,
  FormErrorMessage,
  Flex,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import React, { useContext, useState } from 'react';
import CustomModal from '~/lib/components/Modal';
import * as Yup from 'yup';
import { AddNextOfKin, GetNextOfKins } from '~/lib/api/services/userService';
import { AppContext } from '~/lib/layout';



const AddNextOfKinModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const toast = useToast();
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

  const handleSubmit = async (values: any) => {
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
        onClose();
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
    <Box>
      <CustomModal isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ errors, touched, values, setFieldValue }) => {
            return (
              <Form>
                <Stack spacing="24px">
                  <Heading fontSize={24} fontWeight={500} color="brand.100">
                    Add a trusted person to manage or inherit your asset.
                  </Heading>
                  <Divider />
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
                    justifyContent="flex-end"
                    gap="30px"
                  >
                    <Button
                      bg="brand.500"
                      color="brand.100"
                      fontWeight={500}
                      minW="100px"
                      onClick={onClose}
                      _hover={{ bg: '#EDEDFF' }}
                    >
                      Cancel
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
      </CustomModal>
    </Box>
  );
};

export default AddNextOfKinModal;
