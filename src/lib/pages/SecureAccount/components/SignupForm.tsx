'use client';

import {
  Box,
  Input,
  Button,
  Text,
  Heading,
  FormLabel,
  FormControl,
  Spinner,
  useToast,
  Image,
  Flex,
  HStack,
  Icon,
  Stack,
  InputGroup,
  InputRightElement,
  Checkbox,
  InputLeftAddon,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  GoogleIcon,
  AppleIcon,
  MicrosoftIcon,
} from '~/lib/components/Icons/Icons';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { AddPassowrd } from '~/lib/api/services/userService';
import Cookie from 'js-cookie';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();
  const rawUser = Cookie.get('user');
  const user = rawUser ? JSON.parse(rawUser) : null;

  const formik = useFormik({
    initialValues: {
      phone: '',
      password: '',
    },
    validationSchema: Yup.object({
      phone: Yup.number().required('Phone Number is required'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          'Password must contain at least one special character'
        ),
    }),
    onSubmit: async (values) => {
      const formData = {
        user_id: user?.id,
        password: values.password,
        confirm_password: values.password,
        phone: values.phone,
      };
      setLoading(true);
      try {
        const response = await AddPassowrd(formData);
        if (response?.token) {
          toast({
            title: response.message as string,
            description: response.message,
            duration: 3000,
            position: 'top-right',
            isClosable: true,
            status: 'success',
          });
          router.push('/signup/verify-otp');
        }
      } catch (error: any) {
        setLoading(false);
        toast({
          title: error.response.data.message as string,
          description: error.response.data.message,
          duration: 3000,
          position: 'top-right',
          isClosable: true,
          status: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box px={['24px', '44px']} pb="60px" pt='30px'>
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
        <Heading fontSize={[25,30]} fontWeight={500} mb="16px" color="#222222">
          Secure your account
        </Heading>
        <Text fontSize={18} color="#2E353F">
          Enter your phone number, create a password, choose your nationality
          and enter referral code if any.
        </Text>
      </Box>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing="32px">
            <FormControl
              isInvalid={!!formik.errors.phone && formik.touched.phone}
            >
              <FormLabel mb="10px" color="#222222" fontWeight={600}>
                Phone number*
              </FormLabel>
              <InputGroup>
                <InputLeftAddon
                  bg="#F5F5F5"
                  color="#2E353F"
                  py="25px"
                  borderTopLeftRadius="50px"
                  borderBottomLeftRadius="50px"
                  border="1px solid #C0C0C0"
                >
                  +234
                </InputLeftAddon>
                <Input
                  border="1px solid #C0C0C0"
                  bg="#FBFBFB"
                  borderRadius="50px"
                  _placeholder={{ color: '#8295AA' }}
                  py="25px"
                  px="20px"
                  placeholder="Enter your phone number"
                  color="#222222"
                  type="tel"
                  name="phone"
                  maxLength={10}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
              </InputGroup>
              {formik.errors.phone && formik.touched.phone && (
                <Text color="red.500" mt="2">
                  {formik.errors.phone}
                </Text>
              )}
            </FormControl>
            <FormControl
              isInvalid={!!formik.errors.password && formik.touched.password}
            >
              <FormLabel mb="10px" color="#222222" fontWeight={600}>
                Create your password*
              </FormLabel>
              <InputGroup w="100%">
                <Input
                  pr="12"
                  py="12px"
                  border="1px solid #C0C0C0"
                  type={showPassword ? 'text' : 'password'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="*********"
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
              {formik.errors.password && formik.touched.password && (
                <Text color="red.500" mt="2">
                  {formik.errors.password}
                </Text>
              )}
            </FormControl>
            <Box w="100%">
              {/* <Link href="/signup/verify-otp"> */}
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
              {/* </Link> */}
              <Text color="#131339" fontWeight={500}>
                Already Have an Account?{' '}
                <Box as="span" color="#FFAE42" fontWeight={700}>
                  <Link href="/signin">Sign in</Link>
                </Box>
              </Text>
            </Box>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
