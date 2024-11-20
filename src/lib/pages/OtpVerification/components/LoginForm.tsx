'use client'

import { Box, Input, Button, Text, Heading, FormLabel, FormControl, useToast, Spinner, Image, Flex, HStack, Icon, Stack, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import { GoogleIcon, AppleIcon, MicrosoftIcon } from '~/lib/components/Icons/Icons'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { ValidateOtp, ResendOtp } from '~/lib/api/services/userService';


const LoginForm = () => {
     const [loading, setLoading] = useState<boolean>(false);
     const toast = useToast();
     const router = useRouter();

     const formik = useFormik({
       initialValues: {
         email: '',
         otp: '',
       },
       validationSchema: Yup.object({
         email: Yup.string()
           .email('Invalid email address')
           .required('Email is required'),
         otp: Yup.string().required('Otp is required'),
       }),
       onSubmit: async (values) => {
         setLoading(true);
         try {
           const response = await ValidateOtp(values);
           const data = response.data;
           console.log(response);
           if (response.success === true) {
             toast({
               title: data.message as string,
               description: 'Otp Verification successful',
               duration: 3000,
               position: 'top-right',
               isClosable: true,
               status: 'success',
             });
             router.push('/signup/signup-success');
           }
         } catch (error: any) {
           setLoading(false);
           toast({
             title: error.response.data.message as string,
             description: 'Otp Verification failed',
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



     const ResendCode = async() => {
      try {
        const res = await ResendOtp({});
        const data = await res.data;
        if(data){
          toast({

          })
        }
      } catch (error) {
        toast({

        })
      }
     }

     

  return (
    <Box px={['24px', '44px']} py="60px">
      <Box mb="40px">
        <Link href="/">
          <Image src="" alt="Company Logo" mb="16px" />
        </Link>
        <Heading fontSize={32} fontWeight={500} mb="16px" color="#222222">
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
                {loading ? <Spinner /> : "Continue"}
              </Button>
              {/* </Link> */}
              <Text color="#131339" fontWeight={500}>
                Didn't get a mail?{' '}
                <Box as="span" color="#FFAE42" fontWeight={700} onClick={ResendCode}>
                  <Link href="/signup">Resend code</Link>
                </Box>
              </Text>
            </Box>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default LoginForm