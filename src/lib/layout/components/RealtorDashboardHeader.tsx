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
  const { userDetails, notifications } = useContext(AppContext);
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
    <Box py="14px">
      <Stack spacing="20px" w="full">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          w="95%"
          mx="auto"
        >
          <Heading
            fontSize={[23, 28]}
            fontWeight={700}
            color="brand.100"
            p="0"
            m="0"
          >
            {title}
          </Heading>
          <Box display={['none', 'block']}>
            <Flex alignItems="center" gap="20px">
              {/* <Link href="/realtor/notifications">
                <NotificationIcon />
              </Link> */}
              <Link href="/realtor/notifications">
                <Box position="relative">
                  <Box
                    pos="absolute"
                    top="-3px"
                    right="-3px"
                    rounded="full"
                    w="20px"
                    h="20px"
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
                  <NotificationIcon />
                </Box>
              </Link>
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
                    w="45px"
                    h="45px"
                    rounded="full"
                    name={userDetails?.fullname}
                    src={userDetails?.profile_image}
                    bg="#Ededed"
                    color="black"
                    fontWeight={700}
                  />
                </MenuButton>
                <MenuList fontSize="14px" fontWeight={600}>
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
