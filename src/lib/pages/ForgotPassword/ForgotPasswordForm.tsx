'use client'
import { Box, Input, Button, Text, Heading, FormLabel, FormControl, Image, Flex, HStack, Icon, Stack, InputGroup, InputRightElement } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'


const ForgotPasswordForm = () => {
    return (
      <Box px={['24px', '44px']} py="60px" h={['auto',"100vh"]}>
        <Box mb="40px">
          <Link href="/">
            <Image src="" alt="Company Logo" mb="16px" />
          </Link>
          <Heading fontSize={32} fontWeight={500} mb="16px" color="#222222">
            Forgot Password
          </Heading>
          <Text fontSize={18} color="#2E353F" fontWeight={500}>
            Enter your email and a token will be sent to your registered email
            address
          </Text>
        </Box>
        <Box>
          <Stack spacing="20px">
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
}

export default ForgotPasswordForm