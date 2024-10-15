'use client';

import { Box, Stack } from '@chakra-ui/react';
import { useEffect, useLayoutEffect, useState, type ReactNode } from 'react';

import { Footer } from './components/footer';
import { Header } from './components/header';
import '../styles/globals.css';
import DashboardSidebar from './components/DashboardSidebar';
import { usePathname } from 'next/navigation';
import DashboardHeader from './components/DashboardHeader';


type LayoutProps = {
  children: ReactNode;
};


export const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <Box w='100%' mx='auto' position="relative" bg="rgba(100, 100, 100, 0.1)">
      <Stack direction="row" w='100%' mx='auto' justifyContent='center'>
        <Box w='20%' position='fixed' left='0' top='0' h='100vh' overflow='hidden'>
          <DashboardSidebar />
        </Box>
        <Box position="absolute" left="20%" w="80%">
          <Stack direction="column" spacing="22px">
            <DashboardHeader />
            <Box as="main" w="100%">
              {children}
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};


export const HomeLayout = ({ children }: LayoutProps) => {
  return (
    <Box>
      <Header />
      <Box as="main">{children}</Box>
      <Footer />
    </Box>
  );
};


export const Layout = ({ children }: LayoutProps) => {

  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(pathname.includes('/user'));
  }, [pathname]);

  useLayoutEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);
  
  return (
    <Box maxWidth="1440px" mx="auto">
      {isLoggedIn ? (
        <DashboardLayout>{children}</DashboardLayout>
      ) : (
        <HomeLayout>{children}</HomeLayout>
      )}
    </Box>
  );
};
