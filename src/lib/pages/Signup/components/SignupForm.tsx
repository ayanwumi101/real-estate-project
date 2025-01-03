'use client';

import {
  Box,
  Input,
  Button,
  Text,
  Heading,
  FormLabel,
  FormControl,
  Image,
  Flex,
  HStack,
  Icon,
  Stack,
  InputGroup,
  InputRightElement,
  Checkbox,
  useToast,
  Spinner,
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
import { SignupUser } from '~/lib/api/services/userService';
import Cookie from 'js-cookie';

export const SocialLoginButton = ({
  label,
  Icon,
}: {
  label: string;
  Icon: any;
}) => {
  return (
    <Button
      border="1px solid #8295AA"
      bg="#FBFBFB"
      w={['100%', '200px']}
      py="25px"
    >
      <Flex alignItems="center" gap="12px">
        <Icon as={Icon} />
        <Text fontWeight={700} color="#222222">
          {label}
        </Text>
      </Flex>
    </Button>
  );
};

const SignupForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      fullname: Yup.string().required('Full Name is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const response = await SignupUser(values);
        console.log(response);
        if (response.status === true) {
          toast({
            title: response.message as string,
            description: response.message as string,
            duration: 3000,
            position: 'top-right',
            isClosable: true,
            status: 'success',
          });
          Cookie.set('user', JSON.stringify(response.data));
          router.push('/signup/secure-account');
          resetForm();
        }
      } catch (error: any) {
        console.log(error);
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
    <Box px={['24px', '44px']} pb="60px" pt="30px">
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
          Create your profile
        </Heading>
        <Text fontSize={18} color="#2E353F">
          Thank you for joining our platform. Let's set up your profile.{' '}
        </Text>
      </Box>
      <Box mb="32px">
        <HStack
          alignItems="center"
          gap={['17px', 2]}
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
              isInvalid={!!formik.errors.fullname && formik.touched.fullname}
            >
              <FormLabel mb="10px" color="#222222" fontWeight={600}>
                Full name*
              </FormLabel>
              <Input
                border="1px solid #C0C0C0"
                bg="#FBFBFB"
                borderRadius="50px"
                _placeholder={{ color: '#8295AA' }}
                py="25px"
                px="20px"
                placeholder="Enter your full name"
                color="#222222"
                name="fullname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullname}
              />
              {formik.errors.fullname && formik.touched.fullname && (
                <Text color="red.500" mt="2">
                  {formik.errors.fullname}
                </Text>
              )}
            </FormControl>
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
                placeholder="Enter your full name"
                color="#222222"
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <Text color="red.500" mt="2">
                  {formik.errors.email}
                </Text>
              )}
            </FormControl>
            <Checkbox
              color="#222222"
              fontWeight={500}
              borderColor="#2E353F"
              size="lg"
              isChecked={true}
            >
              I agree with terms and conditions
            </Checkbox>
            <Box w="100%">
              {/* <Link href="/signup/secure-account"> */}
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

export default SignupForm;
