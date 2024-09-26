'use client';

import { Box } from '@chakra-ui/react';
import { useLayoutEffect, type ReactNode } from 'react';

import { Footer } from './components/footer';
import { Header } from './components/header';
import '../styles/globals.css';


type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  useLayoutEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);
  
  return (
    <Box maxWidth="1440px" mx='auto'>
      <Box>
        <Header />
        <Box as="main">
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};
