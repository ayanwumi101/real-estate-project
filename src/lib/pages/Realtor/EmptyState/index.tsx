import { Box, Stack, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { RealtorEmptyStateIcon } from '~/lib/components/Icons/Icons';

interface Props {
  title: string;
  description?: string;
}

const EmptyState = ({ title, description }: Props) => {
  return (
    <Box maxW="470px" mx="auto">
      <Stack spacing="12px" textAlign="center" alignItems="center">
        <RealtorEmptyStateIcon />
        <Heading as="h2" fontSize={18} fontWeight={700} color="brand.300">
          {title}
        </Heading>
        {description && (
          <Text fontSize={15} color="brand.300" textAlign="center">
            {description}
          </Text>
        )}
      </Stack>
    </Box>
  );
};

export default EmptyState;
