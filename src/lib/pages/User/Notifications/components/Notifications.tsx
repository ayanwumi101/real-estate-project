import {
  Stack,
  Box,
  Heading,
  Flex,
  Text,
  Skeleton,
  SkeletonText,
  useToast,
} from '@chakra-ui/react';
import { Fragment, useContext } from 'react';
import { PendingRemittanceNotificationIcon } from '~/lib/components/Icons/Icons';
import { AppContext } from '~/lib/layout';
import EmptyState from './EmptyState';
import { groupNotificationsByDate } from '~/lib/utils/groupNotificationsByDate';
import moment from 'moment';
import {
  MarkNotificationAsRead,
  Notification,
} from '~/lib/api/services/notificationService';
import useNavigate from '~/lib/utils/useNavigate';

const NotificationsLoader = () => {
  return (
    <Box>
      <Stack spacing="10px">
        {[1, 2, 3, 4, 5]?.map((item) => (
          <Box
            w="full"
            borderBottom="1px solid"
            borderColor="border.100"
            p="3"
            key={item}
          >
            <Flex
              alignItems="flex-start"
              justifyContent="space-between"
              w="full"
            >
              <Flex alignItems="center" gap="12px" w="70%">
                <Skeleton w="30px" h="30px" rounded="5px" />
                <SkeletonText
                  noOfLines={2}
                  spacing="2"
                  skeletonHeight="3"
                  w="70%"
                />
              </Flex>
              <Skeleton w="50px" h="15px" rounded="5px" />
            </Flex>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

const Notifications = ({
  notifications,
  notificationsLoading,
}: {
  notifications: Notification[];
  notificationsLoading: boolean;
}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { GetNotifications } = useContext(AppContext);
  const groups = groupNotificationsByDate(notifications);

  const markAsRead = async (
    notificationId: string,
    propertyId: string,
    category: 'payments' | 'properties',
    isRead: boolean
  ) => {
    if (isRead === true) {
      if (category === 'payments') {
        navigate(`/user/portfolio/${propertyId}/payments`);
      } else {
        navigate(`/user/my-assets/${propertyId}`);
      }
    } else {
      try {
        toast({
          title: 'Notification marked as read, redirecting....',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        await MarkNotificationAsRead(notificationId);
        await GetNotifications();
        if (category === 'payments') {
          navigate(`/user/portfolio/${propertyId}/payments`);
        } else {
          navigate(`/user/my-assets/${propertyId}`);
        }
      } catch (error: any) {
        toast({
          title: error?.response?.data?.error?.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
    }
  };
  return (
    <Fragment>
      {notificationsLoading ? (
        <NotificationsLoader />
      ) : (
        <Fragment>
          {notifications?.length < 1 ? (
            <EmptyState />
          ) : (
            <Box>
              <Stack spacing="25px">
                {groups?.map((group) => (
                  <Box key={group.label}>
                    <Box
                      bg="bg.500"
                      p="20px"
                      mb="2"
                      borderTopRightRadius="8px"
                      borderTopLeftRadius="8px"
                    >
                      <Heading fontSize={16} fontWeight={600} color="brand.400">
                        {group?.label}
                      </Heading>
                    </Box>
                    <Stack>
                      {group?.notifications?.map((notification) => {
                        return (
                          <Box
                            p="12px 10px"
                            borderBottom="1px solid"
                            borderColor="border.100"
                            key={notification?.id}
                            cursor="pointer"
                            bg={
                              notification?.read === false ? 'bg.500' : 'none'
                            }
                            onClick={() =>
                              markAsRead(
                                notification?.id,
                                notification?.data?.property_id,
                                notification?.category,
                                notification?.read
                              )
                            }
                          >
                            <Flex
                              alignItems="flex-start"
                              justifyContent="space-between"
                            >
                              <Flex alignItems="center" gap={['8px', '16px']}>
                                <Box>
                                  <PendingRemittanceNotificationIcon />
                                </Box>
                                <Stack spacing="6px">
                                  <Heading
                                    fontSize={[14, 15]}
                                    fontWeight={600}
                                    color="brand.300"
                                  >
                                    {notification?.title}
                                  </Heading>
                                  <Text
                                    fontSize={[13, 14]}
                                    fontWeight={500}
                                    color="brand.400"
                                    noOfLines={[1, 2, 3]}
                                  >
                                    {notification?.body}
                                  </Text>
                                </Stack>
                              </Flex>
                              <Text
                                fontSize={[12, 13]}
                                fontWeight={500}
                                noOfLines={[1, 2, 3]}
                              >
                                {moment(notification.created_at).fromNow()}
                              </Text>
                            </Flex>
                          </Box>
                        );
                      })}
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Notifications;
