import React from 'react'
import { Box, Heading, Switch, Stack, Text, Flex } from '@chakra-ui/react';

const Privacy = () => {
  return (
    <Box px="40px" pb="50px">
      <Stack spacing="26px">
        {/* irst section of notification */}
        <Box border="1px solid #E4E4E4" borderRadius="5px" p="15px">
          <Stack spacing="20px">
            {/* //first one */}
            <Box
              border="1px solid #E4E4E4"
              borderRadius="5px"
              py="10px"
              px="24px"
            >
              <Flex justifyContent="space-between">
                <Box>
                  <Text
                    mb="12px"
                    color="#2E353F"
                    fontWeight={600}
                    fontSize={14}
                  >
                    Two - step verification
                  </Text>
                  <Text fontWeight={500} color="#8295AA" fontSize={14}>
                    Improves security by requiring an OTP after logging in on an
                    unauthorized device (cannot be turned off)
                  </Text>
                </Box>
                <Switch />
              </Flex>
            </Box>
            {/* //first one */}
            <Box
              border="1px solid #E4E4E4"
              borderRadius="5px"
              py="10px"
              px="24px"
            >
              <Flex justifyContent="space-between">
                <Box>
                  <Text
                    mb="12px"
                    color="#2E353F"
                    fontWeight={600}
                    fontSize={14}
                  >
                    Hide Balance
                  </Text>
                  <Text fontWeight={500} color="#8295AA" fontSize={14}>
                    Hide your portfolio and vault balance (useful for when
                    you're in public)
                  </Text>
                </Box>
                <Switch />
              </Flex>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default Privacy