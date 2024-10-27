import React, { useContext } from 'react';
import { PropertyContext } from './PurchasePropertyFlow';
import {
  Box,
  Stack,
  Heading,
  Text,
  Select,
  FormLabel,
  Flex,
  Button,
  InputGroup,
  InputLeftAddon,
  Input,
  InputLeftElement,
} from '@chakra-ui/react';
import { TagIcon, CloseIcon } from '~/lib/components/Icons/Icons';




const AccountDetailsItem = ({
  label,
  value,
  valueColor,
  valueSize,
  labelSize
}: {
  label: string;
  value: string;
  valueColor?: string;
  valueSize?: string;
  labelSize?: string
}) => {
  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Text color="#2E353F" fontSize={labelSize ? labelSize : 16 } fontWeight={500}>
          {label}
        </Text>
        <Text
          color={valueColor ? valueColor : '#000080'}
          fontSize={valueSize ? valueSize : 16}
          fontWeight={600}
        >
          {value}
        </Text>
      </Flex>
    </Box>
  );
};



const SellPropertySummary = ({
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
          <Flex mb="12px" pb="10px" borderBottom="1px solid #D8D8FF" alignItems='center' justifyContent='space-between'>
            <Heading fontWeight={500} fontSize={24} color="#000080">
              Summary
            </Heading>
            <Button bg='none' p='0' onClick={onClose}>
              <CloseIcon />
            </Button>
          </Flex>

          <Text fontWeight={500} color="#2E353F">
            You are about selling 100 shares of Skyline Residences, Mini flat..
            You will receive ₦1,000,000 when your order is filled
            at ₦100,000 per share.
          </Text>
        </Box>
        <Box>
          <Stack spacing="25px">
            <AccountDetailsItem
              label="Asset"
              value="Skyline Residences (Mini Flat)"
            />
            <AccountDetailsItem label="Order Type" value="Market-Limit" />
            <AccountDetailsItem label="Current Holding" value="100 shares " />
            <AccountDetailsItem
              label="Selling"
              value="100 shares"
              valueColor="#EC191C"
            />
            <AccountDetailsItem label="Share Price" value="₦ 100,000" />
            <AccountDetailsItem label="Commission" value="₦ 200 " />
            <AccountDetailsItem
              label="Total"
              labelSize="20px"
              value="₦ 999,800"
              valueSize="20px"
            />
          </Stack>
        </Box>
        <Flex alignItems="center" gap="8px" justifyContent="flex-end">
          <Button
            onClick={() => setStep(step - 1)}
            bg="#EDEDFF"
            w="110px"
            color="#4040A0"
            fontWeight={600}
          >
            Back
          </Button>
          <Button
            bg="#EC191C"
            color="#ffffff"
            fontWeight={600}
            w="130px"
            onClick={onClose}
          >
            Sell Shares
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

const SellPropertyForm = ({
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
          <Heading color="#222222" fontWeight={600} fontSize={16} mb="12px">
            Skyline Residences
          </Heading>
          <Text color="#2E353F" fontWeight={500}>
            To invest now, enter the number or amount of shares you wish to buy{' '}
          </Text>
        </Box>
        <Box>
          <Stack spacing="25px">
            <Box>
              <FormLabel fontWeight={600} color="#222222" mb="1" fontSize={16}>
                Balance
              </FormLabel>
              <Select
                border="1px solid #C0C0C0"
                h="50px"
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
            </Box>
            <Box>
              <Flex gap="16px" alignItems="center">
                <Box w="50%">
                  <FormLabel
                    fontWeight={600}
                    color="#222222"
                    mb="1"
                    fontSize={16}
                  >
                    Holdings
                  </FormLabel>
                  <Select
                    border="1px solid #C0C0C0"
                    h="50px"
                    color="#222222"
                    outline="none"
                    focusBorderColor="#000080"
                    borderRadius="50px"
                  >
                    <option value="">100 Shares</option>
                    <option value="">200 Shares</option>
                    <option value="">5 Units</option>
                    <option value="">5 Units</option>
                  </Select>
                </Box>
                <Box w="50%">
                  <FormLabel
                    fontWeight={600}
                    color="#222222"
                    mb="1"
                    fontSize={16}
                  >
                    Corresponding Value
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
                </Box>
              </Flex>
            </Box>
            <Box>
              <Flex gap="16px" alignItems="center">
                <Box w="50%">
                  <FormLabel
                    fontWeight={600}
                    color="#222222"
                    mb="1"
                    fontSize={16}
                  >
                    Trade Type
                  </FormLabel>
                  <Select
                    border="1px solid #C0C0C0"
                    h="50px"
                    color="#222222"
                    outline="none"
                    focusBorderColor="#000080"
                    borderRadius="50px"
                  >
                    <option value="">Sell-market</option>
                    <option value="">200 Shares</option>
                    <option value="">5 Units</option>
                    <option value="">5 Units</option>
                  </Select>
                </Box>
                <Box w="50%">
                  <FormLabel
                    fontWeight={600}
                    color="#222222"
                    mb="1"
                    fontSize={16}
                  >
                    Current Price
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
                </Box>
              </Flex>
            </Box>
            <Box>
              <Flex alignItems="center" gap="16px">
                <Box w="50%">
                  <FormLabel
                    fontWeight={600}
                    color="#222222"
                    mb="1"
                    fontSize={16}
                  >
                    Number of Shares
                  </FormLabel>
                  <Text
                    color="#8295AA"
                    fontWeight={500}
                    fontSize={14}
                    mb="13px"
                  >
                    How much shares do you want to sell?
                  </Text>
                  <InputGroup
                    w="100%"
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                    h="50px"
                    _focus={{ boder: '#000080' }}
                  >
                    <InputLeftElement
                      h="50px"
                      color="#222222"
                      pointerEvents="none"
                    >
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
                </Box>
                <Box w="50%">
                  <FormLabel
                    fontWeight={600}
                    color="#222222"
                    mb="1"
                    fontSize={16}
                  >
                    Amount of Shares
                  </FormLabel>
                  <Text
                    color="#8295AA"
                    mb="13px"
                    fontWeight={500}
                    fontSize={14}
                  >
                    How much do you want to sell?
                  </Text>
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
                </Box>
              </Flex>
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
                onClick={() => {
                  setStep(step + 1);
                  console.log('step', step);
                }}
              >
                Continue
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

const SellPropertyFlow = () => {
  const { sellPropertyStep, setSellPropertyStep, onClose } =
    useContext<any>(PropertyContext);
  return (
    <Box>
      <Box>
        {sellPropertyStep === 1 && (
          <SellPropertyForm
            onClose={onClose}
            setStep={setSellPropertyStep}
            step={sellPropertyStep}
          />
        )}
        {sellPropertyStep === 2 && (
          <SellPropertySummary
            onClose={onClose}
            setStep={setSellPropertyStep}
            step={sellPropertyStep}
          />
        )}
      </Box>
    </Box>
  );
};

export default SellPropertyFlow;
