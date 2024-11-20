'use client'

import { Box, Input, Button, Text, Heading, FormLabel, FormControl, Image, Flex, HStack, Icon, Stack, InputGroup, InputRightElement, Spinner, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { GoogleIcon, AppleIcon, MicrosoftIcon } from '~/lib/components/Icons/Icons'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import Link from 'next/link';
import { loginUser } from '~/lib/api/services/userService';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';



export const SocialLoginButton = ({label, Icon} : {label: string, Icon: any}) => {
    return (
      <Button border="1px solid #8295AA" bg="#FBFBFB" w={['100%','200px']} py='25px'>
        <Flex alignItems="center" gap="12px">
          <Icon as={Icon} />
          <Text fontWeight={700} color="#222222">
            {label}
          </Text>
        </Flex>
      </Button>
    );
}


const LoginForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();
    const router = useRouter();

    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email('Invalid email address')
          .required('Email is required'),
        password: Yup.string().required('Password is required'),
      }),
      onSubmit: async (values) => {
        setLoading(true);
        try {
          const response = await loginUser(values);
          const data = response.data;
          console.log(response);
          if(response.success === true){
            toast({
              title: data.message as string,
              description: 'Login successful',
              duration: 3000,
              position: 'top-right',
              isClosable: true,
              status: 'success',
            });
            router.push('/user/dashboard')
          }
        } catch (error: any) {
          setLoading(false);
          toast({
            title: error.response.data.message as string,
            description: 'Login unsuccessful',
            duration: 3000,
            position: 'top-right',
            isClosable: true,
            status: 'error',
          })
        } finally {
          setLoading(false);
        }
      },
    });


  return (
    <Box px={['24px', '44px']} py="60px">
      <Box mb="40px">
        <Link href="/">
          <Image src="" alt="Company Logo" mb="16px" />
        </Link>
        <Heading fontSize={32} fontWeight={500} color="#222222">
          Welcome Back
        </Heading>
      </Box>
      <Box mb="32px">
        <HStack
          alignItems="center"
          gap={['17px', 0]}
          flexWrap={['wrap', 'nowrap']}
          justifyContent="space-between"
        >
          <SocialLoginButton label="Google" Icon={GoogleIcon} />
          <SocialLoginButton label="Apple" Icon={AppleIcon} />
          <SocialLoginButton label="Microsoft Account" Icon={MicrosoftIcon} />
        </HStack>
      </Box>
      <Box pos="relative" mb="40px">
        <Box w="100%" h="1px" bg="#8295AA"></Box>
        <Text
          pos="absolute"
          top="50%"
          w="60px"
          textAlign="center"
          left="50%"
          transform="translate(-50%, -50%)"
          color="#8295AA"
          bg="white"
          p="2"
          fontWeight={500}
        >
          Or
        </Text>
      </Box>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing="32px">
            <FormControl
              isInvalid={!!formik.errors.email && formik.touched.email}
            >
              <FormLabel mb="10px" color="#222222" fontWeight={600}>
                Email*
              </FormLabel>
              <Input
                border="1px solid #C0C0C0"
                bg="#FBFBFB"
                borderRadius="50px"
                _placeholder={{ color: '#8295AA' }}
                py="25px"
                px="20px"
                placeholder="Enter your email"
                color="#222222"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                name='email'
              />
              {formik.errors.email && formik.touched.email && (
                <Text color="red.500" mt="2">
                  {formik.errors.email}
                </Text>
              )}
            </FormControl>
            <FormControl
              isInvalid={!!formik.errors.password && formik.touched.password}
            >
              <FormLabel mb="10px" color="#222222" fontWeight={600}>
                Password*
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
                  name='password'
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
            <Link href="/forgot-password">
              <Text fontWeight={600} color="#FFAE42">
                Forgot Password?
              </Text>
            </Link>
            <Box w="100%">
              <Button
                w="100%"
                mb="10px"
                bg="#000080"
                color="white"
                h="55px"
                borderRadius="50px"
                type='submit'
              >
                {loading ? <Spinner /> : 'Continue'}
              </Button>
              <Text color="#131339" fontWeight={500}>
                Dont Have and Account?{' '}
                <Box as="span" color="#FFAE42" fontWeight={700}>
                  <Link href="/signup">Sign up</Link>
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
