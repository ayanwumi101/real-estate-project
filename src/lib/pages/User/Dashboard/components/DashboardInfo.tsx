import { Box, Flex, Stack, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import {
  DashboardBellIcon,
  UpgradePropertyStatusIcon,
  AddNewPropertyIcon,
} from '~/lib/components/Icons/Icons';

export const DashboardInfoCard = ({
  bg,
  label,
  Icon,
  borderColor,
}: {
  bg: string;
  label: string;
  Icon: any;
  borderColor?: string;
}) => {
  return (
    <Box
      w="347px"
      h={['200px', '230px']}
      border="1.63px solid"
      borderColor={borderColor}
      borderRadius="16px"
      bg={bg}
      p="40px"
    >
      <Stack w="100%" h="100%" justifyContent="space-between">
        <Icon />
        <Heading fontSize={[18, 20]} color="bg.400">
          {label}
        </Heading>
      </Stack>
    </Box>
  );
};

const DashboardInfo = () => {
  return (
    <Box py="40px">
      <Flex
        w={['100%', '95%']}
        mx="auto"
        alignItems="center"
        justifyContent={['center', 'space-between']}
        flexWrap={['wrap', 'nowrap']}
        gap="24px"
      >
        <DashboardInfoCard
          label="Get Notified When Payments Are Due"
          Icon={DashboardBellIcon}
          bg="#FEF6E7"
          borderColor="#FFD7A0"
        />
        <DashboardInfoCard
          label="Upgrade Property Status in 4 Clicks"
          Icon={UpgradePropertyStatusIcon}
          bg="#F5F5F5"
          borderColor="#C0C0C0"
        />
        <Link href="/user/add-assets">
          <DashboardInfoCard
            label="Add a New Property(Asset)"
            Icon={AddNewPropertyIcon}
            bg="#EDEDFF"
            borderColor="#ABABFF"
          />
        </Link>
      </Flex>
    </Box>
  );
};

export default DashboardInfo;
