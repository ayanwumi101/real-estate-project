import { Flex, Box, Button, Text, VStack, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { VscClose } from 'react-icons/vsc';
// import { useRouter } from 'nextjs-toploader/dist/app';


const MobileSidenav = ({
  setOpenSideNav,
}: {
  setOpenSideNav: (value: boolean) => void;
}) => {
  const router = useRouter();
  const links = [
    {
        name: 'Features',
        link: 'discover',
    },
    {
      name: 'About Us',
      link: 'discover',
    },
    {
      name: 'Discover',
      link: 'discover',
    },
    {
      name: 'How it works',
      link: 'discover',
    },
  ];
  const handleClick = (link: string) => {
    router.push(link);
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
        zIndex: '2',
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
          <VStack color="black" spacing="20px">
            {links.map((link) => (
              <Button bg='none' p='0' _hover={{bg: 'none', p: 0}} onClick={() => handleClick(`/${link.link}`)} key={link.name}>
                <Text
                  onClick={() => setOpenSideNav(false)}
                  fontSize={16}
                  cursor="pointer"
                  fontWeight={500}
                >
                  {link.name}
                </Text>
              </Button>
            ))}
            <Button
              fontWeight={500}
              bg='#4040A0'
              color="white"
              borderRadius="49px"
              py="8px"
              px="20px"
              onClick={() => handleClick('/signin')}
              minW='150px'
            >
              Sign in
            </Button>
          </VStack>
        </Flex>
      </motion.div>
    </motion.div>
  );
};

export default MobileSidenav;
