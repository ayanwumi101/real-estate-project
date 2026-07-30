import { Box, Flex, Button, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { MarkAllNotificationAsRead } from '~/lib/api/services/notificationService';
import {
  NotificationFilterIcon,
  NotificationSettingsIcon,
} from '~/lib/components/Icons/Icons';
import { AppContext } from '~/lib/layout';

const Header = ({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: 'all' | 'payments' | 'properties' | 'remittance') => void;
}) => {
  const toast = useToast();
  const { GetNotifications } = useContext(AppContext);
  const MarkAllNotificationsAsRead = async () => {
    try {
      await MarkAllNotificationAsRead();
      await GetNotifications();
      toast({
        title: 'All notifications marked as read',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error: any) {
      toast({
        title:
          error?.response?.data?.error?.message ||
          'Failed to mark all notifications as read',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };
  return (
    <Box>
      <Flex
        alignItems="center"
        justifyContent={['center', 'space-between']}
        gap={[4, 0]}
        flexWrap={['wrap', 'nowrap']}
        overflow="auto"
      >
        <Box overflow="auto">
          <Flex
            alignItems="center"
            gap={['4px', '8px']}
            overflow="auto"
            w={['full', 'auto']}
            pb="2"
          >
            {tabs?.map((tab) => (
              <Box>
                <Button
                  key={tab}
                  textTransform="capitalize"
                  fontSize={14}
                  fontWeight={600}
                  px="16px"
                  h="35px"
                  bg={tab === activeTab ? 'bg.200' : 'none'}
                  borderRadius="50px"
                  color={tab === activeTab ? 'brand.100' : '#8295AA'}
                  onClick={() =>
                    setActiveTab(
                      tab as 'all' | 'payments' | 'properties' | 'remittance'
                    )
                  }
                >
                  {tab}
                </Button>
              </Box>
            ))}
            <Button p="0" variant="ghost">
              <NotificationFilterIcon />
            </Button>
          </Flex>
        </Box>
        <Box>
          <Flex alignItems="center" gap="10px">
            <Button
              variant="ghost"
              fontSize={14}
              fontWeight={600}
              px="0"
              textDecor="underline"
              color="brand.100"
              _hover={{ bg: 'none' }}
              onClick={MarkAllNotificationsAsRead}
            >
              Mark all as read
            </Button>
            <Link href="/user/settings?tab=Notifications">
              {' '}
              <Button variant="ghost" _hover={{ bg: 'none' }} p="0">
                <NotificationSettingsIcon />
              </Button>
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
