import { Box, Image, Heading, Text, Button, Flex, Stack } from '@chakra-ui/react'
import React from 'react'
import { LocationIcon, InvestIcon } from '~/lib/components/Icons/Icons';


const Header = () => {
  return (
    <Box py="30px" px={['20px', '40px']} borderY="1px solid #E4E4E4">
      <Flex
        alignItems="flex-start"
        justifyContent="space-between"
        gap={['20px', 0]}
        flexWrap={['wrap', 'wrap', 'nowrap']}
      >
        <Box>
          <Flex alignItems="flex-start" gap="10px">
            <Image
              src="/assets/images/house-1.png"
              w={['120px', '100px']}
              h={['100px', '90px']}
              objectFit="cover"
            />
            <Stack spacing="10px">
              <Heading fontSize={[20, 24]} fontWeight={500} color="#222222">
                Skyline Residences
              </Heading>
              <Flex alignItems="center" gap="10px">
                <LocationIcon />
                <Text color="#2E353F" fontWeight={500}>
                  Victoria Island, Lagos
                </Text>
              </Flex>
              <Heading fontSize={[16, 18]} color="#FFAE42" fontWeight={700}>
                ₦5,000 - 15,000/{' '}
                <Box as="span" color="#2E353F" fontSize={16} fontWeight={500}>
                  share
                </Box>
              </Heading>
            </Stack>
          </Flex>
        </Box>
        <Button
          bg="#000080"
          _hover={{ bg: 'brand.100' }}
          color="#ffffff"
          fontWeight={500}
          fontSize={15}
        >
          <Flex alignItems="center" gap="8px">
            <Text>Invest now</Text>
            <InvestIcon />
          </Flex>
        </Button>
      </Flex>
    </Box>
  );
}

export default Header