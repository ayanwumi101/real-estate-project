import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';
import { HiBars3BottomRight } from 'react-icons/hi2';

export const Header = () => {
  return (
    <Box
      as="header"
      maxW={['95%', '1300px']}
      mx="auto"
      backgroundColor="#F5F5F5"
      borderRadius="50px"
      px="24px"
      mt="36px"
      py="16px"
      color="#222222"
      boxShadow="sm"
      fontWeight={700}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Image alt="Logo" />
        </Box>
        <Box display={['none', 'block']}>
          <Flex alignItems="center" gap="32px">
            <Text>Features</Text>
            <Text>About Us</Text>
            <Text>Our Projects</Text>
            <Text>How it works</Text>
            <Text>Sign in</Text>
            <Button
              bg="#4040A0"
              color="white"
              py="8px"
              px="20px"
              borderRadius="50px"
              fontWeight={700}
            >
              Get Started
            </Button>
          </Flex>
        </Box>
        <Box display={['block', 'none']}>
          <Flex alignItems="center" gap="10px">
            <Button
              bg="#4040A0"
              color="white"
              py="8px"
              px="20px"
              borderRadius="50px"
              fontWeight={600}
            >
              Get Started
            </Button>
            <HiBars3BottomRight size={30} />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
