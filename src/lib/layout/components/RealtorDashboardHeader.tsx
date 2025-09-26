import {
  Box,
  Flex,
  Avatar,
  Divider,
  Heading,
  Stack,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Button,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { Children, ReactNode, useContext } from 'react';
import {
  LogoutIcon,
  NotificationIcon,
  UserIcon,
} from '~/lib/components/Icons/Icons';
import { AppContext } from '..';
import Cookies from 'js-cookie';
import useNavigate from '~/lib/utils/useNavigate';

interface RealtorDashboardLayoutProps {
  title: string | React.ReactElement;
  children?: ReactNode;
}

const RealtorDashboardLayout = ({
  title,
  children,
}: RealtorDashboardLayoutProps) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { userDetails } = useContext(AppContext);
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
    <Box py="20px">
      <Stack spacing="20px" w="full">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          w="95%"
          mx="auto"
        >
          <Heading fontSize={[25,30]} fontWeight={700} color="brand.100">
            {title}
          </Heading>
          <Box display={['none', 'block']}>
            <Flex alignItems="center" gap="20px">
              <NotificationIcon />
              <Divider
                orientation="vertical"
                h="45px"
                color="border.200"
                bg="border.200"
              />

              <Menu>
                <MenuButton
                  bg="none"
                  _hover={{ bg: 'none', p: 0 }}
                  p="0"
                  as={Button}
                  aria-label="Options"
                  variant="ghost"
                >
                  <Avatar
                    w="50px"
                    h="50px"
                    rounded="full"
                    name={userDetails?.fullname}
                    src={userDetails?.profile_image}
                    bg="#E4E4E4"
                    color="#fff"
                  />
                </MenuButton>
                <MenuList>
                  <Link href="/realtor/settings">
                    <MenuItem icon={<UserIcon />}>View Profile</MenuItem>
                  </Link>
                  <MenuItem icon={<LogoutIcon />} onClick={LogoutUser}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Box>
        </Flex>
        <Divider
          orientation="horizontal"
          w="full"
          color="border.200"
          bg="border.200"
        />
        <Box>{children}</Box>
      </Stack>
    </Box>
  );
};

export default RealtorDashboardLayout;
