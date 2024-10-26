import { Box
, Button, Flex, Heading, Stack, Text,

 } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { PropertyContext } from './PurchasePropertyFlow'
import { CopyIcon } from '~/lib/components/Icons/Icons';




const AccountDetailsItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Text color="#2E353F" fontWeight={500}>
          {label}
        </Text>
        <Text color="#000080" fontWeight={600}>
          {value}
        </Text>
      </Flex>
    </Box>
  );
};

const AccountDetails = ({
  step,
  setStep,
  onClose,
}: {
  step: number;
  setStep: (value: number) => void;
  onClose: () => void;
}) => {
  return (
    <Box>
      <Stack spacing="30px">
        <Box>
          <Heading
            pb="10px"
            borderBottom="1px solid #D8D8FF"
            fontWeight={500}
            fontSize={24}
            color="#000080"
            mb="12px"
          >
            Naira Account Details
          </Heading>
          <Text fontWeight={500} color="#2E353F">
            Fund your wallet using our direct transfer method from any bank of
            your choice
          </Text>
        </Box>
        <Box>
          <Stack spacing="30px">
            <AccountDetailsItem
              label="Account Name"
              value="Real Estate Industry with us"
            />
            <Box>
              <Flex alignItems="center" justifyContent="space-between">
                <Text color="#2E353F" fontWeight={500}>
                  Account Number
                </Text>
                <Box>
                  <Flex alignItems="center" gap="15px">
                    <Text color="#000080" fontWeight={600}>
                      1234567890
                    </Text>
                    <Button bg="none" p="0">
                      <CopyIcon />
                    </Button>
                  </Flex>
                </Box>
              </Flex>
            </Box>
            <AccountDetailsItem label="Bank Name" value="Guaranty Trust Bank" />
            <AccountDetailsItem label="Fee" value="₦ 20 flat " />
          </Stack>
        </Box>
        <Flex alignItems="center" gap="8px" justifyContent="flex-end">
          <Button
            onClick={onClose}
            bg="#EDEDFF"
            w="110px"
            color="#4040A0"
            fontWeight={600}
          >
            Close
          </Button>
          <Button
            bg="#000080"
            color="#ffffff"
            fontWeight={600}
            w="182px"
            onClick={onClose}
          >
            I’ve made transfer
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};



const BuyPropertyFlow = () => {
  const { step, setStep, onClose } = useContext(PropertyContext)
  return (
    <Box>BuyPropertyFlow</Box>
  )
}

export default BuyPropertyFlow