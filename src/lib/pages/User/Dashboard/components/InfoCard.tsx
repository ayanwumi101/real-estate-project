import { Box, Heading, Text, Flex, Stack } from '@chakra-ui/react';
import React from 'react';

interface InfoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const InfoCard = ({ icon, title, description }: InfoCardProps) => {
  return (
    <Box
      w="257px"
      h="78px"
      py="16px"
      px="10px"
      border="1px solid"
      borderColor="brand.900"
      rounded="5px"
    >
      <Flex alignItems="center" gap="12px" h="100%">
        <Box as="span">{icon}</Box>
        <Stack justifyContent="space-between" h="100%">
          <Heading fontSize={14} fontWeight={700}>
            {title}
          </Heading>
          <Text fontSize={12} fontWeight={500} color="brand.300">
            {description}
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
};

export default InfoCard;
