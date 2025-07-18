import {
  Box,
  Stack,
  Flex,
  Text,
  Button,
  Image,
  Icon,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { SideBarItem } from './UserSidebar';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BrowseProjectIcon,
  DashboardIcon,
  MyAssetsIcon,
  MyPortfolioIcon,
  TransactionsIcon,
  HelpAndSupportIcon,
  SettingsIcon,
  LogoutIcon,
} from '~/lib/components/Icons/Icons';
import { motion } from 'framer-motion';
import { VscClose } from 'react-icons/vsc';

const RealtorMobileSidebar = ({
  setOpenSideNav,
}: {
  setOpenSideNav: (value: boolean) => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();

  const LogoutUser = () => {
    router.push('/signin');
    Cookies.remove('vestier-token');
    Cookies.remove('vestier-user');
    toast({
      title: 'Logout Successful',
      description: 'You have been logged out successfully!',
      duration: 3000,
      position: 'top-right',
      isClosable: true,
      status: 'success',
    });
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
        zIndex: '12',
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
            <Box onClick={() => router.push('/')} w="130px">
              <Image src="/assets/images/logo3.png" />
            </Box>
            <Button
              bg="none"
              p="0"
              w="30px"
              h="38px"
              _hover={{ bg: 'none', p: 0 }}
              onClick={() => setOpenSideNav(false)}
              border="1px solid gray"
              borderRadius="50%"
            >
              <Icon as={VscClose} color="gray.500" fontSize={24} />
            </Button>
          </Flex>
        </Box>
        <Stack spacing="16px">
          <SideBarItem
            label="Dashboard"
            Icon={DashboardIcon}
            isActive={pathname === '/user/dashboard'}
            href="/user/dashboard"
            onClick={() => setOpenSideNav(false)}
          />
          <SideBarItem
            label="My Assets"
            Icon={MyAssetsIcon}
            isActive={pathname === '/user/my-assets'}
            href="/user/my-assets"
            onClick={() => setOpenSideNav(false)}
          />
          {/* <SideBarItem
            label="Browse Project"
            Icon={BrowseProjectIcon}
            isActive={pathname === '/user/projects'}
            href="/user/projects"
            onClick={() => setOpenSideNav(false)}
          /> */}
          <SideBarItem
            label="Remittance"
            Icon={MyPortfolioIcon}
            isActive={pathname === '/user/portfolio'}
            href="/user/portfolio"
            onClick={() => setOpenSideNav(false)}
          />
          {/* <SideBarItem
            label="Transactions"
            Icon={TransactionsIcon}
            isActive={pathname === '/user/transactions'}
            href="/user/transactions"
            onClick={() => setOpenSideNav(false)}
          />
          <SideBarItem
            label="Help and Support"
            Icon={HelpAndSupportIcon}
            isActive={pathname === '/user/support'}
            href="/user/support"
            onClick={() => setOpenSideNav(false)}
          /> */}
          <SideBarItem
            label="Settings"
            Icon={SettingsIcon}
            isActive={pathname === '/user/settings'}
            href="/user/settings"
            onClick={() => setOpenSideNav(false)}
          />
          <Box py="10px" w="100%" px="34" onClick={LogoutUser} cursor="pointer">
            <Flex alignItems="center" gap="15px">
              <LogoutIcon isActive={false} />
              <Text color="#2E353F" fontWeight={500}>
                Log Out
              </Text>
            </Flex>
          </Box>
        </Stack>
      </motion.div>
    </motion.div>
  );
};

export default RealtorMobileSidebar;
