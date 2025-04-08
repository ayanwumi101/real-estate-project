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
import React, { useState, useContext, useEffect } from 'react';
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
  const toast = useToast();
  const {
    assetData,
    setAssetData,
    step: parentStep,
    setStep: setParentStep,
  } = useContext<any>(CreateAssetContext);

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
    paymentDuration: assetData?.paymentDuration || '',
    amountPaid: assetData?.amountPaid || '',
    amountLeft: assetData?.amountLeft || '',
    paymentPlan: assetData?.paymentPlan || '',
    firstPaymentDate: assetData?.firstPaymentDate || '',
    nextDueDate: assetData?.nextDueDate || '',
  };

  // Handle form submission
  const handleSubmit = async (values: any) => {
    setAssetData({
      ...assetData,
      paymentDuration: values.paymentDuration,
      amountLeft: values.amountLeft,
      paymentPlan: values.paymentPlan,
      firstPaymentDate: values.firstPaymentDate,
      nextDueDate: values.nextDueDate,
      amountPaid: values.amountPaid,
    });
    setStep(step + 1);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue, values }) => {
        useEffect(() => {
          if (values.firstPaymentDate && values.paymentPlan) {
            const lastDate = new Date(values.firstPaymentDate);
            let nextDate;

            switch (values.paymentPlan) {
              case 'Daily':
                nextDate = new Date(lastDate);
                nextDate.setDate(lastDate.getDate() + 1);
                break;
              case 'Weekly':
                nextDate = new Date(lastDate);
                nextDate.setDate(lastDate.getDate() + 7);
                break;
              case 'Monthly':
                nextDate = new Date(lastDate);
                nextDate.setMonth(lastDate.getMonth() + 1);
                break;
              case 'Yearly':
                nextDate = new Date(lastDate);
                nextDate.setFullYear(lastDate.getFullYear() + 1);
                break;
              default:
                nextDate = '';
            }

            if (nextDate instanceof Date && !isNaN(nextDate.getTime())) {
              const formatted = nextDate.toISOString().split('T')[0];
              setFieldValue('nextDueDate', formatted);
            }
          }
        }, [values.firstPaymentDate, values.paymentPlan, setFieldValue]);
        return (
          <Form>
            <Box w={['100%', '100%', '600px']}>
              <Stack spacing="24px">
                <FormControl
                  isInvalid={
                    !!errors.paymentDuration && !!touched.paymentDuration
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
                  <FormErrorMessage>
                    {typeof errors.paymentDuration === 'string' &&
                      errors.paymentDuration}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.amountPaid && !!touched.amountPaid}
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
                  <FormErrorMessage>
                    {typeof errors.amountPaid === 'string' && errors.amountPaid}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.amountLeft && !!touched.amountLeft}
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
                  <FormErrorMessage>
                    {typeof errors.amountLeft === 'string' && errors.amountLeft}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.paymentPlan && !!touched.paymentPlan}
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
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </Field>
                  <FormErrorMessage>
                    {typeof errors.paymentPlan === 'string' &&
                      errors.paymentPlan}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.firstPaymentDate && !!touched.firstPaymentDate
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
                  <FormErrorMessage>
                    {typeof errors.firstPaymentDate === 'string' &&
                      errors.firstPaymentDate}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.nextDueDate && !!touched.nextDueDate}
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
                  <FormErrorMessage>
                    {typeof errors.nextDueDate === 'string' &&
                      errors.nextDueDate}
                  </FormErrorMessage>
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
                    onClick={() => setParentStep(parentStep - 1)}
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
                    Continue
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
