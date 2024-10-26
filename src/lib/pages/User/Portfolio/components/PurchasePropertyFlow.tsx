'use client';

import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Flex,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Select,
  InputLeftAddon,
} from '@chakra-ui/react';
import React, { createContext } from 'react';
import { CopyIcon, TagIcon } from '~/lib/components/Icons/Icons';
import Loader from '~/lib/components/Loader/Loader';
import CustomModal from '~/lib/components/Modal';
import BuyPropertyFlow from './BuyPropertyFlow';
import SellPropertyFlow from './SellPropertyFlow';
export const PropertyContext = createContext({});


const LoadingModal = ({
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
      <Loader />
    </Box>
  );
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
    <Box overflow="auto">
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
      {activeTab === 'buy' ? (
        <BuyPropertyFlow />
      ) : (
        <SellPropertyFlow />
      )}
      <Text color="#2E353F" mb="30px" fontWeight={500}>
        To invest now, enter the number or amount of shares you wish to buy
      </Text>
      <Stack spacing="20px">
        <FormControl>
          <FormLabel fontWeight={600} color="#222222" fontSize={16}>
            Preffered Unit
          </FormLabel>
          <Select
            style={{
              borderRadius: '50px',
              height: '50px',
              color: '#222222',
              padding: '0px 23px',
            }}
            placeholder="Select preffered unit"
            color="#222222"
            border="1px solid #C0C0C0"
            focusBorderColor="#000080"
          >
            <option value="">5 Units</option>
            <option value="">5 Units</option>
            <option value="">5 Units</option>
            <option value="">5 Units</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={600} color="#222222" fontSize={16}>
            Price per share
          </FormLabel>
          <InputGroup
            w="100%"
            border="1px solid #C0C0C0"
            borderRadius="50px"
            h="50px"
            _focus={{ boder: '1px solid #000080' }}
          >
            <InputLeftAddon
              pr="0"
              h="50px"
              color="#222222"
              pointerEvents="none"
            >
              ₦
            </InputLeftAddon>
            <Select
              border="none"
              h="50px"
              placeholder="0"
              color="#222222"
              outline="none"
              _focus={{ border: 'none', outline: 'none' }}
              pl="0"
            >
              <option value="">5 Units</option>
              <option value="">5 Units</option>
              <option value="">5 Units</option>
              <option value="">5 Units</option>
            </Select>
          </InputGroup>
        </FormControl>
        <FormControl>
          <Box mb="13px">
            <FormLabel fontWeight={600} color="#222222" mb="1" fontSize={16}>
              Number of Shares
            </FormLabel>
            <Text color="#8295AA" fontWeight={500} fontSize={14}>
              How much shares do you want to buy?
            </Text>
          </Box>
          <InputGroup
            w="100%"
            border="1px solid #C0C0C0"
            borderRadius="50px"
            h="50px"
            _focus={{ boder: '#000080' }}
          >
            <InputLeftElement h="50px" color="#222222" pointerEvents="none">
              <TagIcon />
            </InputLeftElement>
            <Select
              border="none"
              h="50px"
              placeholder="Select Share"
              color="#222222"
              outline="none"
              _focus={{ border: 'none', outline: 'none' }}
              pl="8"
            >
              <option value="">5 Units</option>
              <option value="">5 Units</option>
              <option value="">5 Units</option>
              <option value="">5 Units</option>
            </Select>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={600} color="#222222" mb="1" fontSize={16}>
            Amount
          </FormLabel>
          <InputGroup
            w="100%"
            border="1px solid #C0C0C0"
            borderRadius="50px"
            h="50px"
            _focus={{ boder: '1px solid #000080' }}
          >
            <InputLeftAddon
              pr="0"
              h="50px"
              color="#222222"
              pointerEvents="none"
            >
              ₦
            </InputLeftAddon>
            <Input
              border="none"
              h="50px"
              placeholder="0"
              color="#222222"
              outline="none"
              _focus={{ border: 'none', outline: 'none' }}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={600} color="#222222" mb="1" fontSize={16}>
            Source of Funds
          </FormLabel>
          <Select
            border="1px solid #C0C0C0"
            h="50px"
            placeholder="Select Share"
            color="#222222"
            outline="none"
            focusBorderColor="#000080"
            borderRadius="50px"
          >
            <option value="">My Wallet: ₦ 200,000</option>
            <option value="">5 Units</option>
            <option value="">5 Units</option>
            <option value="">5 Units</option>
          </Select>
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
            onClick={() => setStep(step + 2)}
          >
            Continue
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

const PropertyDetailsCard = ({
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
            To invest now, enter the number or amount of shares you wish to buy{' '}
          </Text>
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
            w="160px"
            onClick={() => setStep(step + 1)}
          >
            Buy now
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

const PurchasePropertyFlow = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = React.useState(1);
  return (
    <PropertyContext.Provider value={{ step, setStep, onClose }}>
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
            <BuyOrSellProperty
              onClose={onClose}
              setStep={setStep}
              step={step}
            />
          )}
          {/* {step === 3 && (
            <LoadingModal onClose={onClose} setStep={setStep} step={step} />
          )}
          {step === 4 && (
            <AccountDetails onClose={onClose} setStep={setStep} step={step} />
          )} */}
        </Box>
      </CustomModal>
    </PropertyContext.Provider>
  );
};

export default PurchasePropertyFlow;
