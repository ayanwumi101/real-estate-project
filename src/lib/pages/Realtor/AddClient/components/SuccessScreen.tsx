import { Box, Button, Heading, Text, Flex, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { AddClientSuccessIcon } from '~/lib/components/Icons/Icons';

const SuccessScreen = () => {
  return (
    <Box
      h="80vh"
      w="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        spacing="16px"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        maxW="500px"
        mx="auto"
      >
        <AddClientSuccessIcon />
        <Heading color="brand.100" fontSize={24}>
          New client has been added to your list!
        </Heading>
        <Text fontWeight={500} color="brand.300">
          You’re all set! This client is now in your list time to link them to a
          property or manage their profile.
        </Text>
        <Flex alignItems="center" gap="20px">
          <Link href="/realtor/clients">
            <Button
              color="brand.200"
              bg="brand.100"
              fontWeight={700}
              fontSize={15}
              minW={'170px'}
            >
              View Clients
            </Button>
          </Link>
          <Link href="/realtor/clients">
            <Button
              bg="bg.200"
              color="brand.100"
              fontWeight={700}
              fontSize={15}
              minW={'170px'}
            >
              Assign Property
            </Button>
          </Link>
        </Flex>
      </Stack>
    </Box>
  );
};

export default SuccessScreen;
