import { Box, Image, Heading, Text, Stack } from '@chakra-ui/react'
import React from 'react'


const SideImage = () => {
  return (
    <Box
      w="100%"
      p="60px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="#F5F5F5"
      h="100%"
    >
      <Box maxW="700px" mx="auto">
        <Stack spacing="24px" textAlign="center">
          <Image
            src="/assets/svgs/login-house.svg"
            w="370px"
            h="410px"
            objectFit="cover"
            mx="auto"
          />
          <Heading color="#222222" fontSize={32} fontWeight={500}>
            Smart Real Estate Investments Made Easy
          </Heading>
          <Text fontWeight={500} color="#8295AA">
            Discover exclusive opportunities to build your portfolio with full
            or fractional ownership. Invest and grow your wealth effortlessly.
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}

export default SideImage