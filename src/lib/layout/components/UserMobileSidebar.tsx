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
import React, { useContext } from 'react';
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
  CloseIcon,
  MobileNotificationsIcon,
} from '~/lib/components/Icons/Icons';
import { motion } from 'framer-motion';
import { AppContext } from '..';
import useNavigate from '~/lib/utils/useNavigate';

export const SideBarItem = ({
  label,
  href,
  isActive,
  Icon,
  onClick,
}: {
  label: string;
  href: string;
  isActive: boolean;
  Icon: any;
  onClick?: () => void;
}) => {
  return (
    <Box
      py="10px"
      w="100%"
      px="20px"
      bg={isActive ? '#EDEDFF' : 'none'}
      onClick={onClick}
    >
      <Link href={href}>
        <Flex alignItems="center" gap="15px">
          <Icon isActive={isActive} />
          <Text color={isActive ? '#4040A0' : '#2E353F'} fontWeight={500}>
            {label}
          </Text>
        </Flex>
      </Link>
    </Box>
  );
};

const DashboardMobileSidebar = ({
  setOpenSideNav,
}: {
  setOpenSideNav: (value: boolean) => void;
}) => {
  const navigate = useNavigate();
  const { notifications } = useContext(AppContext);
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();

  const LogoutUser = () => {
    router.push('/signin');
    Cookies.remove('vestier-token');
    Cookies.remove('vestier-user');
    Cookies.remove('vestier-user-role');
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
      onClick={(e) => {
        e.stopPropagation();
        setOpenSideNav(false);
      }}
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
          padding: '20px 0px',
        }}
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.4 }}
        onClick={(e) => {
          e.stopPropagation();
          // setOpenSideNav(false);
        }}
      >
        <Box
          mb="10"
          borderBottom="1px solid"
          borderColor="border.100"
          pb="18px"
        >
          <Flex alignItems="center" justifyContent="space-between" px="10px">
            <Box onClick={() => router.push('/')} w="110px">
              <Image src="/assets/images/logo3.png" />
            </Box>
            <Flex alignItems="center" gap="12px">
              <Box
                position="relative"
                onClick={() => {
                  setOpenSideNav(false);
                  navigate('/user/notifications');
                }}
              >
                <Box
                  pos="absolute"
                  top="-5px"
                  right="-3px"
                  rounded="full"
                  w="18px"
                  h="18px"
                  bg="color.200"
                  color="brand.200"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize={12}
                  fontWeight={600}
                >
                  {
                    notifications?.filter(
                      (notification: any) => !notification.read
                    )?.length
                  }
                </Box>
                <MobileNotificationsIcon />
              </Box>

              <Box w="1px" h="25px" bg="#C0C0C0"></Box>
              <Box
                onClick={() => setOpenSideNav(false)}
                // border="1px solid gray"
                // borderRadius="50%"
                style={{
                  width: 28,
                  height: 28,
                  padding: 0,
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CloseIcon />
              </Box>
            </Flex>
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
          <Box
            py="10px"
            w="100%"
            px="20px"
            onClick={LogoutUser}
            cursor="pointer"
          >
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

export default DashboardMobileSidebar;
