import React from 'react';
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Flex,
  Select,
  Button,
  Checkbox,
} from '@chakra-ui/react';

const CashflowDetails = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) => {
  return (
    <Box w="600px">
      <Stack spacing='24px'>
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            What is the cashflow source?
          </FormLabel>
          <Select
            bg="#FBFBFB"
            border="1px solid #C0C0C0"
            borderRadius="50px"
            h="50px"
          >
            <option value="">Shortlet</option>
            <option value="">Weekly</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            Is this property currently occupied?
          </FormLabel>
          <Select
            bg="#FBFBFB"
            border="1px solid #C0C0C0"
            borderRadius="50px"
            h="50px"
          >
            <option value="">Shortlet</option>
            <option value="">Weekly</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            When did you collect your last cashflow?
          </FormLabel>
          <Input
            border="1px solid #C0C0C0"
            bg="#FBFBFB"
            h="50px"
            borderRadius="40px"
            placeholder="₦ 0, 00"
            _placeholder={{ color: '#8295AA', fontWeight: 500 }}
            type="date"
          />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            What is the cashflow amount?
          </FormLabel>
          <Input
            border="1px solid #C0C0C0"
            bg="#FBFBFB"
            h="50px"
            borderRadius="40px"
            placeholder="₦ 0, 00"
            _placeholder={{ color: '#8295AA', fontWeight: 500 }}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            What is the cashflow duration?
          </FormLabel>
          <Select
            bg="#FBFBFB"
            border="1px solid #C0C0C0"
            borderRadius="50px"
            h="50px"
          >
            <option value="">Shortlet</option>
            <option value="">Weekly</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            What is your equity ownership?
          </FormLabel>
          <Input
            border="1px solid #C0C0C0"
            bg="#FBFBFB"
            h="50px"
            borderRadius="40px"
            placeholder="100%"
            _placeholder={{ color: '#8295AA', fontWeight: 500 }}
          />
        </FormControl>
      </Stack>
    </Box>
  );
};

export default CashflowDetails;
