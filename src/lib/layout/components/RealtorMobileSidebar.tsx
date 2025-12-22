import {
  Box,
  Stack,
  Flex,
  Text,
  Button,
  Image,
  Icon,
  useToast,
  useDisclosure,
  Collapse,
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
  ManagedAssetsIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  RealtorClientsIcon,
  RealtorSecuritiesIcon,
  RealtorTeamsIcon,
  RealtorTransactionsIcon,
} from '~/lib/components/Icons/Icons';
import { motion } from 'framer-motion';
import { VscClose } from 'react-icons/vsc';

const CollapsibleSidebarItem = ({
  label,
  href,
  isActive,
  onClick,
}: {
  label: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
}) => {
  return (
    <Box
      py="10px"
      w="full"
      px="70px"
      bg={isActive ? '#EDEDFF' : 'none'}
      onClick={onClick}
    >
      <Link href={href}>
        <Text color={isActive ? '#4040A0' : '#2E353F'} fontWeight={500}>
          {label}
        </Text>
      </Link>
    </Box>
  );
};

const RealtorMobileSidebar = ({
  setOpenSideNav,
}: {
  setOpenSideNav: (value: boolean) => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();

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
            label="Properties"
            Icon={DashboardIcon}
            isActive={pathname === '/realtor/properties'}
            href="/realtor/properties"
            onClick={() => setOpenSideNav(false)}
          />
          {/* <Button
            onClick={onToggle}
            rounded="0px"
            py="10px"
            w="100%"
            px="34"
            justifyContent="flex-start"
            leftIcon={
              <ManagedAssetsIcon
                isActive={pathname.includes('/realtor/managed-assets')}
              />
            }
            fontWeight={500}
            fontSize={15}
            bg="none"
            color={
              pathname.includes('/realtor/managed-assets')
                ? '#4040A0'
                : '#2E353F'
            }
            rightIcon={
              isOpen ? (
                <ChevronUpIcon
                  isActive={pathname.includes('/realtor/managed-assets')}
                />
              ) : (
                <ChevronDownIcon
                  isActive={pathname.includes('/realtor/managed-assets')}
                />
              )
            }
            _hover={{ bg: 'none' }}
          >
            Managed Assets
          </Button> */}
          <Collapse in={isOpen} animateOpacity style={{ width: '100%' }}>
            <CollapsibleSidebarItem
              label="Investors"
              isActive={pathname === '/realtor/managed-assets/investors'}
              href="/realtor/managed-assets/investors"
            />
            <CollapsibleSidebarItem
              label="Assets"
              isActive={pathname === '/realtor/managed-assets/assets'}
              href="/realtor/managed-assets/assets"
            />
          </Collapse>
          {/* <SideBarItem
            label="Transactions"
            Icon={RealtorTransactionsIcon}
            isActive={pathname === '/realtor/transactions'}
            href="/realtor/transactions"
            onClick={() => setOpenSideNav(false)}
          /> */}
          <SideBarItem
            label="Clients"
            Icon={RealtorClientsIcon}
            isActive={pathname === '/realtor/clients'}
            href="/realtor/clients"
            onClick={() => setOpenSideNav(false)}
          />
          {/* <SideBarItem
            label="Securities"
            Icon={RealtorSecuritiesIcon}
            isActive={pathname === '/realtor/securities'}
            href="/realtor/securities"
            onClick={() => setOpenSideNav(false)}
          /> */}
          {/* <SideBarItem
            label="Team"
            Icon={RealtorTeamsIcon}
            isActive={pathname === '/realtor/team'}
            href="/realtor/team"
            onClick={() => setOpenSideNav(false)}
          /> */}
          <SideBarItem
            label="Settings"
            Icon={SettingsIcon}
            isActive={pathname === '/realtor/settings'}
            href="/realtor/settings"
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
