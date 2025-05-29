'use client';

import React, { useContext, useEffect, useState } from 'react';
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
import { formatCurrency } from '~/lib/utils/formatAmount';
import { ChevronLeftIcon } from '~/lib/components/Icons/Icons';

const CashflowDetails = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) => {
  const { assetData, setAssetData } = useContext<any>(CreateAssetContext);
  const [cashflowAmount, setCashflowAmount] = useState<string>('');

  const initialValues = {
    cashflowSource: assetData?.cashflowSource || '',
    isPropertyOccupied: assetData?.isPropertyOccupied || '',
    lastCashflowDate: assetData?.lastCashflowDate || '',
    nextCashflowDate: assetData?.nextCashflowDate || '',
    cashflowAmount: assetData?.cashflowAmount || '',
    cashflowDuration: assetData?.cashflowDuration || '',
    equityOwnership: assetData?.equityOwnership || '',
  };

  const validationSchema = Yup.object().shape({
    cashflowSource: Yup.string().required('Cashflow source is required'),
    isPropertyOccupied: Yup.string().required('This field is required'),
    lastCashflowDate: Yup.string().when('isPropertyOccupied', {
      is: 'Yes',
      then: (schema) => schema.required('Last cashflow date is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
    nextCashflowDate: Yup.string().when(
      ['lastCashflowDate', 'isPropertyOccupied'],
      {
        is: (lastCashflowDate: string, isPropertyOccupied: string) =>
          lastCashflowDate !== 'never collected' &&
          isPropertyOccupied === 'Yes',
        then: (schema) => schema.required('Next cashflow date is required'),
        otherwise: (schema) => schema.notRequired(),
      }
    ),
    cashflowAmount: Yup.string().required('Cashflow amount is required'),
    cashflowDuration: Yup.string().required('Cashflow duration is required'),
    equityOwnership: Yup.string().required('Equity ownership is required'),
  });

  const handleSubmit = async (values: any) => {
    setAssetData({
      ...assetData,
      cashflowSource: values.cashflowSource,
      isPropertyOccupied: values.isPropertyOccupied === 'Yes' ? true : false,
      lastCashflowDate: values.lastCashflowDate,
      nextCashflowDate: values.nextCashflowDate,
      cashflowAmount: values.cashflowAmount,
      cashflowDuration: values.cashflowDuration,
      equityOwnership: values.equityOwnership,
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
          if (
            values.lastCashflowDate &&
            values.lastCashflowDate !== 'never collected' &&
            values.cashflowDuration
          ) {
            const lastDate = new Date(values.lastCashflowDate);
            let nextDate;

            switch (values.cashflowDuration) {
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
              setFieldValue('nextCashflowDate', formatted);
            }
          }
        }, [values.lastCashflowDate, values.cashflowDuration, setFieldValue]);
        return (
          <Form>
            <Box w={['100%', '100%', '600px']}>
              <Stack spacing="24px">
                <FormControl
                  isInvalid={
                    !!errors.cashflowSource && !!touched.cashflowSource
                  }
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
                    placeholder="Select"
                  >
                    <option value="Rent">Rent</option>
                    <option value="Lease">Lease</option>
                    <option value="Shortlet">Shortlet</option>
                  </Field>
                  <FormErrorMessage>
                    {typeof errors.cashflowSource === 'string'
                      ? errors.cashflowSource
                      : null}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.isPropertyOccupied && !!touched.isPropertyOccupied
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
                    placeholder="Select"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Field>
                  <FormErrorMessage>
                    {typeof errors.isPropertyOccupied === 'string'
                      ? errors.isPropertyOccupied
                      : null}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.cashflowDuration && !!touched.cashflowDuration
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
                    placeholder="Select"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </Field>
                  <FormErrorMessage>
                    {typeof errors.cashflowDuration === 'string'
                      ? errors.cashflowDuration
                      : null}
                  </FormErrorMessage>
                </FormControl>
                {values.isPropertyOccupied === 'Yes' && (
                  <FormControl
                    isInvalid={
                      !!errors.lastCashflowDate && !!touched.lastCashflowDate
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
                      disabled={values.lastCashflowDate === 'never collected'}
                    />
                    <Checkbox
                      size="lg"
                      onChange={(e) =>
                        setFieldValue(
                          'lastCashflowDate',
                          e.target.checked ? 'never collected' : ''
                        )
                      }
                      isChecked={values.lastCashflowDate === 'never collected'}
                    >
                      Never collected
                    </Checkbox>
                    <FormErrorMessage>
                      {typeof errors.lastCashflowDate === 'string'
                        ? errors.lastCashflowDate
                        : null}
                    </FormErrorMessage>
                  </FormControl>
                )}

                {values.lastCashflowDate !== 'never collected' &&
                  values.isPropertyOccupied === 'Yes' && (
                    <FormControl
                      isInvalid={
                        !!errors.nextCashflowDate && !!touched.nextCashflowDate
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
                      />
                      <FormErrorMessage>
                        {typeof errors.nextCashflowDate === 'string'
                          ? errors.nextCashflowDate
                          : null}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                <FormControl
                  isInvalid={
                    !!errors.cashflowAmount && !!touched.cashflowAmount
                  }
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    What is the cashflow amount?
                  </FormLabel>
                  <Input
                    type="text"
                    value={formatCurrency(cashflowAmount)}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, '');
                      setCashflowAmount(rawValue);
                      setFieldValue('cashflowAmount', rawValue);
                    }}
                    name="cashflowAmount"
                    border="1px solid #C0C0C0"
                    bg="#FBFBFB"
                    h="50px"
                    borderRadius="40px"
                    placeholder="₦ 0, 00"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                  />
                  <FormErrorMessage>
                    {typeof errors.cashflowAmount === 'string'
                      ? errors.cashflowAmount
                      : null}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.equityOwnership && !!touched.equityOwnership
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
                    placeholder="e.g. 50%"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                    type="date"
                  />
                  <FormErrorMessage>
                    {typeof errors.equityOwnership === 'string'
                      ? errors.equityOwnership
                      : null}
                  </FormErrorMessage>
                </FormControl>
                <Flex justifyContent="flex-end" gap="10px">
                  <Button
                    leftIcon={<ChevronLeftIcon />}
                    color="brand.100"
                    fontWeight={600}
                    variant="ghost"
                    _hover={{ bg: 'none' }}
                    onClick={() => setStep(step - 1)}
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

export default CashflowDetails;
