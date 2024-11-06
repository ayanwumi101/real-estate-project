import { Input, Stack, Box, FormLabel, FormControl, Button } from '@chakra-ui/react'
import React from 'react'


const Security = () => {
  return (
    <Box px="40px">
      <FormControl w="630px">
        <Stack spacing="16px">
          <Box>
            <FormLabel fontWeight={600} fontSize={16} color="#222222" mb="13px">
              Current Password
            </FormLabel>
            <Input
              type="password"
              h="50px"
              borderRadius="50px"
              border="1px solid #C0C0C0"
              bg="#FBFBFB"
              px="20px"
              placeholder="Enter your current password"
            />
          </Box>
          <Box>
            <FormLabel fontWeight={600} fontSize={16} color="#222222" mb="13px">
              New Password
            </FormLabel>
            <Input
              type="password"
              h="50px"
              borderRadius="50px"
              border="1px solid #C0C0C0"
              bg="#FBFBFB"
              px="20px"
              placeholder="Enter your new password"
            />
          </Box>
          <Box>
            <FormLabel fontWeight={600} fontSize={16} color="#222222" mb="13px">
              Confirm Password
            </FormLabel>
            <Input
              type="password"
              h="50px"
              borderRadius="50px"
              border="1px solid #C0C0C0"
              bg="#FBFBFB"
              px="20px"
              placeholder="Confirm your new password"
            />
          </Box>
        </Stack>
      </FormControl>
    </Box>
  );
}

export default Security