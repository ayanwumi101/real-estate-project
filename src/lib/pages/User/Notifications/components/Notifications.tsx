import { Stack, Box, Heading, Flex, Text } from '@chakra-ui/react';
import { PendingRemittanceNotificationIcon } from '~/lib/components/Icons/Icons';

const NotificationGroup = () => {
  return (
    <Box>
      <Box bg="bg.500" p='20px' mb='2' borderTopRightRadius='8px' borderTopLeftRadius='8px'>
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
                  <Stack spacing='6px'>
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

const Notifications = () => {
  return (
    <Box>
      <Stack spacing="25px">
        <NotificationGroup />
        <NotificationGroup />
      </Stack>
    </Box>
  );
};

export default Notifications;
