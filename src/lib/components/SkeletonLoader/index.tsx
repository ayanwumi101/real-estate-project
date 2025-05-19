import React from 'react';
import { Box, Stack, Skeleton } from '@chakra-ui/react';

const SkeletonLoader = () => {
  return (
    <Box>
      <Stack spacing="12px">
        <Skeleton height="50px" rounded='5px' />
        <Skeleton height="50px" rounded='5px' />
        <Skeleton height="50px" rounded='5px' />
        <Skeleton height="50px" rounded='5px' />
        <Skeleton height="50px" rounded='5px' />
      </Stack>
    </Box>
  );
};

export default SkeletonLoader;
