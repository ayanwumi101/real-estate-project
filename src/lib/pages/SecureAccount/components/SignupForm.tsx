'use client'

import { Box, Input, Button, Text, Heading, FormLabel, FormControl, Image, Flex, HStack, Icon, Stack, InputGroup, InputRightElement, Checkbox, InputLeftAddon} from '@chakra-ui/react'
import React, { useState } from 'react'
import { GoogleIcon, AppleIcon, MicrosoftIcon } from '~/lib/components/Icons/Icons'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import Link from 'next/link';




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
    const [showPassword, setShowPassword] = useState<boolean>(false)
  return (
    <Box px={['24px', '44px']} py="60px">
      <Box mb="40px">
        <Link href="/">
          <Image src="" alt="Company Logo" mb="16px" />
        </Link>
        <Heading fontSize={32} fontWeight={500} mb="16px" color="#222222">
          Secure your account
        </Heading>
        <Text fontSize={18} color="#2E353F">
          Enter your phone number, create a password, choose your nationality
          and enter referral code if any.
        </Text>
      </Box>
      <Box>
        <Stack spacing="32px">
          <FormControl>
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
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel mb="10px" color="#222222" fontWeight={600}>
              Create your password*
            </FormLabel>
            <InputGroup w="100%">
              <Input
                pr="12"
                py="12px"
                border="1px solid #C0C0C0"
                type={showPassword ? 'text' : 'password'}
                placeholder="*********"
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
              Already Have an Account?{' '}
              <Box as="span" color="#FFAE42" fontWeight={700}>
                <Link href="/signin">Sign in</Link>
              </Box>
            </Text>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default LoginForm