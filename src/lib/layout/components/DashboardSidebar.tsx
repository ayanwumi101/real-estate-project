import { Box, Flex, Text, Stack, useToast, Image } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
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


export const SideBarItem = ({
  label,
  href,
  isActive,
  Icon,
  onClick
}: {
  label: string;
  href: string;
  isActive: boolean;
  Icon: any;
  onClick?: () => void;
}) => {
  return (
    <Box py="10px" w="100%" px="34" bg={isActive ? '#EDEDFF' : 'none'} onClick={onClick}>
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



const DashboardSidebar = () => {
  const pathname = usePathname();
   const router = useRouter();
   const toast = useToast();

  const LogoutUser = () => {
    router.push('/signin');
    Cookies.remove('token');
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
    <Box as="nav" color="black" bg="#FBFBFB" pl="16px" w="100%" h="100vh">
      <Box
        borderX="1px solid #E4E4E4"
        w="100%"
        h="100%"
        borderBottom="1px solid #E4E4E4"
      >
        <Box
          textAlign="center"
          w="100%"
          h="96px"
          borderBottom="1px solid #E4E4E4"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image src='/assets/images/logo.png' display='block' mx='auto' w='80%' objectFit='cover' />
        </Box>
        <Box py="24px">
          <Stack spacing="16px">
            <SideBarItem
              label="Dashboard"
              Icon={DashboardIcon}
              isActive={pathname === '/user/dashboard'}
              href="/user/dashboard"
            />
            <SideBarItem
              label="My Assets"
              Icon={MyAssetsIcon}
              isActive={pathname === '/user/my-assets'}
              href="/user/my-assets"
            />
            <SideBarItem
              label="Browse Project"
              Icon={BrowseProjectIcon}
              isActive={pathname === '/user/projects'}
              href="/user/projects"
            />
            <SideBarItem
              label="My Portfolio"
              Icon={MyPortfolioIcon}
              isActive={pathname === '/user/portfolio'}
              href="/user/portfolio"
            />
            <SideBarItem
              label="Transactions"
              Icon={TransactionsIcon}
              isActive={pathname === '/user/transactions'}
              href="/user/transactions"
            />
            <SideBarItem
              label="Help and Support"
              Icon={HelpAndSupportIcon}
              isActive={pathname === '/user/support'}
              href="/user/support"
            />
            <SideBarItem
              label="Settings"
              Icon={SettingsIcon}
              isActive={pathname === '/user/settings'}
              href="/user/settings"
            />
            <Box py="10px" w="100%" px="34" onClick={LogoutUser} cursor='pointer'>
              <Flex alignItems="center" gap="15px">
                <LogoutIcon isActive={false} />
                <Text color="#2E353F" fontWeight={500}>
                  Log Out
                </Text>
              </Flex>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardSidebar;
