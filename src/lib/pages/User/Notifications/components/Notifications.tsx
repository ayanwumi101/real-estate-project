import { Stack, Box, Heading, Flex, Text } from '@chakra-ui/react';
import { Fragment, useContext } from 'react';
import { PendingRemittanceNotificationIcon } from '~/lib/components/Icons/Icons';
import { AppContext } from '~/lib/layout';
import EmptyState from './EmptyState';
import { groupNotificationsByDate } from '~/lib/utils/groupNotificationsByDate';
import moment from 'moment';
import { Notification } from '~/lib/api/services/notificationService';

const NotificationLoader = () => {
  return <Box></Box>;
};

const NotificationGroup = () => {
  return (
    <Box>
      <Box
        bg="bg.500"
        p="20px"
        mb="2"
        borderTopRightRadius="8px"
        borderTopLeftRadius="8px"
      >
        <Heading fontSize={16} fontWeight={600} color="brand.400">
          Thursday
        </Heading>
      </Box>
      <Stack>
        {[1, 2, 3, 4, 5]?.map((item) => {
          return (
            <Box
              p="12px 10px"
              borderBottom="1px solid"
              borderColor="border.100"
            >
              <Flex alignItems="flex-start" justifyContent="space-between">
                <Flex alignItems="center" gap="16px">
                  <PendingRemittanceNotificationIcon />
                  <Stack spacing="6px">
                    <Heading fontSize={15} fontWeight={600} color="brand.300">
                      Pending Remittance Payment
                    </Heading>
                    <Text fontSize={14} fontWeight={500} color="brand.400">
                      You have a pending remittance payment for Ololade Lands
                      due as at July 1, 2026.
                    </Text>
                  </Stack>
                </Flex>
                <Text fontSize={14} fontWeight={500}>
                  23h ago
                </Text>
              </Flex>
            </Box>
          );
        })}
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
  const groups = groupNotificationsByDate(notifications);
  return (
    <Fragment>
      {notificationsLoading ? (
        <NotificationLoader />
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
                            bg={
                              notification?.read === false ? 'bg.500' : 'none'
                            }
                          >
                            <Flex
                              alignItems="flex-start"
                              justifyContent="space-between"
                            >
                              <Flex alignItems="center" gap="16px">
                                <Box>
                                  <PendingRemittanceNotificationIcon />
                                </Box>
                                <Stack spacing="6px">
                                  <Heading
                                    fontSize={[14,15]}
                                    fontWeight={600}
                                    color="brand.300"
                                  >
                                    {notification?.title}
                                  </Heading>
                                  <Text
                                    fontSize={[13,14]}
                                    fontWeight={500}
                                    color="brand.400"
                                  >
                                    {notification?.body}
                                  </Text>
                                </Stack>
                              </Flex>
                              <Text fontSize={[12,13]} fontWeight={500}>
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
