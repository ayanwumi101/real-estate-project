import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Flex,
  Select,
  Button, Checkbox, FormErrorMessage, useToast, Spinner
} from '@chakra-ui/react';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { UpdateAssetPaymentPlan } from '~/lib/api/services/assetsService';


const PaymentPlan = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    propertyCost: Yup.string().required('Property cost is required'),
    propertyValue: Yup.string().required('Property value is required'),
    paymentDuration: Yup.string().required('Payment duration is required'),
    amountPaid: Yup.string().required('Amount paid is required'),
    amountLeft: Yup.string().required('Amount left is required'),
    paymentPlan: Yup.string().required('Payment plan is required'),
    firstPaymentDate: Yup.string().required('First payment date is required'),
    nextDueDate: Yup.string().required('Next due date is required'),
  });

  // Initial form values
  const initialValues = {
    propertyCost: '',
    propertyValue: '',
    paymentDuration: '',
    amountPaid: '',
    amountLeft: '',
    paymentPlan: '',
    firstPaymentDate: '',
    nextDueDate: '',
  };

  // Handle form submission
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = {
      property_cost: values.propertyCost,
      property_value: values.propertyValue,
      duration: values.paymentDuration,
      amount_left: values.amountLeft,
      payment_plan: values.paymentPlan,
      due_date: values.nextDueDate,
      bought_date: values.firstPaymentDate,
      amount_paid: values.amountPaid,
    };
    try {
      // const res = await UpdateAssetPaymentPlan(formData);
      // if (res.status === true) {
      //   toast({
      //     title: res.message as string,
      //     status: 'success',
      //     duration: 5000,
      //     isClosable: true,
      //   });
      //   setLoading(false);
      // }
    } catch (error) {
      toast({
        title: 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };
  return (
    <Box w="600px">
      <Stack spacing="24px">
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            How much does the property cost?
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
            What is the current value of this property?
          </FormLabel>
          <Input
            border="1px solid #C0C0C0"
            bg="#FBFBFB"
            h="50px"
            borderRadius="40px"
            placeholder="₦ 0, 00"
            _placeholder={{ color: '#8295AA', fontWeight: 500 }}
            mb="13px"
          />
          <Checkbox size="md">Not Sure</Checkbox>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            What is the duration of payment?
          </FormLabel>
          <Input
            border="1px solid #C0C0C0"
            bg="#FBFBFB"
            h="50px"
            borderRadius="40px"
            placeholder="0 months"
            _placeholder={{ color: '#8295AA', fontWeight: 500 }}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            How much have you paid so far?
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
            How much do you have left to pay?
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
            What payment plan do you follow?
          </FormLabel>
          <Select
            bg="#FBFBFB"
            border="1px solid #C0C0C0"
            borderRadius="50px"
            h="50px"
          >
            <option value="">Monthly</option>
            <option value="">Weekly</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            What is the date of first payment?
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
            When is the next due date for payment?
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
            minW="100px"
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

export default PaymentPlan;
