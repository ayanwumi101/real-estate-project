import { Box, Flex, Stack, Heading, Text, Button } from '@chakra-ui/react';
import React from 'react';
import { InvestIcon, LocationIcon } from '~/lib/components/Icons/Icons';


interface Headerprops {
  propertyName: string;
  location: string;
}

const Header = ({propertyName, location}:Headerprops) => {
  return (
    <Box py="30px" px={['20px', '40px']} borderY="1px solid #E4E4E4">
      <Flex
        alignItems="flex-start"
        justifyContent="space-between"
        gap={['20px', 0]}
        flexWrap={['wrap', 'wrap', 'nowrap']}
      >
        <Box>
          <Stack spacing="10px">
            <Heading fontSize={[20, 24]} fontWeight={500} color="#222222">
              {propertyName || ''}
            </Heading>
            <Flex alignItems="center" gap="10px">
              <LocationIcon />
              <Text color="#2E353F" fontWeight={500}>
                {location || ''}
                {/* Plot 10, Adewunmi Layout, Iju Ishaga, Lagos */}
              </Text>
            </Flex>
          </Stack>
        </Box>
        <Button
          bg="#000080"
          _hover={{ bg: '#000080' }}
          color="#ffffff"
          fontWeight={500}
          fontSize={15}
        >
          <Flex alignItems="center" gap="8px">
            <Text>Liquidate property</Text>
            <InvestIcon />
          </Flex>
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
