import { Box, Image, Heading, Text, Stack, Flex, Button } from '@chakra-ui/react'
import Link from 'next/link';
import React from 'react'


const index = () => {
  return (
    <Box px={['24px', 0]} py="60px">
      <Stack
        spacing="32px"
        justifyContent="center"
        textAlign="center"
        maxW="530px"
        mx="auto"
      >
        <Link href='/'>
          <Image src="" alt="Logo" mx="auto" display='block' w='50px' />
        </Link>
        <Image src="/assets/svgs/success-image.svg" w="119px" mx="auto" />
        <Heading fontWeight={500} fontSize={32} color="#222222">
          Congratulations User’s name, your account is active.
        </Heading>
        <Text color="#2E353F" fontWeight={500}>
          Welcome aboard! Begin your investment journey with (Company name) and
          unlock exclusive real estate opportunities. Finish setting up your
          profile to get started.
        </Text>
        <Flex gap="16px" flexWrap={['wrap', 'nowrap']}>
          <Button
            w="100%"
            mb="10px"
            bg="#000080"
            color="white"
            h="55px"
            borderRadius="50px"
          >
            Complete profile setup
          </Button>
          <Button
            w="100%"
            mb="10px"
            bg="#EDEDFF"
            color="#000080"
            h="55px"
            borderRadius="50px"
          >
            Proceed to dashboard
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}

export default index