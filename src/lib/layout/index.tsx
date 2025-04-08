'use client';

import {
  Box,
  Stack,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Image,
  Heading,
  TableContainer,
  Table,
  Tr,
  Td,
  Tbody,
  useMediaQuery
} from '@chakra-ui/react';
import {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import Cookies from 'js-cookie';

import { Footer } from './components/footer';
import { Header } from './components/header';
import '../styles/globals.css';
import DashboardSidebar from './components/DashboardSidebar';
import { usePathname, useRouter } from 'next/navigation';
import DashboardHeader from './components/DashboardHeader';
import {
  DashboardNotificationIcon,
  InputSearchIcon,
} from '../components/Icons/Icons';
import { GetUserProfileDetails } from '../api/services/profileService';
import { GetNextOfKins } from '../api/services/userService';
import styles from './styles.module.css'



export const AppContext = createContext<any>({});

type LayoutProps = {
  children: ReactNode;
};

const DashboardSearchBar = ({
  setShowSearchBar,
}: {
  setShowSearchBar: (value: boolean) => void;
}) => {
  const handleClick = (e: any) => {
    e.stopPropagation();
    setShowSearchBar(false);
  };
  return (
    <Box
      position="fixed"
      zIndex="10"
      top="0"
      w="100vw"
      bg="rgba(0,0,0,0.5)"
      backdropFilter="blur(8px)"
      h="100%"
      onClick={handleClick}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        display="flex"
        alignItems="center"
        justifyContent="center"
        pt="25px"
        bg="white"
        h="75px"
      >
        <Flex alignItems="center" gap="32px" w="100%" mb="30px">
          <Box
            w="240px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image src="/assets/images/investor-logo.png" w="125px" />
          </Box>
          <InputGroup w="60%">
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
            />
          </InputGroup>
          <DashboardNotificationIcon />
          <Box w="1px" h="40px" bg="#C0C0C0"></Box>
          <Avatar
            name="Ayanwumi Babatunde"
            w="50px"
            h="50px"
            bg="#E4E4E4"
            color="#ffffff"
          />
        </Flex>
      </Box>
      <Box
        borderRadius="5px"
        border="1px solid #C0C0C0"
        minH="400px"
        w="60%"
        mx="auto"
        bg="#ffffff"
        mt="2"
        onClick={(e) => e.stopPropagation()}
        py="32px"
        px="40px"
      >
        <Stack spacing="30px">
          <Heading fontSize={15} fontWeight={700} color="#222222">
            Trending
          </Heading>
          <TableContainer>
            <Table border="none" variant="unstyled">
              <Tbody color="#222222">
                {[1, 2, 3, 4, 5, 6, 7].map(() => {
                  return (
                    <Tr px="0" border="none" _hover={{ bg: '#f5f5f5' }}>
                      <Td px="0" fontSize={18} fontWeight={600}>
                        Skyline Residences
                      </Td>
                      <Td fontWeight={500} fontSize={18}>
                        ₦375,000
                      </Td>
                      <Td fontWeight={500} fontSize={18}>
                        ₦3
                      </Td>
                      <Td fontWeight={500} fontSize={18}>
                        0.1
                      </Td>
                      <Td w="120px">
                        <Sparklines
                          data={[5, 10, 5, 20, 8, 15, 10, 25, 9, 5]}
                          width={120}
                          height={30}
                          margin={5}
                        >
                          <SparklinesLine color="#1BD155" />
                        </Sparklines>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </Box>
    </Box>
  );
};

export const DashboardLayout = ({ children }: LayoutProps) => {
  const [showSearBar, setShowSearchBar] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<any>([]);
  const [nextOfKins, setNextOfKins] = useState<any>([]);
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const handleChange = () => {
    setShowSearchBar(true);
  };

  const GetUserDetails = async () => {
    try {
      const res = await GetUserProfileDetails();
      const data = await res.data;
      setUserDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

   const GetUserNextOfKins = async () => {
     try {
       const res = await GetNextOfKins();
       const data = await res.data;
       setNextOfKins(data);
     } catch (error) {
       console.log(error);
     }
   };

  useEffect(() => {
    GetUserDetails();
    GetUserNextOfKins();
  }, []);
  
  return (
    <AppContext.Provider value={{ userDetails, setUserDetails, nextOfKins, setNextOfKins }}>
      <Box
        w="100%"
        mx="auto"
        position={isMobile ? 'static' : 'relative'}
        bg={['none', 'rgba(100, 100, 100, 0.1)']}
      >
        <Stack direction="row" w="100%" mx="auto" justifyContent="center">
          <Box
            w={isMobile ? '0%' : '20%'}
            position="fixed"
            left="0"
            top="0"
            h="100vh"
            overflow="hidden"
            display={isMobile ? 'none' : 'block'}
          >
            <DashboardSidebar />
          </Box>
          <Box
            position={isMobile ? 'static' : 'absolute'}
            left={isMobile ? '0%' : '20%'}
            w={isMobile ? '100%' : '80%'}
          >
            <Stack direction="column" spacing="12px">
              <DashboardHeader setShowSearchBar={setShowSearchBar} />
              <Box as="main" w="100%">
                {children}
              </Box>
            </Stack>
          </Box>
        </Stack>
        {showSearBar && (
          <DashboardSearchBar setShowSearchBar={setShowSearchBar} />
        )}
      </Box>
    </AppContext.Provider>
  );
};

export const HomeLayout = ({ children }: LayoutProps) => {
  return (
    <Box>
      <Header />
      <Box as="main">{children}</Box>
      <Footer />
    </Box>
  );
};

export const Layout = ({ children }: LayoutProps) => {
  const rawToken = Cookies.get('vestier-token');
  const token = rawToken ? JSON.parse(rawToken) : null;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // useLayoutEffect(() => {
  //   (async () => {
  //     const LocomotiveScroll = (await import('locomotive-scroll')).default;
  //     const locomotiveScroll = new LocomotiveScroll();
  //   })();
  // }, []);

  useEffect(() => {
    const isProtectedRoute = pathname.startsWith('/user');
    if (isProtectedRoute && !token) {
      router.replace('/signin');
    } else if (!isProtectedRoute && token) {
      router.replace('/user/dashboard');
    }
    setIsLoading(false);
  }, [pathname, router, token]);

  if (isLoading) {
    return (
      <Box
        w="100%"
        h="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src="/assets/images/logo.png"
          w="250px"
          h="250px"
          objectFit="cover"
          className={styles.zoomInOut}
        />
      </Box>
    );
  }

  return (
    <Box maxWidth="1440px" mx="auto">
      {token === undefined || token === null ? (
        <HomeLayout>{children}</HomeLayout>
      ) : (
        <DashboardLayout>{children}</DashboardLayout>
      )}
    </Box>
  );
};
