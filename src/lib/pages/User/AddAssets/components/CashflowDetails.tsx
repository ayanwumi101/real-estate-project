import React, { useState } from 'react';
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Flex,
  Select,
  Button,
  Checkbox, Spinner
} from '@chakra-ui/react';

const CashflowDetails = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  return (
    <Box w="600px">
      <Stack spacing="24px">
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
            <option value="">Monthly</option>
            <option value="">Weekly</option>
            <option value="">Daily</option>
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
        <Flex justifyContent="flex-end">
          <Button
            bg="#000080"
            color="white"
            h="48px"
            borderRadius="30px"
            fontWeight={600}
            fontSize={16}
            _hover={{ bg: '#000080' }}
            type="submit"
          >
            {loading ? <Spinner /> : 'Complete'}
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default CashflowDetails;
