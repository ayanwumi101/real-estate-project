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
        h='80px'
        mx="auto"
        bg="bg.100"
        borderRadius="50px"
        px={['14px', '24px']}
        py="10px"
        color="#222222"
        boxShadow="sm"
        fontWeight={600}
        display='flex'
        justifyContent="center"
        zIndex={5}
        position='sticky'
        top={['20px', '36px']}
        backdropFilter="blur(8px)"
        transition="all 0.3s ease-in-out"
      >
        <Flex alignItems="center" justifyContent="space-between" w='100%'>
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
                Help Center
              </Text>
              <Link href="/discover">
                <Text>About Us</Text>
              </Link>
              <Text
                cursor="pointer"
                onClick={() => scrollToSection('howItWorks')}
              >
                How it works
              </Text>
              <Link href="/signin">
                <Button _hover={{bg: 'none'}} variant='outline' border='1px solid' color='brand.100' borderColor='brand.100' px='20px'>Sign in</Button>
              </Link>
              <Link href="/signup">
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
            </Flex>
          </Box>
          <Box display={['block', 'none']}>
            <Flex alignItems="center" gap="10px">
              <Link href="/signin">
                <Button
                  bg='brand.100'
                  _hover={{bg: 'brand.100'}}
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
