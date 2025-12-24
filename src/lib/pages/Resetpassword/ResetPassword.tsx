'use client';

import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Image,
  Text,
  Heading,
  InputGroup,
  InputLeftAddon,
  Button,
  Input,
  InputRightElement,
  useToast,
  FormErrorMessage,
  Spinner,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { ResetPassword as ResetPasswordApi } from '~/lib/api/services/userService';

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm password is required'),
});
const initialValues = {
  password: '',
  confirmPassword: '',
};

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = {
      code: Cookies.get('forgot-password-code'),
      password: values.password,
    };
    try {
      const res = await ResetPasswordApi(formData);
      if (res.status === true) {
        setLoading(false);
        router.push('/signin');
        toast({
          title: res.message as string,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
      Cookies.remove('forgot-password-code');
    } catch (error: any) {
      setLoading(false);
      toast({
        title: error.response.data.message,
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
            <Box
              px={['24px', '44px']}
              pb="60px"
              pt="30px"
              h={['auto', '100vh']}
              maxW="700px"
              mx="auto"
            >
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
                  fontSize={[25, 30]}
                  fontWeight={500}
                  mb="16px"
                  color="#222222"
                >
                  Create New Password
                </Heading>
                <Text fontSize={18} color="#2E353F">
                  Enter your email and a token will be sent to your registered{' '}
                  <br /> email address
                </Text>
              </Box>
              <Box>
                <Stack spacing="20px">
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel mb="10px" color="#222222" fontWeight={600}>
                      New Password*
                    </FormLabel>
                    <InputGroup w="100%">
                      <Field
                        as={Input}
                        pr="12"
                        py="12px"
                        border="1px solid #C0C0C0"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your new password"
                        borderRadius="50px"
                        bg="#FBFBFB"
                        color="#8295AA"
                        _placeholder={{ color: '#8295AA' }}
                        h="50px"
                        name="password"
                      />
                      <InputRightElement w="4rem" mt="1.5">
                        <Button onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <IoMdEye color="#8295AA" size={22} />
                          ) : (
                            <IoMdEyeOff color="#8295AA" size={22} />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      !!errors.confirmPassword && touched.confirmPassword
                    }
                  >
                    <FormLabel mb="10px" color="#222222" fontWeight={600}>
                      Confirm password*
                    </FormLabel>
                    <InputGroup w="100%">
                      <Field
                        as={Input}
                        pr="12"
                        py="12px"
                        border="1px solid #C0C0C0"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your new password"
                        borderRadius="50px"
                        bg="#FBFBFB"
                        color="#8295AA"
                        _placeholder={{ color: '#8295AA' }}
                        h="50px"
                        name="confirmPassword"
                      />
                      <InputRightElement w="4rem" mt="1.5">
                        <Button
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <IoMdEye color="#8295AA" size={22} />
                          ) : (
                            <IoMdEyeOff color="#8295AA" size={22} />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.confirmPassword}
                    </FormErrorMessage>
                  </FormControl>
                  <Box w="100%">
                    <Button
                      w="100%"
                      mb="10px"
                      bg="#000080"
                      _hover={{ bg: '#000080' }}
                      color="white"
                      h="55px"
                      borderRadius="50px"
                      type="submit"
                      isDisabled={loading}
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

export default ResetPassword;
