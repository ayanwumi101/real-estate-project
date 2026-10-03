import {
  Box,
  Flex,
  Text,
  Stack,
  useToast,
  Image,
  Button,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import {
  MyAssetsIcon,
  SettingsIcon,
  LogoutIcon,
  ManagedAssetsIcon,
  RealtorClientsIcon,
  RealtorSecuritiesIcon,
  RealtorTeamsIcon,
  RealtorTransactionsIcon,
  CollapsibleSidebarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '~/lib/components/Icons/Icons';
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
      px="34"
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
      px="20px"
      bg={isActive ? '#EDEDFF' : 'none'}
      onClick={onClick}
      _hover={{ bg: '#EDEDFF' }}
    >
      <Link href={href}>
        <Text
          color={isActive ? '#4040A0' : '#2E353F'}
          _hover={{ color: '#4040A0' }}
          fontWeight={500}
        >
          {label}
        </Text>
      </Link>
    </Box>
  );
};

const RealtorSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  const LogoutUser = () => {
    navigate('/signin');
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
    <Box as="nav" color="black" bg="#FBFBFB" w="100%" h="100vh">
      <Box
        borderX="1px solid #E4E4E4"
        w="100%"
        h="100%"
        borderBottom="1px solid #E4E4E4"
      >
        <Box
          textAlign="center"
          w="100%"
          h="80px"
          borderBottom="1px solid #E4E4E4"
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Image
            src="/assets/images/logo.png"
            display="block"
            //mx="auto"
            w="75%"
            objectFit="cover"
          />
        </Box>
        <Box py="24px">
          <Stack spacing="16px" alignItems="flex-start">
            <SideBarItem
              label="Properties"
              Icon={MyAssetsIcon}
              isActive={pathname === '/realtor/properties'}
              href="/realtor/properties"
            />
            <Button
              onClick={onToggle}
              rounded="0px"
              py="10px"
              w="100%"
              px="34"
              justifyContent="flex-start"
              leftIcon={
                <ManagedAssetsIcon
                  isActive={
                    pathname.includes('/realtor/managed-assets') || isOpen
                  }
                />
              }
              fontWeight={500}
              fontSize={15}
              bg="none"
              color={
                pathname.includes('/realtor/managed-assets') || isOpen
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
            </Button>
            <Collapse in={isOpen} animateOpacity style={{ width: '100%' }}>
              <Flex alignItems="flex-start" w="full" gap="2">
                <Box as="span" ml="10" mt="1">
                  <CollapsibleSidebarIcon />
                </Box>
                <Stack spacing={0} w="full">
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
                </Stack>
              </Flex>
            </Collapse>
            <SideBarItem
              label="Transactions"
              Icon={RealtorTransactionsIcon}
              isActive={pathname === '/realtor/transactions'}
              href="/realtor/transactions"
            />
            <SideBarItem
              label="Clients"
              Icon={RealtorClientsIcon}
              isActive={pathname === '/realtor/clients'}
              href="/realtor/clients"
            />
            <SideBarItem
              label="Securities"
              Icon={RealtorSecuritiesIcon}
              isActive={pathname === '/realtor/securities'}
              href="/realtor/securities"
            />
            <SideBarItem
              label="Team"
              Icon={RealtorTeamsIcon}
              isActive={pathname === '/realtor/team'}
              href="/realtor/team"
            />
            <SideBarItem
              label="Settings"
              Icon={SettingsIcon}
              isActive={pathname === '/realtor/settings'}
              href="/realtor/settings"
            />
            <Box
              py="10px"
              w="100%"
              px="34"
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
        </Box>
      </Box>
    </Box>
  );
};

export default RealtorSidebar;
