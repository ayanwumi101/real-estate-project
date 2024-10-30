import React from 'react'
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { LocationIcon, InvestIcon } from '~/lib/components/Icons/Icons';
import { HiPlus } from 'react-icons/hi2';


const Header = () => {
  return (
    <Box py="30px" px="40px" borderY="1px solid #E4E4E4">
      <Flex alignItems="flex-start" justifyContent="space-between">
        <Box>
          <Flex alignItems="flex-start" gap="10px">
            <Image
              src="/assets/images/house-1.png"
              w="90px"
              h="80px"
              objectFit="cover"
            />
            <Stack spacing="10px">
              <Heading fontSize={24} fontWeight={500} color="#222222">
                Skyline Residences
              </Heading>
              <Flex alignItems="center" gap="10px">
                <LocationIcon />
                <Text color="#2E353F" fontWeight={500}>
                  Victoria Island, Lagos
                </Text>
              </Flex>
            </Stack>
          </Flex>
        </Box>
        <Box>
          <Flex alignItems="center" gap="12px">
            <Button
              bg="#EDEDFF"
              color="#4040A0"
              fontWeight={600}
              fontSize={14}
              borderRadius="50px"
            >
              Sell shares
            </Button>
            <Button bg="#000080" fontSize={14} color="#ffffff" fontWeight={500}>
              <Flex alignItems="center" gap="10px">
                <Text>Buy more shares</Text>
                <HiPlus color="white" fontSize={20} fontWeight={700} />
              </Flex>
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};


const PropertyDetails = () => {
  return (
    <Box>
        <Header />
    </Box>
  )
}

export default PropertyDetails