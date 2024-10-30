import { Box, Image, Heading, Text, Button, Flex, Stack } from '@chakra-ui/react'
import React from 'react'
import { LocationIcon, InvestIcon, AddIcon } from '~/lib/components/Icons/Icons';
import { HiPlus } from 'react-icons/hi2';
import { PortfolioStatCard } from '~/lib/components/Cards';


const Header = () => {
  return (
    <Box borderY="1px solid #E4E4E4">
      <Stack>
        <Box py="30px" px="40px" borderBottom="1px solid #E4E4E4">
          <Flex alignItems="center" justifyContent="space-between">
            <Heading fontSize={24} fontWeight={500} color="#222222">
              3 Properties
            </Heading>
            <Box>
              <Flex alignItems="center" gap="12px">
                <Button
                  bg="#EDEDFF"
                  color="#4040A0"
                  fontWeight={600}
                  fontSize={14}
                  borderRadius="50px"
                >
                  Withdraw from wallet
                </Button>
                <Button
                  bg="#000080"
                  fontSize={14}
                  color="#ffffff"
                  fontWeight={500}
                >
                  <Flex alignItems="center" gap="10px">
                    <Text>Fund Wallet</Text>
                    <HiPlus color="white" fontSize={20} fontWeight={700} />
                  </Flex>
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box py="40px" px="40px" overflow='auto'>
          <Flex alignItems="center" gap="16px">
            <PortfolioStatCard />
            <PortfolioStatCard />
            <PortfolioStatCard />
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
}

export default Header