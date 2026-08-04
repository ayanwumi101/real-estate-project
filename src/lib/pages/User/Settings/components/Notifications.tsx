import {
  Box,
  Heading,
  Switch,
  Stack,
  Text,
  Flex,
  Checkbox,
  useToast,
  FormLabel,
} from '@chakra-ui/react';
import React from 'react';
import {
  NotificationPreference,
  UpdateUserNotificationPreference,
} from '~/lib/api/services/notificationService';

const Notifications = ({
  preferences,
}: {
  preferences: NotificationPreference[];
}) => {
  const toast = useToast();
  const [localPreferences, setLocalPreferences] = React.useState<
    NotificationPreference[]
  >([]);

  React.useEffect(() => {
    setLocalPreferences(preferences);
  }, [preferences]);

  const handleToggleChange = async (
    category: string,
    eventKey: string,
    channel: 'email' | 'whatsapp',
    newValue: boolean
  ) => {
    // Update local state immediately for responsive UI
    const updatedPreferences = localPreferences.map((pref) => {
      if (pref.category === category) {
        return {
          ...pref,
          events: pref.events.map((event) => {
            if (event.event_key === eventKey) {
              return {
                ...event,
                [channel]: newValue,
              };
            }
            return event;
          }),
        };
      }
      return pref;
    });
    setLocalPreferences(updatedPreferences);

    // Find the updated event to send to API
    const updatedEvent = updatedPreferences
      .find((pref) => pref.category === category)
      ?.events.find((event) => event.event_key === eventKey);
    if (updatedEvent) {
      try {
        await UpdateUserNotificationPreference({
          preferences: [
            {
              event_key: eventKey,
              in_app: updatedEvent.in_app,
              email: updatedEvent.email,
              whatsapp: updatedEvent.whatsapp,
            },
          ],
        });
        toast({
          title: 'Notification preference updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      } catch (error: any) {
        toast({
          title:
            error?.response?.data?.error?.message ||
            'Failed to update notification preference',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        // Revert local state on error
        setLocalPreferences(preferences);
      }
    }
  };
  return (
    <Box px={['20px', '40px']} pb="50px">
      <Stack spacing="26px">
        {localPreferences?.map((notification) => (
          <Box
            border="1px solid #E4E4E4"
            borderRadius="5px"
            p="15px"
            key={notification?.category}
          >
            <Stack spacing="20px">
              <Flex alignItems="center">
                <Checkbox
                  w={['full', '70%']}
                  isChecked={notification?.events?.every(
                    (event) => event?.email && event?.whatsapp
                  )}
                  color="#2E353F"
                  fontSize={14}
                  fontWeight={700}
                  size="lg"
                  textTransform="capitalize"
                >
                  {notification?.label}
                </Checkbox>
                <Box w="28%" display={['none', 'block']}>
                  <Text fontSize={16} fontWeight={700} color="brand.300">
                    Email
                  </Text>
                </Box>
                <Box w="22%" display={['none', 'block']}>
                  <Text fontSize={16} fontWeight={700} color="brand.300">
                    WhatsApp
                  </Text>
                </Box>
              </Flex>

              {notification.events?.map((item) => (
                <Box
                  border="1px solid #E4E4E4"
                  borderRadius="5px"
                  px="25px"
                  py="15px"
                  key={item.label}
                >
                  <Flex
                    justifyContent={['flex-start', 'space-between']}
                    alignItems="center"
                    flexWrap={['wrap', 'nowrap']}
                    gap={[5, 0]}
                  >
                    <Box w={['full', '50%']}>
                      <Flex alignItems={['flex-start', 'center']} gap="15px">
                        <Checkbox
                          isChecked={item?.email && item?.whatsapp}
                          size="lg"
                        />
                        <Stack spacing="3px">
                          <Text
                            color="#2E353F"
                            fontWeight={600}
                            fontSize={14.5}
                          >
                            {item.label}
                          </Text>
                          <Text fontWeight={500} color="#8295AA" fontSize={14}>
                            {item.description}
                          </Text>
                        </Stack>
                      </Flex>
                    </Box>
                    <Box w={['auto', '15%']}>
                      <FormLabel
                        fontSize={14}
                        fontWeight={700}
                        color="brand.300"
                        display={['block', 'none']}
                      >
                        Email
                      </FormLabel>
                      <Switch
                        isChecked={item?.email}
                        onChange={(e) =>
                          handleToggleChange(
                            notification?.category,
                            item?.event_key,
                            'email',
                            e.target.checked
                          )
                        }
                      />
                    </Box>
                    <Box w={['auto', '15%']}>
                      <FormLabel
                        fontSize={14}
                        fontWeight={700}
                        color="brand.300"
                        display={['block', 'none']}
                      >
                        WhatsApp
                      </FormLabel>
                      <Switch
                        isChecked={item?.whatsapp}
                        onChange={(e) =>
                          handleToggleChange(
                            notification?.category,
                            item?.event_key,
                            'whatsapp',
                            e.target.checked
                          )
                        }
                      />
                    </Box>
                  </Flex>
                </Box>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Notifications;
