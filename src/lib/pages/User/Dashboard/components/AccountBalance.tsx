import { Box, Heading, Text, Stack, Flex } from '@chakra-ui/react'
import React from 'react'
import { HiOutlineEye } from 'react-icons/hi2';

const AccountBalance = () => {
  return (
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
  );
}

export default AccountBalance