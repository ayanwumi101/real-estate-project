import { Box, Flex, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import {
  NotificationFilterIcon,
  NotificationSettingsIcon,
} from '~/lib/components/Icons/Icons';

const Header = () => {
  const [activeTab, setActiveTab] = useState('all');
  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Flex alignItems="center" gap="8px">
            {['all', 'payments', 'properties', 'remittance']?.map((tab) => (
              <Button
                key={tab}
                textTransform="capitalize"
                fontSize={14}
                fontWeight={600}
                px="16px"
                h="35px"
                bg={tab === activeTab ? '#EDEDFF' : 'none'}
                borderRadius="50px"
                color={tab === activeTab ? 'brand.100' : '#8295AA'}
              >
                {tab}
              </Button>
            ))}
            <NotificationFilterIcon />
          </Flex>
        </Box>
        <Box>
          <Flex>
            <Button
              variant="ghost"
              fontSize={14}
              fontWeight={600}
              px="16px"
              textDecor="underline"
              color="brand.100"
              _hover={{ bg: 'none' }}
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
