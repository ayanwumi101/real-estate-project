import { Box, Avatar, Input, InputGroup, AvatarBadge, Flex, InputLeftElement, Heading, Text, Button, Stack} from '@chakra-ui/react'
import React from 'react'
import { DashboardNotificationIcon, InputSearchIcon } from '~/lib/components/Icons/Icons'



const DashboardHeader = () => {
  
  return (
    <Box w="100%" px="40px" borderBottom="1px solid #E4E4E4" py="22px">
      <Box display="flex" alignItems="center">
        <Flex alignItems="center" gap="32px" w="100%" mb="30px">
          <InputGroup w="80%">
            <InputLeftElement pointerEvents="none" ml="2" mt="1">
              <InputSearchIcon />
            </InputLeftElement>
            <Input
              pl="12"
              py="12px"
              border="1px solid #8295AA"
              type="text"
              placeholder="Browse Projects"
              borderRadius="50px"
              bg="#FBFBFB"
              color="#8295AA"
              _placeholder={{ color: '#8295AA' }}
              h="50px"
              w="100%"
            />
          </InputGroup>
          <DashboardNotificationIcon />
          <Box w="1px" h="40px" bg="#C0C0C0"></Box>
          <Avatar
            name="Ayanwumi Babatunde"
            w="50px"
            h="50px"
            bg="#E4E4E4"
            color="#ffffff"
          />
        </Flex>
      </Box>
      <Box
        w="100%"
        borderRadius="5px"
        py="16px"
        px="48px"
        bgGradient="linear(to-r, #D8D8FF4D, #EDEDFF4D, #FFE6C44D)"
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            <Stack spacing="6px" color="#000000">
              <Heading fontWeight={700} fontSize={15}>
                Complete Profile Setup
              </Heading>
              <Text fontSize={13} fontWeight={500}>
                To get the most out of your experience here, please take a
                moment to complete your profile.
              </Text>
            </Stack>
          </Box>
          <Button borderRadius="50px" bg="#222222" color='#ffffff' py='6px' px='16px' fontSize={13} fontWeight={600}>
            Complete Now
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default DashboardHeader