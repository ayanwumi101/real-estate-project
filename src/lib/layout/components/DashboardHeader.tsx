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
  Menu,
  MenuButton,
  MenuItem,
  HStack,
  MenuList,
} from '@chakra-ui/react';
import React, { Fragment, useContext, useState } from 'react';
import {
  DashboardNotificationIcon,
  InputSearchIcon,
  ChevronDownIcon,
} from '~/lib/components/Icons/Icons';
import { HiMiniBars3 } from 'react-icons/hi2';
import DashboardMobileSidebar from './UserMobileSidebar';
import { AppContext } from '..';
import RealtorMobileSidebar from './RealtorMobileSidebar';
import { currencies } from '~/lib/utils/types/currency';
import { Currency } from '~/lib/utils/types/currency';

export const RealtorMobileDashboardHeader = () => {
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

export const InvestorMobileDashboardHeader = () => {
  const [openSideNav, setOpenSideNav] = useState<boolean>(false);
  const {
    userDetails,
    selectedCurrency,
    setSelectedCurrency,
    handleChangeCurrency,
  } = useContext(AppContext);

  return (
    <Fragment>
      <Stack spacing="20px" position="relative" display={['block', 'none']}>
        <Box
          py="12px"
          h="70px"
          px="15px"
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
                <Menu>
                  <MenuButton
                    as={Button}
                    variant="ghost"
                    px="2"
                    w="100px"
                    // rightIcon={<ChevronDownIcon />}
                  >
                    <HStack alignItems="center" gap="8px">
                      <Image
                        src={selectedCurrency?.flag}
                        boxSize="25px"
                        alt={selectedCurrency?.code}
                      />
                      <Text fontSize={15}>{selectedCurrency?.code}</Text>
                      <ChevronDownIcon />
                    </HStack>
                  </MenuButton>
                  <MenuList>
                    {currencies.map((currency) => (
                      <MenuItem
                        key={currency.code}
                        onClick={() => {
                          setSelectedCurrency(currency);
                        }}
                        py="3"
                        px="2"
                      >
                        <HStack>
                          <Image
                            src={currency.flag}
                            boxSize="25px"
                            alt={currency.code}
                          />
                          <Text color="text.400" fontSize={14} fontWeight={400}>
                            {currency?.name} ({currency.code})
                          </Text>
                        </HStack>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
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
      </Stack>
      {openSideNav && (
        <DashboardMobileSidebar setOpenSideNav={setOpenSideNav} />
      )}
    </Fragment>
  );
};

const DashboardHeader = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [openSideNav, setOpenSideNav] = useState<boolean>(false);
  const {
    userDetails,
    selectedCurrency,
    setSelectedCurrency,
    handleChangeCurrency,
  } = useContext(AppContext);
  return (
    <Fragment>
      <Box
        w="100%"
        px={['20px', '40px']}
        py={['18px', '22px']}
        borderBottom="1px solid"
        borderColor="border.100"
        mt={[14, 0]}
      >
        <Box display="flex" alignItems="center">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            gap="32px"
            w="100%"
          >
            <Heading fontSize={[24, 30]} fontWeight={700} color="brand.100">
              {title}
            </Heading>
            <Flex alignItems="center" gap="30px" display={['none', 'flex']}>
              <DashboardNotificationIcon />
              <Box w="1px" h="40px" bg="#C0C0C0"></Box>
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  px="2"
                  w="100px"
                  // rightIcon={<ChevronDownIcon />}
                >
                  <HStack alignItems="center" gap="8px">
                    <Image
                      src={selectedCurrency?.flag}
                      boxSize="25px"
                      alt={selectedCurrency?.code}
                    />
                    <Text fontSize={15}>{selectedCurrency?.code}</Text>
                    <ChevronDownIcon />
                  </HStack>
                </MenuButton>
                <MenuList>
                  {currencies.map((currency) => (
                    <MenuItem
                      key={currency.code}
                      onClick={() => {
                        setSelectedCurrency(currency);
                      }}
                      py="3"
                      px="2"
                    >
                      <HStack>
                        <Image
                          src={currency.flag}
                          boxSize="25px"
                          alt={currency.code}
                        />
                        <Text color="text.400" fontSize={14} fontWeight={400}>
                          {currency?.name} ({currency.code})
                        </Text>
                      </HStack>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              <Avatar
                name={userDetails?.fullname}
                w="40px"
                h="40px"
                bg="#E4E4E4"
                color="#ffffff"
                src={userDetails?.profile_image}
              />
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Box>{children}</Box>
    </Fragment>
  );
};

export default DashboardHeader;
