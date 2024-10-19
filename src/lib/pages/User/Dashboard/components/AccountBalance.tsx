import { Box, Heading, Text, Stack, Flex, Button } from '@chakra-ui/react';
import React from 'react';
import { HiOutlineEye } from 'react-icons/hi2';

const AccountBalance = () => {
  return (
    <Box>
      <Box w="100%" px="40px" pb="30px" borderBottom="1px solid #E4E4E4">
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
            <Button
              borderRadius="50px"
              bg="#222222"
              color="#ffffff"
              py="6px"
              px="16px"
              fontSize={13}
              fontWeight={600}
            >
              Complete Now
            </Button>
          </Flex>
        </Box>
      </Box>
      <Box w="100%" px="40px" py="30px" borderBottom="1px solid #E4E4E4">
        <Box
          borderRadius="5px"
          bgGradient="linear(to-r,#D8D8FF, #D8D8FF4D, #FFEFD9)"
          py="32px"
          px="24px"
          w="100%"
        >
          <Stack spacing="16px">
            <Heading fontSize={16} fontWeight={500} color="#222222">
              Total Investments
            </Heading>
            <Box>
              <Flex alignItems="center" gap="16px">
                <Heading fontSize={24} fontWeight={500} color="#222222">
                  ₦ 0
                </Heading>
                <HiOutlineEye color="black" fontSize={22} />
              </Flex>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountBalance;
