import { Box, Heading, Switch, Stack, Text, Flex } from '@chakra-ui/react'
import React from 'react'


const Notifications = () => {
  return (
    <Box px="40px" pb="50px">
      <Stack spacing="26px">
        {/* irst section of notification */}
        <Box border="1px solid #E4E4E4" borderRadius="5px" p="15px">
          <Stack spacing="20px">
            <Heading color="#2E353F" fontSize={14} fontWeight={700}>
              Transaction Notification
            </Heading>
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
                    New deposit
                  </Text>
                  <Text fontWeight={500} color="#8295AA" fontSize={14}>
                    Get alerted when a deposit is credited to your wallet
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
                    New Withdrawal
                  </Text>
                  <Text fontWeight={500} color="#8295AA" fontSize={14}>
                    Get alerted when a withdrawal is deducted from your wallet
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
                    Transaction Update
                  </Text>
                  <Text fontWeight={500} color="#8295AA" fontSize={14}>
                    Get alerted when there is a change in your transaction
                    status
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
                    Portfolio Update
                  </Text>
                  <Text fontWeight={500} color="#8295AA" fontSize={14}>
                    Get alerted when funds are transferred from your vault to
                    your investing account
                  </Text>
                </Box>
                <Switch />
              </Flex>
            </Box>
          </Stack>
        </Box>
        {/* irst section of notification */}
        <Box border="1px solid #E4E4E4" borderRadius="5px" p="15px">
          <Stack spacing="20px">
            <Heading color="#2E353F" fontSize={14} fontWeight={700}>
              Purchase Notification
            </Heading>
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
                    New purchase
                  </Text>
                  <Text fontWeight={500} color="#8295AA" fontSize={14}>
                    Get alerted when a new order is placed
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
                    Order changed
                  </Text>
                  <Text fontWeight={500} color="#8295AA" fontSize={14}>
                    Get alerted when the status of a placed order changes
                  </Text>
                </Box>
                <Switch />
              </Flex>
            </Box>
          </Stack>
        </Box>
        {/* irst section of notification */}
        <Box border="1px solid #E4E4E4" borderRadius="5px" p="15px">
          <Stack spacing="20px">
            <Heading color="#2E353F" fontSize={14} fontWeight={700}>
              Positions Notification
            </Heading>
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
                    Top gainer
                  </Text>
                  <Text fontWeight={500} color="#8295AA" fontSize={14}>
                    Receive an alert on daily top movers
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
                    Top loser
                  </Text>
                  <Text fontWeight={500} color="#8295AA" fontSize={14}>
                    Receive an alert on daily top movers
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

export default Notifications