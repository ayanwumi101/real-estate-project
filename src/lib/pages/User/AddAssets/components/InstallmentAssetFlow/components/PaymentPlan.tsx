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
  FormErrorMessage,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { UpdateAssetPaymentPlan } from '~/lib/api/services/assetsService';
import Cookie from 'js-cookie';
import { CreateAssetContext } from '../../..';




const PaymentPlan = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const assetId = Cookie.get('vestier-asset-id');
  const toast = useToast();
  const {assetData,setAssetData} = useContext<any>(CreateAssetContext);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    paymentDuration: Yup.string().required('Payment duration is required'),
    amountPaid: Yup.string().required('Amount paid is required'),
    amountLeft: Yup.string().required('Amount left is required'),
    paymentPlan: Yup.string().required('Payment plan is required'),
    firstPaymentDate: Yup.string().required('First payment date is required'),
    nextDueDate: Yup.string().required('Next due date is required'),
  });

  // Initial form values
  const initialValues = {
    paymentDuration: '',
    amountPaid: '',
    amountLeft: '',
    paymentPlan: '',
    firstPaymentDate: '',
    nextDueDate: '',
  };

  // Handle form submission
  const handleSubmit = async (values: any) => {
    const formData = {
      duration: values.paymentDuration,
      amount_left: values.amountLeft,
      payment_plan: values.paymentPlan,
      due_date: values.nextDueDate,
      payment_date: values.firstPaymentDate,
      amount_paid: values.amountPaid,
    };
    setLoading(true);
    try {
      const res = await UpdateAssetPaymentPlan(assetId, formData);
      if (res.status === true) {
        toast({
          title: res.message as string,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        setLoading(false);
        setStep(step + 1);
        setAssetData({ ...assetData, formData });
      }
    } catch (error) {
      toast({
        title: 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      setLoading(false);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue, values }) => {
        return (
          <Form>
            <Box w={['100%', '100%', '600px']}>
              <Stack spacing="24px">
                <FormControl
                  isInvalid={
                    !!errors.paymentDuration && touched.paymentDuration
                  }
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    What is the duration of payment?
                  </FormLabel>
                  <Field
                    as={Input}
                    name="paymentDuration"
                    border="1px solid #C0C0C0"
                    bg="#FBFBFB"
                    h="50px"
                    borderRadius="40px"
                    placeholder="0 months"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                  />
                  <FormErrorMessage>{errors.paymentDuration}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.amountPaid && touched.amountPaid}
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    How much have you paid so far?
                  </FormLabel>
                  <Field
                    as={Input}
                    name="amountPaid"
                    border="1px solid #C0C0C0"
                    bg="#FBFBFB"
                    h="50px"
                    borderRadius="40px"
                    placeholder="₦ 0, 00"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                  />
                  <FormErrorMessage>{errors.amountPaid}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.amountLeft && touched.amountLeft}
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    How much do you have left to pay?
                  </FormLabel>
                  <Field
                    as={Input}
                    name="amountLeft"
                    border="1px solid #C0C0C0"
                    bg="#FBFBFB"
                    h="50px"
                    borderRadius="40px"
                    placeholder="₦ 0, 00"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                  />
                  <FormErrorMessage>{errors.amountLeft}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.paymentPlan && touched.paymentPlan}
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    What payment plan do you follow?
                  </FormLabel>
                  <Field
                    as={Select}
                    name="paymentPlan"
                    bg="#FBFBFB"
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                    h="50px"
                    placeholder="Select"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Daily">Daily</option>
                  </Field>
                  <FormErrorMessage>{errors.paymentPlan}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.firstPaymentDate && touched.firstPaymentDate
                  }
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    What is the date of first payment?
                  </FormLabel>
                  <Field
                    as={Input}
                    name="firstPaymentDate"
                    border="1px solid #C0C0C0"
                    bg="#FBFBFB"
                    h="50px"
                    borderRadius="40px"
                    placeholder="₦ 0, 00"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                    type="date"
                  />
                  <FormErrorMessage>{errors.firstPaymentDate}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.nextDueDate && touched.nextDueDate}
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    When is the next due date for payment?
                  </FormLabel>
                  <Field
                    as={Input}
                    name="nextDueDate"
                    border="1px solid #C0C0C0"
                    bg="#FBFBFB"
                    h="50px"
                    borderRadius="40px"
                    placeholder="₦ 0, 00"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                    type="date"
                  />
                  <FormErrorMessage>{errors.nextDueDate}</FormErrorMessage>
                </FormControl>
                <Flex justifyContent="flex-end" gap="20px">
                  <Button
                    color="#000080"
                    bg="#EDEDFF"
                    h="48px"
                    borderRadius="30px"
                    fontWeight={600}
                    fontSize={16}
                    _hover={{ bg: '#EDEDFF' }}
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
                    type="submit"
                    minW="150px"
                  >
                    {loading ? <Spinner /> : 'Continue'}
                  </Button>
                </Flex>
              </Stack>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PaymentPlan;
