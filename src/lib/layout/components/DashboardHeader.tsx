import {
  Box,
  Avatar,
  Input,
  InputGroup,
  AvatarBadge,
  Flex,
  InputLeftElement,
  Heading,
  Text,
  Button,
  Stack,
  useMediaQuery,
  Image,
} from '@chakra-ui/react';
import React, { Fragment, useContext, useState } from 'react';
import {
  DashboardNotificationIcon,
  InputSearchIcon,
} from '~/lib/components/Icons/Icons';
import { HiMiniBars3 } from 'react-icons/hi2';
import DashboardMobileSidebar from './UserMobileSidebar';
import { AppContext } from '..';
import RealtorMobileSidebar from './RealtorMobileSidebar';

export const MobileDashboardHeader = () => {
  const [openSideNav, setOpenSideNav] = useState<boolean>(false);
  const { userDetails } = useContext(AppContext);
  return (
    <Fragment>
      <Stack spacing="20px" position="relative" display={['block', 'none']}>
        <Box
          py="12px"
          h="70px"
          px="20px"
          borderBottom="1px solid #e4e4e4"
          bg="#ffffff"
          position="fixed"
          top="0"
          zIndex="10"
          w="100%"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Box w="130px" h="40px">
              <Image
                src="/assets/images/logo3.png"
                display="block"
                mx="auto"
                w="100%"
                h="100%"
                objectFit="cover"
              />
            </Box>
            <Box>
              <Flex alignItems="center" gap="10px">
                <Avatar
                  name={userDetails?.fullname}
                  w="40px"
                  h="40px"
                  bg="#E4E4E4"
                  color="#ffffff"
                  fontSize={12}
                  src={userDetails?.profile_image}
                />
                <Box w="1px" h="40px" bg="#C0C0C0"></Box>
                <Button
                  bg="none"
                  p="0"
                  m="0"
                  _hover={{ bg: 'none', p: 0 }}
                  onClick={() => setOpenSideNav(true)}
                >
                  <HiMiniBars3 size={27} color="#2E353F" />
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
        {/* <InputGroup w="90%" mx="auto">
            <InputLeftElement pointerEvents="none" ml="2" mt="1">
              <InputSearchIcon />
            </InputLeftElement>
            <Input
              pl="12"
              py="12px"
              border="1px solid #8295AA"
              type="text"
              placeholder="Browse Projects"
              borderRadius="50px"
              bg="#FBFBFB"
              color="#8295AA"
              _placeholder={{ color: '#8295AA' }}
              h="50px"
              w="100%"
              onFocus={() => setShowSearchBar(true)}
            />
          </InputGroup> */}
      </Stack>
      {openSideNav && <RealtorMobileSidebar setOpenSideNav={setOpenSideNav} />}
    </Fragment>
  );
};

const DashboardHeader = ({
  setShowSearchBar,
}: {
  setShowSearchBar: (value: boolean) => void;
}) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [openSideNav, setOpenSideNav] = useState<boolean>(false);
  const { userDetails } = useContext(AppContext);
  return (
    <Fragment>
      {isMobile ? (
        <Fragment>
          <Stack spacing="20px" position="relative">
            <Box
              py="12px"
              h="70px"
              px="20px"
              borderBottom="1px solid #e4e4e4"
              bg="#ffffff"
              position="fixed"
              top="0"
              zIndex="10"
              w="100%"
            >
              <Flex alignItems="center" justifyContent="space-between">
                <Box w="130px" h="40px">
                  <Image
                    src="/assets/images/logo3.png"
                    display="block"
                    mx="auto"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                  />
                </Box>
                <Box>
                  <Flex alignItems="center" gap="10px">
                    <Avatar
                      name={userDetails?.fullname}
                      w="40px"
                      h="40px"
                      bg="#E4E4E4"
                      color="#ffffff"
                      fontSize={12}
                      src={userDetails?.profile_image}
                    />
                    <Box w="1px" h="40px" bg="#C0C0C0"></Box>
                    <Button
                      bg="none"
                      p="0"
                      m="0"
                      _hover={{ bg: 'none', p: 0 }}
                      onClick={() => setOpenSideNav(true)}
                    >
                      <HiMiniBars3 size={27} color="#2E353F" />
                    </Button>
                  </Flex>
                </Box>
              </Flex>
            </Box>
            <InputGroup w="90%" mx="auto">
              <InputLeftElement pointerEvents="none" ml="2" mt="1">
                <InputSearchIcon />
              </InputLeftElement>
              <Input
                pl="12"
                py="12px"
                border="1px solid #8295AA"
                type="text"
                placeholder="Browse Projects"
                borderRadius="50px"
                bg="#FBFBFB"
                color="#8295AA"
                _placeholder={{ color: '#8295AA' }}
                h="50px"
                w="100%"
                onFocus={() => setShowSearchBar(true)}
              />
            </InputGroup>
          </Stack>
        </Fragment>
      ) : (
        <Box w="100%" px="40px" py="20px">
          <Box display="flex" alignItems="center">
            <Flex alignItems="center" gap="32px" w="100%">
              <InputGroup w="80%">
                <InputLeftElement pointerEvents="none" ml="2" mt="1">
                  <InputSearchIcon />
                </InputLeftElement>
                <Input
                  pl="12"
                  py="12px"
                  border="1px solid #8295AA"
                  type="text"
                  placeholder="Browse Projects"
                  borderRadius="50px"
                  bg="#FBFBFB"
                  color="#8295AA"
                  _placeholder={{ color: '#8295AA' }}
                  h="50px"
                  w="100%"
                  onFocus={() => setShowSearchBar(true)}
                />
              </InputGroup>
              <DashboardNotificationIcon />
              <Box w="1px" h="40px" bg="#C0C0C0"></Box>
              <Avatar
                name={userDetails?.fullname}
                w="50px"
                h="50px"
                bg="#E4E4E4"
                color="#ffffff"
                src={userDetails?.profile_image}
              />
            </Flex>
          </Box>
        </Box>
      )}
      {openSideNav && (
        <DashboardMobileSidebar setOpenSideNav={setOpenSideNav} />
      )}
    </Fragment>
  );
};

export default DashboardHeader;
