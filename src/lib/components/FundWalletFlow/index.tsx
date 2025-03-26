import React from 'react'
import CustomModal from '../Modal'
import { Box, Button, Heading, Flex, Text, Stack, Input, FormLabel, RadioGroup, Radio } from '@chakra-ui/react'
import { CopyIcon, DirectBankTransferIcon, PayWithCardIcon } from '../Icons/Icons';



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
            _hover={{ bg: '#000080' }}
          >
            I’ve made transfer
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};



const PaymentType = ({
  step,
  setStep,
  onClose,
}: {
  step: number;
  onClose: () => void;
  setStep: (value: number) => void;
}) => {
  return (
    <Box>
      <Stack spacing="32px">
        <Box>
          <Heading
            fontSize={24}
            color="#000080"
            fontWeight={500}
            borderBottom="1px solid #D8D8FF"
            pb="10px"
            mb="12px"
          >
            Select Payment Type
          </Heading>
          <Text>
            How would you like to deposit ₦6,000,000 into your wallet?
          </Text>
        </Box>
        <RadioGroup>
          <Stack spacing="32px">
            <Radio size="lg" spacing="10px">
              <Flex alignItems="center" gap="10px">
                <DirectBankTransferIcon />
                <Stack justifyContent="space-between">
                  <Text fontSize={16} fontWeight={600} color="#000080">
                    Direct Bank Transfer
                  </Text>
                  <Text color="#2E353F" fontWeight={500}>
                    Fee: ₦ 20
                  </Text>
                </Stack>
              </Flex>
            </Radio>
            <Radio size="lg" spacing="10px">
              <Flex alignItems="center" gap="10px">
                <PayWithCardIcon />
                <Stack justifyContent="space-between">
                  <Text fontSize={16} fontWeight={600} color="#000080">
                    Debit/Credit Card
                  </Text>
                  <Text color="#2E353F" fontWeight={500}>
                    Fee: ₦ 10
                  </Text>
                </Stack>
              </Flex>
            </Radio>
          </Stack>
        </RadioGroup>
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
            _hover={{ bg: '#000080' }}
            color="#ffffff"
            fontWeight={600}
            w="182px"
            onClick={() => setStep(step + 1)}
          >
            Continue
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};



const DepositToWallet = ({step, setStep, onClose}:{step: number, onClose: () => void, setStep: (value: number) => void}) => {
    return (
      <Box>
        <Stack spacing="32px">
          <Box>
            <Heading
              fontSize={24}
              color="#000080"
              fontWeight={500}
              borderBottom="1px solid #D8D8FF"
              pb="10px"
              mb="12px"
            >
              Deposit to Wallet
            </Heading>
            <Text>How much would you like to fund your wallet?</Text>
          </Box>
          <Box>
            <Box>
              <FormLabel
                mb="13px"
                color="#222222"
                fontWeight={600}
                fontSize={16}
              >
                How much would you like to deposit in your wallet?
              </FormLabel>
              <Input
                type="tel"
                _focus={{ border: '1px solid #000080' }}
                border="1px solid #D8D8FF"
                borderRadius="50px"
                placeholder="₦ 0.00"
                h="50px"
                mb="13px"
              />
              <Text color="#2E353F" fontWeight={500}>
                Min Deposit is ₦ 10,000
              </Text>
            </Box>
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
              _hover={{ bg: '#000080' }}
              color="#ffffff"
              fontWeight={600}
              w="182px"
              onClick={() => setStep(step + 1)}
            >
              Continue
            </Button>
          </Flex>
        </Stack>
      </Box>
    );
}



const index = ({isOpen, onClose}:{isOpen: boolean, onClose: () => void}) => {
    const [step, setStep] = React.useState(1)
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <Box>
        {step === 1 && (
          <DepositToWallet step={step} setStep={setStep} onClose={onClose} />
        )}
        {step === 2 && (
          <PaymentType step={step} setStep={setStep} onClose={onClose} />
        )}
        {step === 3 && (
          <AccountDetails step={step} setStep={setStep} onClose={onClose} />
        )}
      </Box>
    </CustomModal>
  );
}

export default index