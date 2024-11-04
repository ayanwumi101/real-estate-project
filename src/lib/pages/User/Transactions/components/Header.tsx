import { Box, Flex, Heading, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { HiPlus } from 'react-icons/hi2';
import FundWalletFlow from '~/lib/components/FundWalletFlow'


const Header = () => {
    const [showFundWalletModal, setShowFundWalletModal] = React.useState(false);
  return (
    <Box borderY="1px solid #E4E4E4" py='35px' px='40px'>
      <Box>
        <Flex alignItems="center" justifyContent="space-between">
          <Heading fontSize={24} fontWeight={500} color="#222222">
            Transactions
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
                onClick={() => setShowFundWalletModal(true)}
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
        <FundWalletFlow isOpen={showFundWalletModal} onClose={() => setShowFundWalletModal(false)}  />
    </Box>
  );
}

export default Header