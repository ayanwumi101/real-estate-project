'use client'

import { Box, Input, Button, Text, Heading, FormLabel, FormControl, Image, Flex, HStack, Icon, Stack, InputGroup, InputRightElement } from '@chakra-ui/react'
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
          OTP verification
        </Heading>
        <Text fontSize={18} color="#2E353F" fontWeight={500}>
          Enter the 6 digit code sent to your email address to verify your
          account
        </Text>
      </Box>
      <Box>
        <Stack spacing="32px">
          <FormControl>
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
            />
          </FormControl>
          <Box w="100%">
            <Link href='/signup/signup-success'>
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
              Didn't get a mail?{' '}
              <Box as="span" color="#FFAE42" fontWeight={700}>
                <Link href="/signup">Resend code</Link>
              </Box>
            </Text>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default LoginForm