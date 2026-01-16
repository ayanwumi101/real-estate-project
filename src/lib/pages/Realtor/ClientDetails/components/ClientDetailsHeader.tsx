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
      <Flex
        alignItems={['center', 'flex-start']}
        gap="25px"
        flexDirection={['column', 'row']}
      >
        <Avatar
          name={`${client?.firstname} ${client?.lastname}`}
          src="/path/to/avatar.jpg"
          w="90px"
          h="90px"
          rounded="full"
          bg="brand.100"
          color="brand.200"
          fontWeight={600}
          size='xl'
        />
        <Box w="full">
          <Stack spacing={['18px',"12px"]}>
            <Box>
              <Flex alignItems="center" justifyContent="space-between">
                <Stack
                  w={['full', 'auto']}
                  spacing="12px"
                  justifyContent={['center', 'flex-start']}
                  alignItems={['center', 'flex-start']}
                >
                  <Heading
                    fontWeight={500}
                    fontSize={[24, 30]}
                    color="brand.300"
                  >
                    {client?.firstname} {client?.lastname}
                  </Heading>
                  {/* <Flex alignItems="center" gap="10px">
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
                  </Flex> */}
                </Stack>
                <Flex alignItems="center" gap="10px" display={['none', 'flex']}>
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
              <Flex alignItems="flex-start" justifyContent="space-between">
                <Stack spacing="16px">
                  <Flex alignItems="center" gap="10px">
                    <LocationIcon />
                    <Text
                      fontWeight={500}
                      fontSize={[14, 16]}
                      color="brand.300"
                    >
                      {client?.address}
                    </Text>
                  </Flex>
                  <Flex alignItems="center" gap="10px">
                    <EmailIcon />
                    <Text
                      fontWeight={500}
                      fontSize={[14, 16]}
                      color="brand.300"
                    >
                      {client?.email}
                    </Text>
                  </Flex>
                </Stack>
                <Stack spacing="16px">
                  <Flex alignItems="center" gap="10px">
                    <TelephoneIcon />
                    <Text
                      fontWeight={500}
                      fontSize={[14, 16]}
                      color="brand.300"
                    >
                      {client?.phone?.startsWith('234')
                        ? `+${client?.phone}`
                        : client?.phone}
                    </Text>
                  </Flex>
                  {/* <Flex alignItems="center" gap="10px">
                    <LocationIcon />
                    <Text
                      fontWeight={500}
                      fontSize={[14, 16]}
                      color="brand.300"
                    >
                      {client?.address}
                    </Text>
                  </Flex> */}
                </Stack>
              </Flex>
            </Box>
            <Flex
              alignItems="center"
              justifyContent={'center'}
              display={['flex', 'none']}
              gap="10px"
            >
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
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default ClientDetailsHeader;
