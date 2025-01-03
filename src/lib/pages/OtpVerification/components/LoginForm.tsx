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
  Spinner,
  Image,
  Flex,
  HStack,
  Icon,
  Stack,
  InputGroup,
  InputRightElement,
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
import { ValidateOtp, ResendOtp } from '~/lib/api/services/userService';
import Cookie from 'js-cookie';

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();
  const rawUser = Cookie.get('user');
  const user = rawUser ? JSON.parse(rawUser) : null;

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: Yup.object({
      otp: Yup.string().required('Otp is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const formData = {
        email: user?.email,
        otp: Number(values.otp),
      };
      try {
        const response = await ValidateOtp(formData);
        const data = response.data;
        if (response.data.email_verified_at === true) {
          toast({
            title: data.message as string,
            description: 'Otp Verification successful',
            duration: 3000,
            position: 'top-right',
            isClosable: true,
            status: 'success',
          });
          router.push('/signup/signup-success');
        } else {
          toast({
            title: 'Otp Verification failed',
            description: 'Otp is not valid',
            duration: 3000,
            position: 'top-right',
            isClosable: true,
            status: 'error',
          });
        }
      } catch (error: any) {
        setLoading(false);
        console.log('error', error);
        toast({
          title: 'Otp Verification failed',
          description: 'Otp is not valid',
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

  const ResendCode = async () => {
    try {
      const res = await ResendOtp({ email: user?.email });
      const data = await res.data;
      if (data.message === 'success') {
        toast({
          title: 'Otp resent successfully',
          description: data.data,
          duration: 3000,
          position: 'top-right',
          isClosable: true,
          status: 'success',
        });
      }
    } catch (error) {
      toast({
        title: 'Error!',
        description: 'Error resending otp',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
        status: 'error',
      });
    }
  };

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
          OTP verification
        </Heading>
        <Text fontSize={18} color="#2E353F" fontWeight={500}>
          Enter the 6 digit code sent to your email address to verify your
          account
        </Text>
      </Box>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing="32px">
            <FormControl isInvalid={!!formik.errors.otp && formik.touched.otp}>
              <FormLabel mb="10px" color="#222222" fontWeight={600}>
                One time password*
              </FormLabel>
              <Input
                border="1px solid #C0C0C0"
                bg="#FBFBFB"
                borderRadius="50px"
                _placeholder={{ color: '#8295AA' }}
                py="25px"
                px="20px"
                placeholder="Enter code"
                color="#222222"
                name="otp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.otp}
              />
            </FormControl>
            <Box w="100%">
              {/* <Link href='/signup/signup-success'> */}
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
                Didn't get a mail?{' '}
                <Box
                  as="span"
                  color="#FFAE42"
                  cursor="pointer"
                  fontWeight={700}
                  onClick={ResendCode}
                >
                  Resend code
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
