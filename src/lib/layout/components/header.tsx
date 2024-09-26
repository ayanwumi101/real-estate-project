import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { HiBars3BottomRight } from 'react-icons/hi2';

export const Header = () => {
  const pathname = usePathname();
  return (
    <Fragment>
      {pathname === '/signin' || pathname === '/signup' ? null : (
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
                <Link href="/discover">
                  <Text>Discover</Text>
                </Link>
                <Text>How it works</Text>
                <Link href="/signin">
                  <Text>Sign in</Text>
                </Link>
                <Link href="/signup">
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
                </Link>
              </Flex>
            </Box>
            <Box display={['block', 'none']}>
              <Flex alignItems="center" gap="10px">
                <Link href="/signin">
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
                </Link>
                <HiBars3BottomRight size={30} />
              </Flex>
            </Box>
          </Flex>
        </Box>
      )}
    </Fragment>
  );
};
