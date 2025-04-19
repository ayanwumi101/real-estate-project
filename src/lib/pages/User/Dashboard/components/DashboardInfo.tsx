import { Box, Flex, Stack, Heading, Text } from '@chakra-ui/react';
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
}: {
  bg: string;
  label: string;
  Icon: any;
}) => {
  return (
    <Box w="347px" h={['200px',"230px"]} borderRadius="16px" bg={bg} p="40px">
      <Stack w="100%" h="100%" justifyContent='space-between'>
        <Icon />
        <Heading fontSize={[18,20]} color="bg.400">
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
        w={['100%',"95%"]}
        mx="auto"
        alignItems="center"
        justifyContent={['center',"space-between"]}
        flexWrap={['wrap', 'nowrap']}
        gap="24px"
      >
        <DashboardInfoCard
          label="Get Notified When Payments Are Due"
          Icon={DashboardBellIcon}
          bg="#FEF6E7"
        />
        <DashboardInfoCard
          label="Upgrade Property Status in 4 Clicks"
          Icon={UpgradePropertyStatusIcon}
          bg="#F5F5F5"
        />
        <DashboardInfoCard
          label="Add a New Property(Asset)"
          Icon={AddNewPropertyIcon}
          bg="#EDEDFF"
        />
      </Flex>
    </Box>
  );
};

export default DashboardInfo;
