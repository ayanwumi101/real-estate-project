import {
  Box,
  Avatar,
  Heading,
  Text,
  Flex,
  Stack,
  Button,
  Badge,
  Divider,
} from '@chakra-ui/react';
import React from 'react';
import {
  LocationIcon,
  EmailIcon,
  TelephoneIcon,
} from '~/lib/components/Icons/Icons';

const ClientDetailsHeader = ({ client }: { client: any }) => {
  return (
    <Box py="25px">
      <Flex alignItems="flex-start" gap="25px">
        <Avatar
          name="James Brown"
          src="/path/to/avatar.jpg"
          w="110px"
          h="110px"
          rounded="full"
          bg="brand.100"
          color="brand.200"
        />
        <Box w="full">
          <Stack spacing="12px">
            <Box>
              <Flex alignItems="center" justifyContent="space-between">
                <Stack spacing="12px">
                  <Heading fontWeight={500} fontSize={30} color="brand.300">
                    {client?.firstname} {client?.lastname}
                  </Heading>
                  <Flex alignItems="center" gap="10px">
                    <Text fontWeight={500} color="brand.300">
                      Manager:{' '}
                    </Text>
                    <Badge
                      bg="bg.700"
                      py="4px"
                      px="12px"
                      rounded="50px"
                      fontWeight={500}
                      textTransform="capitalize"
                      fontSize={14}
                    >
                      Brooklyn Simons
                    </Badge>
                  </Flex>
                </Stack>
                <Flex alignItems="center" gap="10px">
                  <Button
                    fontWeight={600}
                    bg="brand.500"
                    color="brand.100"
                    fontSize={14}
                  >
                    Add New Payment
                  </Button>
                  <Button
                    bg="brand.100"
                    color="brand.200"
                    fontWeight={600}
                    fontSize={14}
                  >
                    Add Property to Client
                  </Button>
                </Flex>
              </Flex>
            </Box>
            <Divider />
            <Box>
              <Flex alignItems="center" justifyContent="space-between">
                <Stack spacing="16px">
                  <Flex alignItems="center" gap="10px">
                    <LocationIcon />
                    <Text fontWeight={500} color="brand.300">
                      {client?.address}
                    </Text>
                  </Flex>
                  <Flex alignItems="center" gap="10px">
                    <EmailIcon />
                    <Text fontWeight={500} color="brand.300">
                      {client?.email}
                    </Text>
                  </Flex>
                </Stack>
                <Stack spacing="16px">
                  <Flex alignItems="center" gap="10px">
                    <TelephoneIcon />
                    <Text fontWeight={500} color="brand.300">
                      {client?.phone?.startsWith('234')
                        ? `+${client?.phone}`
                        : client?.phone}
                    </Text>
                  </Flex>
                  <Flex alignItems="center" gap="10px">
                    <LocationIcon />
                    <Text fontWeight={500} color="brand.300">
                      {client?.address}
                    </Text>
                  </Flex>
                </Stack>
              </Flex>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default ClientDetailsHeader;
