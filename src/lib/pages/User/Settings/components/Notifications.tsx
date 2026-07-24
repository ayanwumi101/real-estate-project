import {
  Box,
  Heading,
  Switch,
  Stack,
  Text,
  Flex,
  Checkbox,
} from '@chakra-ui/react';
import React from 'react';

const Notifications = () => {
  const notificationsTypes = [
    {
      groupLabel: 'payments',
      id: 'payments',
      notificationItems: [
        {
          label: 'Instalment payment received',
          description:
            'Receive a notification whenever an instalment is registered as paid',
          notificationChannels: ['email', 'whatsapp'],
        },
        {
          label: 'Instalment payment due',
          description:
            'Get alerted when an instalment payment is getting close to due date',
          notificationChannels: ['email', 'whatsapp'],
        },
        {
          label: 'Instalment payment completed',
          description: 'Receive a notification when an instalment is finalised',
          notificationChannels: ['email', 'whatsapp'],
        },
        {
          label: 'Overdue instalment',
          description:
            'Receive notifications whenever your instalment payment becomes overdue',
          notificationChannels: ['email', 'whatsapp'],
        },
        {
          label: 'Remittance payment due',
          description: 'Stay informed about upcoming remittance deadlines',
          notificationChannels: ['email', 'whatsapp'],
        },
        {
          label: 'Remittance payment received',
          description:
            'Receive notifications whenever a remittance payment is recorded',
          notificationChannels: ['email', 'whatsapp'],
        },
        {
          label: 'Payment deleted',
          description: 'Receive notifications when a payment is deleted',
          notificationChannels: ['email', 'whatsapp'],
        },
      ],
    },
    {
      groupLabel: 'properties',
      id: 'properties',
      notificationItems: [
        {
          label: 'New property is added',
          description:
            'Receive a notification when a new asset is added to your portfolio',
          notificationChannels: ['email', 'whatsapp'],
        },
        {
          label: 'Property updated',
          description:
            'Receive alerts when any changes are made to your property details',
          notificationChannels: ['email', 'whatsapp'],
        },
        {
          label: 'Property sold',
          description:
            'Get notified when your property has been successfully sold',
          notificationChannels: ['email', 'whatsapp'],
        },
        {
          label: 'Property valuation updated',
          description:
            "Stay informed with the latest changes to your property's market value",
          notificationChannels: ['email', 'whatsapp'],
        },
        {
          label: 'Property status changed',
          description:
            'Get notified when the status of your property is updated',
          notificationChannels: ['email', 'whatsapp'],
        },
        {
          label: 'Property deleted',
          description: 'Get notified when a property is deleted',
          notificationChannels: ['email', 'whatsapp'],
        },
      ],
    },
    {
      groupLabel: 'security & account',
      id: 'security-and-account',
      notificationItems: [
        {
          label: 'Password changed',
          description: 'Your password has been successfully updated.',
          notificationChannels: ['email', 'whatsapp'],
        },
        {
          label: 'Profile updated',
          description: 'Your profile information has been successfully saved.',
          notificationChannels: ['email', 'whatsapp'],
        },
      ],
    },
  ];
  return (
    <Box px={['20px', '40px']} pb="50px">
      <Stack spacing="26px">
        {notificationsTypes?.map((notification) => (
          <Box
            border="1px solid #E4E4E4"
            borderRadius="5px"
            p="15px"
            key={notification.id}
          >
            <Stack spacing="20px">
              <Checkbox
                defaultChecked
                color="#2E353F"
                fontSize={14}
                fontWeight={700}
                size="lg"
                textTransform="capitalize"
              >
                {notification.groupLabel}
              </Checkbox>
              {notification.notificationItems?.map((item) => (
                <Box
                  border="1px solid #E4E4E4"
                  borderRadius="5px"
                  px="25px"
                  py="15px"
                  key={item.label}
                >
                  <Flex justifyContent="space-between" alignItems="center">
                    <Box w="50%">
                      <Flex alignItems="center" gap="15px">
                        <Checkbox defaultChecked={true} size="lg" />
                        <Stack spacing="3px">
                          <Text color="#2E353F" fontWeight={600} fontSize={14}>
                            {item.label}
                          </Text>
                          <Text fontWeight={500} color="#8295AA" fontSize={14}>
                            {item.description}
                          </Text>
                        </Stack>
                      </Flex>
                    </Box>
                    {item.notificationChannels?.map((channel) => (
                      <Box w="25%" key={channel}>
                        <Switch />
                      </Box>
                    ))}
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
