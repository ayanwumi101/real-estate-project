'use client'

import { Box
, Button, Flex, Heading, Stack, Text,
FormControl, FormLabel, Input, InputGroup, InputLeftAddon, InputLeftElement, Select

 } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { PropertyContext } from './PurchasePropertyFlow'
import { CopyIcon, TagIcon } from '~/lib/components/Icons/Icons';
import Loader from '~/lib/components/Loader/Loader';




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
            _hover={{ bg: '#EDEDFF' }}
          >
            Close
          </Button>
          <Button
            bg="#000080"
            color="#ffffff"
            fontWeight={600}
            w="182px"
            onClick={onClose}
            _hover={{ bg: 'brand.100' }}
          >
            I’ve made transfer
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};


const BuyPropertyForm = ({
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
            _hover={{ bg: '#EDEDFF' }}
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
            _hover={{ bg: 'brand.100' }}
          >
            Continue
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};



const BuyPropertyFlow = () => {
  const { subStep, setSubStep, onClose } = useContext<any>(PropertyContext);
  return (
    <Box>
      <Box>
        {subStep === 1 && (
          <BuyPropertyForm onClose={onClose} setStep={setSubStep} step={subStep} />
        )}
        {subStep === 2 && (
          <AccountDetails onClose={onClose} setStep={setSubStep} step={subStep} />
        )}
      </Box>
    </Box>
  );
};

export default BuyPropertyFlow