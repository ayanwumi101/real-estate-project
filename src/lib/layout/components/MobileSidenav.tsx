import { Flex, Box, Button, Text, VStack, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { VscClose } from 'react-icons/vsc';
import { scrollToSection } from '~/lib/utils/scrollToSection';
import useNavigate from '~/lib/utils/useNavigate';


const MobileSidenav = ({
  setOpenSideNav,
}: {
  setOpenSideNav: (value: boolean) => void;
  }) => {
  const navigate = useNavigate();
  const router = useRouter();
  const links = [
    {
      name: 'Help Center',
      link: 'contact-us',
    },
    {
      name: 'Services',
      link: 'services',
    },
    {
      name: 'About Us',
      link: 'about-us',
    },
    {
      name: 'How it works',
      link: '/',
    },
  ];
  const handleClick = (link: string) => {
    navigate(link);
    setOpenSideNav(false);
  };
  return (
    <motion.div
      style={{
        backgroundColor: 'rgba(0, 36, 71, 0.5)',
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: '0',
        left: '0',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
        zIndex: '10',
      }}
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'tween', duration: 0.2 }}
    >
      <motion.div
        style={{
          backgroundColor: '#fff',
          position: 'absolute',
          top: '0',
          right: '0',
          height: '100%',
          zIndex: '3',
          width: '80%',
          left: '0',
          padding: '30px 30px',
        }}
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.4 }}
      >
        <Box mb="10">
          <Flex alignItems="center" justifyContent="space-between">
            <Box onClick={() => handleClick('/')}>
              <Image
                w="110px"
                h="auto"
                objectFit="cover"
                src="/assets/images/logo3.png"
                cursor="pointer"
              />
            </Box>
            <Button
              bg="none"
              p="2"
              w="40px"
              h="40px"
              _hover={{ bg: 'none', p: 0 }}
              onClick={() => setOpenSideNav(false)}
              border="1px solid gray"
              borderRadius="50%"
            >
              <VscClose color="black" fontSize={20} />
            </Button>
          </Flex>
        </Box>

        <Flex flexDir="column">
          <VStack alignItems="flex-start" color="#4B4B4B" spacing={0}>
            {links.map((link) => (
              <Box
                onClick={() => {
                  if (link.link === 'how-it-works') {
                    setOpenSideNav(false);
                    navigate('/');
                    scrollToSection('howItWorks');
                  } else {
                    navigate(link.link);
                    setOpenSideNav(false);
                  }
                }}
                key={link.name}
                borderBottom="1px solid #E4E4E4"
                w="full"
                textAlign="left"
                py="16px"
                px="12px"
              >
                <Text
                  onClick={() => setOpenSideNav(false)}
                  fontSize={16}
                  cursor="pointer"
                  fontWeight={500}
                >
                  {link.name}
                </Text>
              </Box>
            ))}
            <Box
              borderBottom="1px solid #E4E4E4"
              w="full"
              textAlign="left"
              py="16px"
            >
              {' '}
              <Button
                fontWeight={500}
                bg="brand.100"
                color="white"
                borderRadius="49px"
                py="8px"
                px="20px"
                onClick={() => {
                  navigate('/signup');
                  setOpenSideNav(false);
                }}
                w="127px"
              >
                Get Started
              </Button>
            </Box>
            <Box
              borderBottom="1px solid #E4E4E4"
              w="full"
              textAlign="left"
              py="16px"
            >
              {' '}
              <Button
                fontWeight={500}
                variant="outline"
                color="brand.100"
                border="1px solid"
                borderColor="brand.100"
                borderRadius="49px"
                py="8px"
                px="20px"
                onClick={() => {
                  navigate('/signin');
                  setOpenSideNav(false);
                }}
                w="127px"
                _hover={{ bg: 'none' }}
              >
                Sign in
              </Button>
            </Box>
          </VStack>
        </Flex>
      </motion.div>
    </motion.div>
  );
};

export default MobileSidenav;
