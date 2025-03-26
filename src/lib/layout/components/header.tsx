import { Box, Flex, Image, Text, Button, useMediaQuery } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useState } from 'react';
import { HiBars3BottomRight } from 'react-icons/hi2';
import MobileSidenav from './MobileSidenav';
import { scrollToSection } from '~/lib/utils/scrollToSection';



export const Header = () => {
  const pathname = usePathname();
  const [isMobile] = useMediaQuery('(min-width: 768px)');
  const[ openSideNav, setOpenSideNav] = useState(false);

  const hiddenRoutes = [
    '/signin',
    '/signup',
    '/forgot-password',
    '/reset-password',
  ];

  if (
    hiddenRoutes.some((route) => pathname === route || pathname.includes(route))
  ) {
    return null;
  }


  return (
    <Fragment>
      <Box
        as="header"
        maxW={['95%', '1300px']}
        mx="auto"
        backgroundColor="#F5F5F5"
        borderRadius="50px"
        px={['14px', '24px']}
        mt={['20px', '36px']}
        py="10px"
        color="#222222"
        boxShadow="sm"
        fontWeight={700}
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Link href="/">
            <Image
              src="/assets/svgs/vestier-blue-logo.svg"
              display="block"
              mx="auto"
              w={['120px', '100%']}
              h={['auto', '50px']}
              objectFit={['contain', 'cover']}
            />
          </Link>
          <Box display={['none', 'block']}>
            <Flex alignItems="center" gap="32px">
              <Text
                cursor="pointer"
                onClick={() => scrollToSection('features')}
              >
                Features
              </Text>
              <Text>About Us</Text>
              <Link href="/discover">
                <Text>Discover</Text>
              </Link>
              <Text
                cursor="pointer"
                onClick={() => scrollToSection('howItWorks')}
              >
                How it works
              </Text>
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
              <Button onClick={() => setOpenSideNav(true)}>
                <HiBars3BottomRight size={30} />
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
      {openSideNav && <MobileSidenav setOpenSideNav={setOpenSideNav} />}
    </Fragment>
  );
};
