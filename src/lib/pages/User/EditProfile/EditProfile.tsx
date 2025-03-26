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
import { AddNextOfKin, GetNextOfKins, UpdateUserProfile } from '~/lib/api/services/userService';
import { AppContext } from '~/lib/layout';
import { GetUserProfileDetails } from '~/lib/api/services/profileService';



const EditProfileModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { setUserDetails, userDetails } = useContext<any>(AppContext);
  const toast = useToast();
    const [loading, setLoading] = useState<boolean>(false);

    const initialValues = {
      email: userDetails?.email || '',
      phone: userDetails?.phone || '',
      address: userDetails?.address || '',
      gender: userDetails?.gender || '',
    };
  
    const validationSchema = Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      phone: Yup.string().required('Phone number is required'),
      address: Yup.string().required('Address is required'),
      gender: Yup.string().required('Gender is required'),
    });
  
    const handleSubmit = async (values: any) => {
      setLoading(true);
      try {
        const res = await UpdateUserProfile(values);
        if (res.status) {
          const res = await GetUserProfileDetails();
          const newData = await res.data;
          setUserDetails(newData);
          setLoading(false);
          toast({
            title: 'Profile Details Updated successfully',
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
                <Stack spacing="20px">
                  <Heading fontSize={24} fontWeight={500} color="brand.100">
                    Edit Profile Details
                  </Heading>
                  <Divider />
                  <FormControl
                    isInvalid={!!errors.address && !!touched.address}
                  >
                    <FormLabel>Address</FormLabel>
                    <Field
                      as={Input}
                      name="address"
                      type="text"
                      placeholder="Enter your address"
                      h="50px"
                      border="1px solid #C0C0C0"
                      borderRadius="50px"
                    />
                    <FormErrorMessage>
                      {typeof errors.address === 'string' ? errors.address : ''}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.gender && !!touched.gender}>
                    <FormLabel>Gender</FormLabel>
                    <Field
                      as={Select}
                      name="gender"
                      placeholder="Select your gender"
                      h="50px"
                      border="1px solid #C0C0C0"
                      borderRadius="50px"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Field>
                    <FormErrorMessage>
                      {typeof errors.gender === 'string' ? errors.gender : ''}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.phone && !!touched.phone}>
                    <FormLabel>Phone Number</FormLabel>
                    <Field
                      as={Input}
                      name="phone"
                      type="text"
                      placeholder="Enter your phone number"
                      h="50px"
                      border="1px solid #C0C0C0"
                      borderRadius="50px"
                    />
                    <FormErrorMessage>
                      {typeof errors.phone === 'string' ? errors.phone : ''}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.email && !!touched.email}>
                    <FormLabel>Email Address</FormLabel>
                    <Field
                      as={Input}
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      h="50px"
                      border="1px solid #C0C0C0"
                      borderRadius="50px"
                    />
                    <FormErrorMessage>
                      {typeof errors.email === 'string' ? errors.email : ''}
                    </FormErrorMessage>
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
                      _hover={{ bg: 'brand.100' }}
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

export default EditProfileModal;
