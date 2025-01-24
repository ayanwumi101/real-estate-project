'use client';
import {
  Box,
  Input,
  Button,
  Text,
  Heading,
  FormLabel,
  FormControl,
  useToast,
  FormErrorMessage,
  Image,
  Flex,
  HStack,
  Icon,
  Stack,
  InputGroup,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { ForgotPassword } from '~/lib/api/services/userService';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie'

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();

  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const handleSubmit = async (values: any, { setFieldValue }: any) => {
    setLoading(true);
    try {
      const response = await ForgotPassword(values);
      console.log(response);
      if (response.status === true) {
        toast({
          title: 'Success!',
          description: response.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        router.push('/forgot-password/verify-otp');
        setFieldValue('email', '', false);
        Cookie.set('password-reset-email', values.email);
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: 'An error occurred.',
        description: error.response.data.data.error as string,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
    setLoading(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue, values }) => {
        return (
          <Form>
            <Box px={['24px', '44px']} pb="60px" pt='30px' h={['auto', '100vh']}>
              <Box mb="45px">
                <Link href="/">
                  <Image
                    src="/assets/images/logo3.png"
                    w="auto"
                    h="50px"
                    objectFit="contain"
                    mb="30px"
                  />
                </Link>
                <Heading
                  fontSize={[25,30]}
                  fontWeight={500}
                  mb="16px"
                  color="#222222"
                >
                  Forgot Password
                </Heading>
                <Text fontSize={18} color="#2E353F" fontWeight={500}>
                  Enter your email and a token will be sent to your registered
                  email address
                </Text>
              </Box>
              <Box>
                <Stack spacing="20px">
                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel mb="10px" color="#222222" fontWeight={600}>
                      Email*
                    </FormLabel>
                    <Field
                      as={Input}
                      name="email"
                      border="1px solid #C0C0C0"
                      bg="#FBFBFB"
                      borderRadius="50px"
                      _placeholder={{ color: '#8295AA' }}
                      py="25px"
                      px="20px"
                      placeholder="Enter your email"
                      color="#222222"
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <Box w="100%">
                    <Button
                      w="100%"
                      mb="10px"
                      bg="#000080"
                      color="white"
                      h="55px"
                      borderRadius="50px"
                      type="submit"
                    >
                      {loading ? <Spinner /> : 'Continue'}
                    </Button>
                    <Text color="#131339" fontWeight={500}>
                      Already have an Account?{' '}
                      <Box as="span" color="#FFAE42" fontWeight={700}>
                        <Link href="/signin">Sign in</Link>
                      </Box>
                    </Text>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ForgotPasswordForm;
