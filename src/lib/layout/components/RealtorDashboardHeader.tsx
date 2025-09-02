import { Box, Flex, Avatar, Divider, Heading, Stack } from '@chakra-ui/react';
import React, { Children, ReactNode } from 'react';
import { NotificationIcon } from '~/lib/components/Icons/Icons';

interface RealtorDashboardLayoutProps {
  title: string | React.ReactElement;
  children?: ReactNode;
}

const RealtorDashboardLayout = ({
  title,
  children,
}: RealtorDashboardLayoutProps) => {
  return (
    <Box py="20px">
      <Stack spacing="20px" w="full">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          w="95%"
          mx="auto"
        >
          <Heading fontSize={30} fontWeight={700} color="brand.100">
            {title}
          </Heading>
          <Box>
            <Flex alignItems="center" gap="20px">
              <NotificationIcon />
              <Divider
                orientation="vertical"
                h="45px"
                color="border.200"
                bg="border.200"
              />
              <Avatar
                w="50px"
                h="50px"
                rounded="full"
                name="User Avatar"
                src="https://bit.ly/dan-abramov"
                bg='brand.100'
              />
            </Flex>
          </Box>
        </Flex>
        <Divider
          orientation="horizontal"
          w="full"
          color="border.200"
          bg="border.200"
        />
        <Box>{children}</Box>
      </Stack>
    </Box>
  );
};

export default RealtorDashboardLayout;
