import { Heading, Text, Box, Stack, Image } from '@chakra-ui/react';
import React from 'react';

interface NotFoundProps {
  title?: string;
  description?: string;
}

const NotFound = ({ title, description }: NotFoundProps) => {
  return (
    <Box maxW="450px" mx="auto" my='8'>
      <Stack spacing="12px" alignItems="center" textAlign="center">
        <Image
          src="/assets/images/not-found.png"
          w="135px"
          h="140px"
          objectFit="cover"
        />
        <Heading fontSize={18} color="#2E353F">
          {title || 'No matching properties'}
        </Heading>
        <Text color="#2E353F" fontWeight={500}>
          {description ||
            'Check your spelling or try a different search term to find yourproperty.'}
        </Text>
      </Stack>
    </Box>
  );
};

export default NotFound;
