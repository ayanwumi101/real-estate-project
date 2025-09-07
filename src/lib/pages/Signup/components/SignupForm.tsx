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
  InputLeftAddon,
} from '@chakra-ui/react';
import React, { act, useState } from 'react';
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
import Cookies from 'js-cookie';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [phone, setPhone] = React.useState<string>('234');
  const tabs = ['Investor', 'Realtor'];
  const [activeTab, setActiveTab] = React.useState<string>('Investor');

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      phone: '234',
      password: '',
      confirmPassword: '',
      companyName: '',
      termsAndConditions: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      fullname: Yup.string().required('Full Name is required'),
      phone: Yup.number().required('Phone Number is required'),
      companyName: Yup.string().when([], (_: any, schema: any) => {
        return activeTab === 'Realtor'
          ? schema.required('Company Name is required')
          : schema.notRequired();
      }),
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
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
      termsAndConditions: Yup.boolean().oneOf(
        [true],
        'You must accept the terms and conditions'
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const formData = {
        email: values.email,
        fullname: values.fullname,
        phone: values.phone,
        password: values.password,
        confirm_password: values.confirmPassword,
        role: activeTab === 'Investor' ? 'investor' : 'realtor',
        company_name: values.companyName
      };
      try {
        const response = await SignupUser(formData);
        if (response.status === true) {
          toast({
            title: response.message as string,
            description: response.message as string,
            duration: 3000,
            position: 'top-right',
            isClosable: true,
            status: 'success',
          });
          Cookies.set('vestier-new-token', JSON.stringify(response.data.token));
          router.push('/signup/verify-otp');
          Cookies.set('vestier-user', JSON.stringify(response.data.user));
          resetForm();
        }
      } catch (error: any) {
        console.log(error);
        setLoading(false);
        toast({
          title: error.response.data.error as string,
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
      <Box mb="40px">
        <Link href="/">
          <Image
            src="/assets/images/logo3.png"
            w="auto"
            h="50px"
            objectFit="contain"
            mb="30px"
          />
        </Link>
        <Box
          w="full"
          border="1px solid"
          borderColor="border.100"
          rounded="50px"
          p="6px"
          mb="30px"
        >
          <Flex>
            {tabs.map((tab) => (
              <Button
                key={tab}
                bg={activeTab === tab ? 'bg.200' : 'none'}
                onClick={() => setActiveTab(tab)}
                w="50%"
                h="52px"
                color={activeTab === tab ? 'brand.100' : 'brand.800'}
              >
                {tab === 'Investor'
                  ? 'Signup as Investor'
                  : 'Signup as Realtor'}
              </Button>
            ))}
          </Flex>
        </Box>
        <Box>
          {activeTab === 'Investor' ? (
            <Stack spacing="10px">
              <Heading
                fontSize={[25, 30]}
                fontWeight={500}
                color="#222222"
                letterSpacing="1.5px"
              >
                Create your profile
              </Heading>
              <Text fontSize={18} color="#2E353F" fontWeight={500}>
                Thank you for joining our platform. Let's set up your profile.{' '}
              </Text>
            </Stack>
          ) : (
            <Stack spacing="10px">
              <Heading
                fontSize={[25, 30]}
                letterSpacing="1.5px"
                fontWeight={500}
                color="#222222"
              >
                Join Vestier as a Realtor or Property Manager
              </Heading>
              <Text fontSize={18} color="#2E353F" fontWeight={500}>
                Help investors manage and grow their portfolios. List, update,
                and track assets with ease.
              </Text>
            </Stack>
          )}
        </Box>
      </Box>
      {/* <Box mb="32px">
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
      </Box> */}
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing="25px">
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
                placeholder="Enter your email address"
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
            {activeTab === 'Realtor' && (
              <FormControl
                isInvalid={
                  !!formik.errors.companyName && formik.touched.companyName
                }
              >
                <FormLabel mb="10px" color="#222222" fontWeight={600}>
                  Company Name*
                </FormLabel>
                <Input
                  border="1px solid #C0C0C0"
                  bg="#FBFBFB"
                  borderRadius="50px"
                  _placeholder={{ color: '#8295AA' }}
                  py="25px"
                  px="20px"
                  placeholder="Enter your company name"
                  color="#222222"
                  name="companyName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.companyName}
                />
                {formik.errors.companyName && formik.touched.companyName && (
                  <Text color="red.500" mt="2">
                    {formik.errors.companyName}
                  </Text>
                )}
              </FormControl>
            )}

            <FormControl
              isInvalid={!!formik.errors.phone && formik.touched.phone}
            >
              <FormLabel mb="10px" color="#222222" fontWeight={600}>
                Phone number*
              </FormLabel>
              <PhoneInput
                value={formik.values.phone}
                onChange={(value: string) =>
                  formik.setFieldValue('phone', value)
                }
                onBlur={() => formik.setFieldTouched('phone', true)}
                containerStyle={{
                  border: '1px solid #C0C0C0',
                  backgroundColor: '#FBFBFB',
                  padding: '5px 14px 5px 14px',
                  borderRadius: '24px',
                  height: '50px',
                }}
                inputStyle={{
                  border: 'none',
                  paddingLeft: '50px',
                  paddingTop: '5px',
                  backgroundColor: '#FBFBFB',
                }}
                buttonStyle={{
                  border: 'none',
                  background: 'none',
                }}
              />
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
                  border="1px solid #C0C0C0"
                  type={showPassword ? 'text' : 'password'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="*********"
                  borderRadius="50px"
                  bg="#FBFBFB"
                  color="#8295AA"
                  _placeholder={{ color: '#8295AA', fontSize: 16 }}
                  name="password"
                  h="50px"
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
            <FormControl
              isInvalid={
                !!formik.errors.confirmPassword &&
                formik.touched.confirmPassword
              }
            >
              <FormLabel mb="10px" color="#222222" fontWeight={600}>
                Confirm password*
              </FormLabel>
              <InputGroup w="100%">
                <Input
                  pr="12"
                  py="12px"
                  border="1px solid #C0C0C0"
                  type={showConfirmPassword ? 'text' : 'password'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  placeholder="*********"
                  borderRadius="50px"
                  bg="#FBFBFB"
                  color="#8295AA"
                  _placeholder={{ color: '#8295AA' }}
                  h="50px"
                  name="confirmPassword"
                  fontSize={20}
                />
                <InputRightElement w="4rem" mt="1.5">
                  <Button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <IoMdEye color="#8295AA" size={22} />
                    ) : (
                      <IoMdEyeOff color="#8295AA" size={22} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <Text color="red.500" mt="2">
                    {formik.errors.confirmPassword}
                  </Text>
                )}
            </FormControl>
            <FormControl
              isInvalid={
                !!formik.errors.termsAndConditions &&
                formik.touched.termsAndConditions
              }
            >
              <Checkbox
                color="#222222"
                fontWeight={500}
                borderColor="#2E353F"
                size="lg"
                name="termsAndConditions"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isChecked={formik.values.termsAndConditions}
              >
                I agree with terms and conditions
              </Checkbox>
              {formik.errors.termsAndConditions &&
                formik.touched.termsAndConditions && (
                  <Text color="red.500" mt="2">
                    {formik.errors.termsAndConditions}
                  </Text>
                )}
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
              >
                {loading ? <Spinner /> : 'Continue'}
              </Button>
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
