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
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
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
        <Heading fontSize={[25,30]} fontWeight={500} mb="16px" color="#222222">
          Create New Password
        </Heading>
        <Text fontSize={18} color="#2E353F">
          Enter your email and a token will be sent to your registered <br />{' '}
          email address
        </Text>
      </Box>
      <Box>
        <Stack spacing="20px">
          <FormControl>
            <FormLabel mb="10px" color="#222222" fontWeight={600}>
              New Password*
            </FormLabel>
            <InputGroup w="100%">
              <Input
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
          </FormControl>
          <FormControl>
            <FormLabel mb="10px" color="#222222" fontWeight={600}>
              Confirm password*
            </FormLabel>
            <InputGroup w="100%">
              <Input
                pr="12"
                py="12px"
                border="1px solid #C0C0C0"
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm your new password"
                borderRadius="50px"
                bg="#FBFBFB"
                color="#8295AA"
                _placeholder={{ color: '#8295AA' }}
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
          </FormControl>
          <Box w="100%">
            <Link href="/signup/verify-otp">
              <Button
                w="100%"
                mb="10px"
                bg="#000080"
                color="white"
                h="55px"
                borderRadius="50px"
              >
                Continue
              </Button>
            </Link>
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
  );
};

export default ResetPassword;
