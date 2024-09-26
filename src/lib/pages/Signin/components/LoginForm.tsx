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
        <Heading fontSize={32} fontWeight={500} color="#222222">
          Welcome Back
        </Heading>
      </Box>
      <Box mb="32px">
        <HStack
          alignItems="center"
          gap={['17px', 0]}
          flexWrap={["wrap", 'nowrap']}
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
        <Stack spacing="32px">
          <FormControl>
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
            />
          </FormControl>
          <FormControl>
            <FormLabel mb="10px" color="#222222" fontWeight={600}>
              Password*
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
          <Text fontWeight={600} color="#FFAE42">
            Forgot Password?
          </Text>
          <Box w="100%">
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
            <Text color="#131339" fontWeight={500}>
              Dont Have and Account?{' '}
              <Box as="span" color="#FFAE42" fontWeight={700}>
                <Link href='/signup'>Sign up</Link>
              </Box>
            </Text>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default LoginForm