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
  useMediaQuery,
  useToast,
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
// @ts-expect-error The package stylesheet has no TypeScript module declaration.
import '../styles/globals.css';
import DashboardSidebar from './components/UserSidebar';
import { usePathname, useRouter } from 'next/navigation';
import DashboardHeader, {
  InvestorMobileDashboardHeader,
  RealtorMobileDashboardHeader,
} from './components/DashboardHeader';
import { GetUserProfileDetails } from '../api/services/profileService';
import {
  GetNextOfKins,
  UpdateDisplayCurrencyPreference,
  GetCurrencyPreference,
} from '../api/services/userService';
import styles from './styles.module.css';
import RealtorSidebar from './components/RealtorSidebar';
import { Currency } from '../utils/types/currency';
import { GetUserNotifications } from '../api/services/notificationService';
import { Notification } from '../api/services/notificationService';

export const AppContext = createContext<any>({});

type LayoutProps = {
  children: ReactNode;
};


export const DashboardLayout = ({ children }: LayoutProps) => {
  const toast = useToast();
  const [userDetails, setUserDetails] = useState<any>();
  const [nextOfKins, setNextOfKins] = useState<any>([]);
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [isUserDetailsLoading, setIsUserDetailsLoading] =
    useState<boolean>(true);
  const [isNextOfKinsLoading, setIsNextOfKinsLoading] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>({
    code: 'NGN',
    name: 'Nigerian Naira',
    flag: '/assets/images/nigeria-icon.svg',
  });
  const [displayCurrencyLoading, setDisplayCurrencyLoading] =
    useState<boolean>(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationsLoading, setNotificationsLoading] =
    useState<boolean>(false);

  const GetUserDetails = async () => {
    setIsUserDetailsLoading(true);
    try {
      const res = await GetUserProfileDetails();
      const data = await res.data;
      setUserDetails(data);
    } catch (error) {
      console.log(error);
    }
    setIsUserDetailsLoading(false);
  };

  const GetUserNextOfKins = async () => {
    setIsNextOfKinsLoading(true);
    try {
      const res = await GetNextOfKins();
      const data = await res.data;
      setNextOfKins(data);
    } catch (error) {
      console.log(error);
    }
    setIsNextOfKinsLoading(false);
  };

  const GetUserCurrencyPreference = async () => {
    setDisplayCurrencyLoading(true);
    try {
      const res = await GetCurrencyPreference();
      const data = await res.data;
      // Map of supported currencies
      const supportedCurrencies: { [key: string]: Currency } = {
        NGN: {
          code: 'NGN',
          name: 'Nigerian Naira',
          flag: '/assets/images/nigeria-icon.svg',
        },
        USD: {
          code: 'USD',
          name: 'United States Dollar',
          flag: '/assets/images/us-icon.svg',
        },
        EUR: {
          code: 'EUR',
          name: 'Euro',
          flag: '/assets/images/euro-icon.svg',
        },
        GBP: {
          code: 'GBP',
          name: 'British Pound',
          flag: '/assets/images/british-icon.svg',
        },
      };

      const displayCurrency = data?.display_currency;
      if (displayCurrency && supportedCurrencies[displayCurrency]) {
        setSelectedCurrency(supportedCurrencies[displayCurrency]);
      }
    } catch (error) {
      console.log(error);
    }
    setDisplayCurrencyLoading(false);
  };

  const GetNotifications = async () => {
    setNotificationsLoading(true);
    try {
      const response = await GetUserNotifications();
      const data = await response.data;
      setNotifications(data);
    } catch (error) {
      console.log(error);
    }
    setNotificationsLoading(false);
  };

  useEffect(() => {
    GetUserDetails();
    GetUserNextOfKins();
    GetUserCurrencyPreference();
    GetNotifications();
  }, []);

  useEffect(() => {
    const rawUserRole = Cookies.get('vestier-user-role');
    const role = rawUserRole ? JSON.parse(rawUserRole) : null;
    setUserRole(role);
  }, []);

  const handleChangeCurrency = async (currency: Currency) => {
    setDisplayCurrencyLoading(true);
    try {
      await UpdateDisplayCurrencyPreference(currency.code);
      toast({
        title: 'Currency updated',
        description: `Your display currency has been updated to ${currency.name}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update display currency',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
    setDisplayCurrencyLoading(false);
  };

  // Save selectedCurrency to local storage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && selectedCurrency) {
      localStorage.setItem(
        'selectedCurrency',
        JSON.stringify(selectedCurrency)
      );
    }
  }, [selectedCurrency]);

  return (
    <AppContext.Provider
      value={{
        userDetails,
        setUserDetails,
        nextOfKins,
        setNextOfKins,
        isNextOfKinsLoading,
        isUserDetailsLoading,
        selectedCurrency,
        setSelectedCurrency,
        handleChangeCurrency,
        displayCurrencyLoading,
        notifications,
        setNotifications,
        GetNotifications,
        notificationsLoading,
      }}
    >
      <Box
        w="100%"
        mx="auto"
        position={isMobile ? 'static' : 'relative'}
        bg={['none', 'rgba(100, 100, 100, 0.1)']}
      >
        {userRole === 'investor' ? (
          <Stack direction="row" w="100%" mx="auto" justifyContent="center">
            <Box
              w={isMobile ? '0%' : '250px'}
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
              left={isMobile ? '0%' : '250px'}
              w={isMobile ? '100%' : 'calc(100% - 250px)'}
              // px={isMobile ? 0 : 5}
            >
              <Stack direction="column" spacing="12px">
                <InvestorMobileDashboardHeader />
                {/* <DashboardHeader setShowSearchBar={setShowSearchBar} /> */}
                <Box as="main" w="100%">
                  {children}
                </Box>
              </Stack>
            </Box>
          </Stack>
        ) : (
          <Stack direction="row" w="100%" mx="auto" justifyContent="center">
            <Box
              w={isMobile ? '0%' : '250px'}
              position="fixed"
              left="0"
              top="0"
              h="100vh"
              overflow="hidden"
              display={isMobile ? 'none' : 'block'}
            >
              <RealtorSidebar />
            </Box>
            <Box
              position={isMobile ? 'static' : 'absolute'}
              left={isMobile ? '0%' : '250px'}
              w={isMobile ? '100%' : 'calc(100% - 250px)'}
              //px={isMobile ? 0 : 5}
            >
              <RealtorMobileDashboardHeader />
              <Box as="main" w="100%" mt={['70px', '0']}>
                {children}
              </Box>
            </Box>
          </Stack>
        )}
      </Box>
    </AppContext.Provider>
  );
};

export const HomeLayout = ({ children }: LayoutProps) => {
  return (
    <Box w="full" mx="auto">
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
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string | null>(null);

  // useLayoutEffect(() => {
  //   (async () => {
  //     const LocomotiveScroll = (await import('locomotive-scroll')).default;
  //     const locomotiveScroll = new LocomotiveScroll();
  //   })();
  // }, []);

  useEffect(() => {
    const rawUserRole = Cookies.get('vestier-user-role');
    const role = rawUserRole ? JSON.parse(rawUserRole) : null;
    setUserRole(role);
  }, []);

  useEffect(() => {
    const isProtectedRoute =
      pathname.startsWith('/user') || pathname.startsWith('/realtor');
    if (isProtectedRoute && !token) {
      router.replace('/signin');
    } else if (!isProtectedRoute && token) {
      if (userRole === 'realtor') {
        router.replace('/realtor/properties');
      } else {
        router.replace('/user/dashboard');
      }
    }
    setIsLoading(false);
  }, [pathname, router, token, userRole]);

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
    <Box>
      {pathname.includes('/realtor') || pathname.includes('/user') ? (
        <DashboardLayout>{children}</DashboardLayout>
      ) : (
        <HomeLayout>{children}</HomeLayout>
      )}
    </Box>
  );
};
