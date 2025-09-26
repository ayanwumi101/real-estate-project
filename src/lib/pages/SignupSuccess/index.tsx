'use client';

import {
  Box,
  Image,
  Heading,
  Text,
  Stack,
  Flex,
  Button,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

const index = () => {
  const router = useRouter();
  const rawToken = Cookie.get('vestier-new-token');
  const rawUser = Cookie.get('vestier-user');
  const token = rawToken ? JSON.parse(rawToken) : null;
  const user = rawUser ? JSON.parse(rawUser) : null;

  return (
    <Box px={['24px', 0]} py="60px">
      <Stack
        spacing="32px"
        justifyContent="center"
        textAlign="center"
        maxW="530px"
        mx="auto"
      >
        <Link href="/">
          <Image
            src="/assets/images/logo3.png"
            w="50%"
            h="auto"
            objectFit="contain"
            display="block"
            mx="auto"
          />
        </Link>
        <Image src="/assets/svgs/success-image.svg" w="80px" mx="auto" />
        <Heading fontWeight={500} fontSize={32} color="#222222">
          Congratulations {user?.fullname}, your account is now active.
        </Heading>
        <Text color="#2E353F" fontWeight={500}>
          Welcome aboard! Begin your investment journey with Vestier and unlock
          exclusive real estate opportunities. Finish setting up your profile to
          get started.
        </Text>
        <Flex gap="16px" flexWrap={['wrap', 'nowrap']}>
          {user?.role === 'investor' && (
            <Button
              w="100%"
              mb="10px"
              bg="#000080"
              _hover={{ bg: '#000080' }}
              color="white"
              h="55px"
              borderRadius="50px"
              onClick={() => {
                Cookie.set('vestier-token', JSON.stringify(token));
                Cookie.remove('vestier-new-token');
                router.push('/user/dashboard');
              }}
            >
              Complete profile setup
            </Button>
          )}
          <Button
            w="100%"
            mb="10px"
            bg="brand.100"
            color="white"
            _hover={{ bg: '#000080' }}
            h="55px"
            borderRadius="50px"
            onClick={() => {
              Cookie.set('vestier-token', JSON.stringify(token));
              Cookie.remove('vestier-new-token');
              if (user?.role === 'realtor') {
                router.push('/realtor/properties');
                return;
              } else {
                router.push('/user/dashboard');
                return;
              }
            }}
          >
            Proceed to dashboard
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default index;
