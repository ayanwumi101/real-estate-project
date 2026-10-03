import { Box, Stack, Image, Heading, Text } from '@chakra-ui/react';

const EmptyState = () => {
  return (
    <Box
      w="full"
      h="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        spacing="0px"
        textAlign="center"
        alignItems="center"
        maxW="550px"
        mx="auto"
      >
        <Image src="/assets/images/notification.png" w="230px" />
        <Box>
          <Heading fontWeight={600} fontSize={18} mb='2'>
            You're all caught up!
          </Heading>
          <Text fontSize={14} fontWeight={500}>
            There are no new notifications at the moment. We'll notify you when
            there's an update to your properties, payments, or services.
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default EmptyState;
