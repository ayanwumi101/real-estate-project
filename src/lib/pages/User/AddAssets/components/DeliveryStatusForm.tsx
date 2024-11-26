import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Flex,
  Select,
  Button,
} from '@chakra-ui/react';
import React from 'react';

const DeliveryStatusForm = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) => {
  return (
    <Box as="section" w="600px">
      <Stack spacing="24px">
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            What is the payment status?
          </FormLabel>
          <Select
            bg="#FBFBFB"
            border="1px solid #C0C0C0"
            borderRadius="50px"
            h="50px"
          >
            <option value="">Ongoing</option>
            <option value="">Pending</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            What is the allocation status?
          </FormLabel>
          <Select
            bg="#FBFBFB"
            border="1px solid #C0C0C0"
            borderRadius="50px"
            h="50px"
          >
            <option value="">Ongoing</option>
            <option value="">Pending</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            What is the documentation status?
          </FormLabel>
          <Select
            bg="#FBFBFB"
            border="1px solid #C0C0C0"
            borderRadius="50px"
            h="50px"
          >
            <option value="">Ongoing</option>
            <option value="">Pending</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            What is the handover status?
          </FormLabel>
          <Select
            bg="#FBFBFB"
            border="1px solid #C0C0C0"
            borderRadius="50px"
            h="50px"
          >
            <option value="">Ongoing</option>
            <option value="">Pending</option>
          </Select>
        </FormControl>
        <Flex justifyContent="flex-end" gap="20px">
          <Button
            color="#000080"
            bg="#EDEDFF"
            h="48px"
            borderRadius="30px"
            fontWeight={600}
            fontSize={16}
            _hover={{ bg: '#000080' }}
            onClick={() => setStep(step - 1)}
            minW='100px'
          >
            Back
          </Button>
          <Button
            bg="#000080"
            color="white"
            h="48px"
            borderRadius="30px"
            fontWeight={600}
            fontSize={16}
            _hover={{ bg: '#000080' }}
            onClick={() => setStep(step + 1)}
          >
            Continue
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default DeliveryStatusForm;
