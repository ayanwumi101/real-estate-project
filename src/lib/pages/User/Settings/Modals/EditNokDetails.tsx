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
import {
  AddNextOfKin,
  GetNextOfKins,
  UpdateUserProfile,
} from '~/lib/api/services/userService';
import { AppContext } from '~/lib/layout';
import { GetUserProfileDetails } from '~/lib/api/services/profileService';
import { UpdateNextOfKinDetails } from '~/lib/api/services/nokService';

const EditNokDetails = ({
  isOpen,
  onClose,
  selectedNextOfKin,
  setNextOfKins,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedNextOfKin: any;
  setNextOfKins: (nextOfKins: any) => void;
}) => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues = {
    email: selectedNextOfKin?.email || '',
    phone: selectedNextOfKin?.phone || '',
    fullname: selectedNextOfKin?.fullname || '',
    relationship: selectedNextOfKin?.relationship || '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email'),
    phone: Yup.string(),
    fullname: Yup.string(),
    relationship: Yup.string(),
  });

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const res = await UpdateNextOfKinDetails(selectedNextOfKin?.id, values);
      if (res.status) {
        const res = await GetNextOfKins();
        const newData = await res.data;
        setNextOfKins(newData);
        setLoading(false);
        toast({
          title: 'Next of Kin details updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        onClose();
      } else {
        setLoading(false);
        toast({
          title: 'Failed to update Next of Kin details',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: 'An error occurred while updating Next of Kin details',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="100%">
      <CustomModal isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ errors, touched, values, setFieldValue }) => {
            return (
              <Form>
                <Stack spacing="20px" w="100%">
                  <Heading fontSize={24} fontWeight={500} color="brand.100">
                    Edit Next of Kin Details
                  </Heading>
                  <Divider />
                  <FormControl
                    isInvalid={!!errors.fullname && !!touched.fullname}
                  >
                    <FormLabel>Full Name</FormLabel>
                    <Field
                      as={Input}
                      name="fullname"
                      type="text"
                      placeholder="Enter full name"
                      h="50px"
                      border="1px solid #C0C0C0"
                      borderRadius="50px"
                    />
                    <FormErrorMessage>
                      {typeof errors.fullname === 'string'
                        ? errors.fullname
                        : ''}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.relationship && !!touched.relationship}
                  >
                    <FormLabel>Relationship</FormLabel>
                    <Field
                      as={Select}
                      name="relationship"
                      placeholder="Select relationship"
                      h="50px"
                      border="1px solid #C0C0C0"
                      borderRadius="50px"
                    >
                      <option value="parent">Parent</option>
                      <option value="sibling">Sibling</option>
                      <option value="spouse">Spouse</option>
                      <option value="child">Child</option>
                      <option value="friend">Friend</option>
                      <option value="sister">Sister</option>
                      <option value="other">Other</option>
                    </Field>
                    <FormErrorMessage>
                      {typeof errors.relationship === 'string'
                        ? errors.relationship
                        : ''}
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
                      {loading ? <Spinner /> : 'Update Details'}
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

export default EditNokDetails;
