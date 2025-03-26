'use client';

import {
  Input,
  Stack,
  Box,
  FormLabel,
  FormControl,
  Button,
  FormErrorMessage,
  useToast, Spinner, InputGroup, InputRightElement
} from '@chakra-ui/react';
import React from 'react';
import * as Yup from 'yup';
import { Field, Formik, Form } from 'formik';
import { ChangePassword } from '~/lib/api/services/userService';
import { FiEye, FiEyeOff } from 'react-icons/fi';


const initialValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string().required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match')
    .required('Confirm password is required'),
});

const Security = () => {
  const toast = useToast();
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = {
      current_password: values.currentPassword,
      new_password: values.newPassword,
      confirmed_password: values.confirmPassword,
    };
    try {
      const res = await ChangePassword(formData);
      if (res.status) {
        toast({
          title: 'Password changed successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        setLoading(false);
        values.currentPassword = '';
        values.newPassword = '';
        values.confirmPassword = '';
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast({
        title: 'An error occurred',
        description: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ errors, touched, values, setFieldValue }) => {
        return (
          <Form>
            <Box px={['20px', '40px']} w={['100%', '630px']}>
              <Stack spacing="22px">
                <FormControl
                  isInvalid={
                    !!errors.currentPassword && touched.currentPassword
                  }
                >
                  <FormLabel
                    fontWeight={600}
                    fontSize={16}
                    color="#222222"
                    mb="13px"
                  >
                    Current Password
                  </FormLabel>
                  <InputGroup>
                    <Field
                      as={Input}
                      type={showPassword ? 'text' : 'password'}
                      h="50px"
                      borderRadius="50px"
                      border="1px solid #C0C0C0"
                      bg="#FBFBFB"
                      px="20px"
                      placeholder="Enter your current password"
                      name="currentPassword"
                    />
                    <InputRightElement w="60px">
                      <Button
                        mt="2"
                        onClick={() => setShowPassword(!showPassword)}
                        w="50px"
                      >
                        {showPassword ? <FiEye /> : <FiEyeOff />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.currentPassword}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.newPassword && touched.newPassword}
                >
                  <FormLabel
                    fontWeight={600}
                    fontSize={16}
                    color="#222222"
                    mb="13px"
                  >
                    New Password
                  </FormLabel>
                  <InputGroup>
                    <Field
                      as={Input}
                      type={showNewPassword ? 'text' : 'password'}
                      h="50px"
                      borderRadius="50px"
                      border="1px solid #C0C0C0"
                      bg="#FBFBFB"
                      px="20px"
                      placeholder="Enter your new password"
                      name="newPassword"
                    />
                    <InputRightElement w="60px">
                      <Button
                        mt="2"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        w="50px"
                      >
                        {showNewPassword ? <FiEye /> : <FiEyeOff />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.confirmPassword && touched.confirmPassword
                  }
                >
                  <FormLabel
                    fontWeight={600}
                    fontSize={16}
                    color="#222222"
                    mb="13px"
                  >
                    Confirm Password
                  </FormLabel>
                  <InputGroup>
                    <Field
                      as={Input}
                      type={showConfirmPassword ? 'text' : 'password'}
                      h="50px"
                      borderRadius="50px"
                      border="1px solid #C0C0C0"
                      bg="#FBFBFB"
                      px="20px"
                      placeholder="Confirm your new password"
                      name="confirmPassword"
                    />
                    <InputRightElement w="60px">
                      <Button
                        mt="2"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        w="50px"
                      >
                        {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                </FormControl>
                <Button
                  isDisabled={
                    loading ||
                    !values.currentPassword ||
                    !values.newPassword ||
                    !values.confirmPassword
                  }
                  bg="brand.100"
                  color="brand.200"
                  type="submit"
                  h="48px"
                  fontWeight={500}
                  w="100%"
                  _hover={{ bg: 'brand.100' }}
                >
                  {loading ? <Spinner /> : 'Change Password'}
                </Button>
              </Stack>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Security;
