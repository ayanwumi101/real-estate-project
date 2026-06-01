import { Heading, Text, Button, Box, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <Box maxW="850px" mx="auto" px={['16px', 0]}>
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing="16px"
        textAlign="center"
      >
        <Heading fontSize={[30,40]} letterSpacing="1.5px">
          Secure Your Property Investment Before You Commit
        </Heading>
        <Text fontWeight={500}>
          Get professional property verification and real estate intelligence
          services designed to help you make informed investment decisions with
          confidence.
        </Text>
        <Link href="/services/request">
          <Button bg="brand.100" color="bg.200" fontSize={15}>
            Request a Service
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default Hero;
