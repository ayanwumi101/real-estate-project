import { Box, Avatar, Input, InputGroup, AvatarBadge, Flex, InputLeftElement, Heading, Text, Button, Stack} from '@chakra-ui/react'
import React, { useState } from 'react'
import { DashboardNotificationIcon, InputSearchIcon } from '~/lib/components/Icons/Icons'



const DashboardHeader = ({setShowSearchBar}:{setShowSearchBar: (value: boolean) => void;}) => {
  return (
    <Box 
      w="100%" 
      px="40px" 
      // borderBottom="1px solid #E4E4E4" 
      py="22px"
    >
      <Box display="flex" alignItems="center">
        <Flex alignItems="center" gap="32px" w="100%">
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
              onFocus={() => setShowSearchBar(true)}
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
    </Box>
  );
}

export default DashboardHeader