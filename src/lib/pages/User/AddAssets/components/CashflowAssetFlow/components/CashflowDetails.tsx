'use client';

import React, { useContext, useState } from 'react';
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
  Spinner,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { UpdateAssetCashflowDetails } from '~/lib/api/services/assetsService';
import Cookie from 'js-cookie';
import { CreateAssetContext } from '../../..';

const CashflowDetails = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const assetId = Cookie.get('vestier-asset-id');
  const { assetData, setAssetData } = useContext<any>(CreateAssetContext);
  const toast = useToast();

  const initialValues = {
    cashflowSource: '',
    isPropertyOccupied: '',
    lastCashflowDate: '',
    cashflowAmount: '',
    cashflowDuration: '',
    equityOwnership: '',
    nextCashflowDate: '',
  };

  const validationSchema = Yup.object().shape({
    cashflowSource: Yup.string().required('Cashflow source is required'),
    isPropertyOccupied: Yup.string().required('This field is required'),
    lastCashflowDate: Yup.string().required('Last cashflow date is required'),
    nextCashflowDate: Yup.string().required('Next cashflow date is required'),
    cashflowAmount: Yup.string().required('Cashflow amount is required'),
    cashflowDuration: Yup.string().required('Cashflow duration is required'),
    equityOwnership: Yup.string().required('Equity Ownership is required'),
  });

  const handleSubmit = async (values: any) => {
    setStep(step + 1);
    // setLoading(true);
    // const formData = {
    //   cashflow_source: values.cashflowSource,
    //   is_occupied: values.isPropertyOccupied,
    //   last_cashflow_date: values.lastCashflowDate,
    //   cashflow_amount: values.cashflowAmount,
    //   cashflow_duration: values.cashflowDuration,
    //   equity_ownership: values.equityOwnership,
    // };
    // try {
    //   const res = await UpdateAssetCashflowDetails(assetId, formData);
    //   if (res.status === true) {
    //     toast({
    //       title: res.message as string,
    //       description: 'Cashflow details updated successfully',
    //       status: 'success',
    //       duration: 3000,
    //       isClosable: true,
    //       position: 'top-right',
    //     });
    //     setStep(step + 1);
    //     setAssetData({ ...assetData, formData });
    //   }
    // } catch (error: any) {
    //   toast({
    //     title: 'An error occurred.',
    //     description: error.response.data.message,
    //     status: 'error',
    //     duration: 3000,
    //     isClosable: true,
    //     position: 'top-right',
    //   });
    // } finally {
    //   setLoading(false);
    // }
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
                  isInvalid={!!errors.cashflowSource && touched.cashflowSource}
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    What is the cashflow source?
                  </FormLabel>
                  <Field
                    as={Select}
                    bg="#FBFBFB"
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                    h="50px"
                    name="cashflowSource"
                  >
                    <option value="Shortlet">Shortlet</option>
                    <option value="Weekly">Weekly</option>
                  </Field>
                  <FormErrorMessage>{errors.cashflowSource}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.isPropertyOccupied && touched.isPropertyOccupied
                  }
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    Is this property currently occupied?
                  </FormLabel>
                  <Field
                    as={Select}
                    bg="#FBFBFB"
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                    h="50px"
                    name="isPropertyOccupied"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Field>
                  <FormErrorMessage>
                    {errors.isPropertyOccupied}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.cashflowDuration && touched.cashflowDuration
                  }
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    What is the cashflow duration?
                  </FormLabel>
                  <Field
                    as={Select}
                    name="cashflowDuration"
                    bg="#FBFBFB"
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                    h="50px"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Daily">Daily</option>
                  </Field>
                  <FormErrorMessage>{errors.cashflowDuration}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.lastCashflowDate && touched.lastCashflowDate
                  }
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    When did you collect your last cashflow?
                  </FormLabel>
                  <Field
                    as={Input}
                    name="lastCashflowDate"
                    border="1px solid #C0C0C0"
                    bg="#FBFBFB"
                    h="50px"
                    borderRadius="40px"
                    placeholder="₦ 0, 00"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                    type="date"
                    mb="2"
                    disabled={values.lastCashflowDate === 'Never Collected'}
                  />
                  <Checkbox
                    size="lg"
                    onChange={(e) =>
                      setFieldValue(
                        'lastCashflowDate',
                        e.target.checked ? 'Never Collected' : ''
                      )
                    }
                    isChecked={values.lastCashflowDate === 'Never Collected'}
                  >
                    Never collected
                  </Checkbox>
                  <FormErrorMessage>{errors.lastCashflowDate}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.nextCashflowDate && touched.nextCashflowDate
                  }
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    When is the next cashflow payment due?
                  </FormLabel>
                  <Field
                    as={Input}
                    name="nextCashflowDate"
                    border="1px solid #C0C0C0"
                    bg="#FBFBFB"
                    h="50px"
                    borderRadius="40px"
                    placeholder="₦ 0, 00"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                    type="date"
                    mb="2"
                  />
                  <FormErrorMessage>{errors.nextCashflowDate}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.cashflowAmount && touched.cashflowAmount}
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    What is the cashflow amount?
                  </FormLabel>
                  <Field
                    as={Input}
                    name="cashflowAmount"
                    border="1px solid #C0C0C0"
                    bg="#FBFBFB"
                    h="50px"
                    borderRadius="40px"
                    placeholder="₦ 0, 00"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                  />
                  <FormErrorMessage>{errors.cashflowAmount}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.equityOwnership && touched.equityOwnership
                  }
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    What is your equity ownership?
                  </FormLabel>
                  <Field
                    as={Input}
                    name="equityOwnership"
                    border="1px solid #C0C0C0"
                    bg="#FBFBFB"
                    h="50px"
                    borderRadius="40px"
                    placeholder="100%"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                  />
                  <FormErrorMessage>{errors.equityOwnership}</FormErrorMessage>
                </FormControl>
                <Flex justifyContent="flex-end" gap="10px">
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

export default CashflowDetails;
