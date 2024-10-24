'use client'

import { Box, Heading, Text, Button, Stack, Flex, Input, FormControl, FormLabel, Select } from '@chakra-ui/react'
import React from 'react'
import CustomModal from '~/lib/components/Modal'


const AccountDetails = ({
  step,
  setStep,
  onClose,
}: {
  step: number;
  setStep: (value: number) => void;
  onClose: () => void;
}) => {
  return <Box></Box>;
};



const LoadingModal = ({
  step,
  setStep,
  onClose,
}: {
  step: number;
  setStep: (value: number) => void;
  onClose: () => void;
}) => {
  return <Box></Box>;
};


const BuyOrSellProperty = ({
  step,
  setStep,
  onClose,
}: {
  step: number;
  setStep: (value: number) => void;
  onClose: () => void;
}) => {
    const [activeTab, setActiveTab] = React.useState('buy');
    const tabs = ['buy', 'sell'];
  return (
    <Box>
      <Box mb="20px">
        <Flex borderBottom="1px solid #D8D8FF">
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              bg="none"
              color={activeTab === tab ? '#000080' : '#ABABFF'}
              fontWeight={500}
              fontSize={24}
              w="50%"
              borderBottom={activeTab === tab ? '1px solid #000080' : 'none'}
              borderRadius="0"
              textTransform="uppercase"
            >
              {tab}
            </Button>
          ))}
        </Flex>
      </Box>
      <Text color="#2E353F" mb='30px' fontWeight={500}>
        To invest now, enter the number or amount of shares you wish to buy
      </Text>
      <Stack spacing="30px">
        <FormControl>
          <FormLabel>Number of shares</FormLabel>
          <Input type="number" />
        </FormControl>
        <FormControl>
          <FormLabel>Amount</FormLabel>
          <Input type="number" />
        </FormControl>
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
            w="160px"
            onClick={() => setStep(step + 1)}
          >
            Continue
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};


const PropertyDetailsCard = ({step, setStep, onClose}:{step: number, setStep: (value: number) => void, onClose: () => void}) => {
    return (
      <Box>
        <Stack spacing="10px">
          <Box mb="20px">
            <Heading
              fontWeight={600}
              color="#4040A0"
              fontSize={24}
              borderBottom="1px solid #4040A0"
              pb="10px"
              mb="15px"
            >
              Mini Flat – ₦15M (150,000M/share)
            </Heading>
            <Text color="#222222" fontWeight={500} mb="10px">
              1 sitting room, 1 bedroom, one toilet and bathroom, kitchen
            </Text>
            <Text color="#222222" fontWeight={500} mb="10px">
              To invest now, enter the number or amount of shares you wish to
              buy{' '}
            </Text>
          </Box>
          <Flex alignItems="center" gap="8px" justifyContent="flex-end">
            <Button onClick={onClose} bg="#EDEDFF" w='110px' color="#4040A0" fontWeight={600}>
              Close
            </Button>
            <Button
              bg="#000080"
              color="#ffffff"
              fontWeight={600}
              w='160px'
              onClick={() => setStep(step + 1)}
            >
              Buy now
            </Button>
          </Flex>
        </Stack>
      </Box>
    );
}


const PurchasePropertyFlow = ({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) => {
  const [step, setStep] = React.useState(1)
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <Box>
        {step === 1 && (
          <PropertyDetailsCard
            onClose={onClose}
            setStep={setStep}
            step={step}
          />
        )}
        {step === 2 && (
          <BuyOrSellProperty onClose={onClose} setStep={setStep} step={step} />
        )}
        {step === 3 && (
          <LoadingModal onClose={onClose} setStep={setStep} step={step} />
        )}
        {step === 4 && (
          <AccountDetails onClose={onClose} setStep={setStep} step={step} />
        )}
      </Box>
    </CustomModal>
  );
}

export default PurchasePropertyFlow