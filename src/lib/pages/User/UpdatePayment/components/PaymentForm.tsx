import {
  Box,
  Select,
  FormControl,
  Input,
  FormLabel,
  Button,
  Stack,
  FormErrorMessage,
  Spinner,
  useToast,
  Checkbox,
} from '@chakra-ui/react';
import { Field, Formik, Form } from 'formik';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import {
  AddAssetRemittance,
  AddPaymentToAsset,
  AddPaymentToInstalmentAsset,
} from '~/lib/api/services/assetsService';
import { formatCurrency } from '~/lib/utils/formatAmount';
import useNavigate from '~/lib/utils/useNavigate';
import {
  PaymentDetails,
  UpdatePaymentDetails,
} from '~/lib/api/services/dashboardService';

const validationSchema = Yup.object().shape({
  paymentStatus: Yup.string().required('Payment status is required'),
  paymentDueDate: Yup.string().required('Payment due date is required'),
  paymentDate: Yup.string().when('paymentStatus', {
    is: (value: string) => value === 'completed',
    then: () => Yup.string().required('Payment date is required'),
    otherwise: () => Yup.string().notRequired(),
  }),
  amount: Yup.number()
    .typeError('Remittance amount must be a number')
    .required('Remittance amount is required')
    .positive('Remittance amount must be a positive number'),
  nextPaymentDueDate: Yup.string().when('setNextDueDate', {
    is: true,
    then: () => Yup.string().required('Next payment due date is required'),
    otherwise: () => Yup.string().notRequired(),
  }),
  setNextDueDate: Yup.boolean(),
});

const PaymentForm = ({
  paymentDetails,
  GetNotifications,
}: {
  paymentDetails: PaymentDetails;
  GetNotifications?: () => Promise<void>;
}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');

  useEffect(() => {
    if (paymentDetails?.form_defaults?.amount) {
      setAmount(paymentDetails.form_defaults.amount.toString());
    }
  }, [paymentDetails]);

  // Calculate next payment due date based on payment interval
  const calculateNextDueDate = () => {
    const paymentDueDate = paymentDetails?.form_defaults?.payment_due_date;
    const paymentInterval = paymentDetails?.payment?.payment_interval;

    if (!paymentDueDate || !paymentInterval) return '';

    const dueDate = new Date(paymentDueDate);
    if (paymentInterval === 'weekly') {
      dueDate.setDate(dueDate.getDate() + 7);
    }
    // Add other intervals as needed (monthly, quarterly, etc.)

    return dueDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const initialValues = {
    paymentStatus: paymentDetails?.form_defaults?.status || '',
    paymentDueDate: paymentDetails?.form_defaults?.payment_due_date
      ? new Date(paymentDetails?.form_defaults?.payment_due_date)
          .toISOString()
          .split('T')[0]
      : '',
    paymentDate: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    amount: paymentDetails?.form_defaults?.amount?.toString() || '',
    setNextDueDate: false,
    nextPaymentDueDate: calculateNextDueDate(),
  };

  const handleSubmit = async (
    values: typeof initialValues,
    resetForm: () => void
  ) => {
    setLoading(true);
    try {
      await UpdatePaymentDetails(paymentDetails?.payment?.id, {
        payment_due_date: values.paymentDueDate,
        payment_date: values.paymentDate,
        amount: Number(values.amount),
        status: values.paymentStatus as 'completed' | 'pending',
        set_next_due_date: values.setNextDueDate,
        next_payment_due_date: values.setNextDueDate
          ? values.nextPaymentDueDate
          : null,
      });
      toast({
        title: 'Success',
        description: 'Payment details updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      resetForm();
      await GetNotifications?.();
      navigate(
        `/user/my-assets/${paymentDetails?.payment?.property_id}/payments`
      );
    } catch (error: any) {
      toast({
        title: 'Error',
        description:
          error?.response?.data?.error?.message ||
          'Failed to add payment details',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      rounded="5px"
      border="1px solid"
      borderColor="border.100"
      p={['15px', '30px']}
      bg="brand.200"
      w={['100%', '50%']}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
      >
        {({ isSubmitting, values, errors, touched, setFieldValue }) => (
          <Form>
            <Stack spacing="26px">
              <FormControl
                isInvalid={!!errors.paymentStatus && touched.paymentStatus}
                isRequired
              >
                <FormLabel color="brand.300" fontWeight={600} fontSize={15}>
                  Payment Status
                </FormLabel>
                <Field
                  as={Select}
                  h="50px"
                  rounded="40px"
                  border="1px solid"
                  borderColor="border.100"
                  bg="brand.700"
                  name="paymentStatus"
                  placeholder="Select payment status"
                  _placeholder={{ color: 'brand.800' }}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </Field>
                <FormErrorMessage>{errors.paymentStatus}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.paymentDueDate && touched.paymentDueDate}
                isRequired
              >
                <FormLabel color="brand.300" fontWeight={600} fontSize={15}>
                  Payment Due Date
                </FormLabel>
                <Field
                  as={Input}
                  h="50px"
                  rounded="40px"
                  border="1px solid"
                  borderColor="border.100"
                  bg="brand.700"
                  type="date"
                  name="paymentDueDate"
                  _placeholder={{ color: 'brand.800' }}
                  placeholder="Select payment date"
                />
                <FormErrorMessage>{errors.paymentDueDate}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.paymentDate && touched.paymentDate}
                isRequired
              >
                <FormLabel color="brand.300" fontWeight={600} fontSize={15}>
                  Payment Date
                </FormLabel>
                <Field
                  as={Input}
                  h="50px"
                  rounded="40px"
                  border="1px solid"
                  borderColor="border.100"
                  bg="brand.700"
                  type="date"
                  name="paymentDate"
                  _placeholder={{ color: 'brand.800' }}
                  placeholder="Select payment date"
                  isDisabled={values.paymentStatus === 'pending'}
                />
                <FormErrorMessage>{errors.paymentDate}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.amount && touched.amount}
                isRequired
              >
                <FormLabel color="brand.300" fontWeight={600} fontSize={15}>
                  Amount
                </FormLabel>
                <Input
                  type="text"
                  value={formatCurrency(amount)}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/[^\d]/g, '');
                    setAmount(rawValue);
                    setFieldValue('amount', rawValue);
                  }}
                  name="amount"
                  bg="#FBFBFB"
                  border="1px solid #C0C0C0"
                  borderRadius="50px"
                  h="50px"
                  placeholder="₦ 0. 00"
                />
                <FormErrorMessage>{errors.amount}</FormErrorMessage>
              </FormControl>
              {values.setNextDueDate && (
                <FormControl
                  isInvalid={
                    !!errors.nextPaymentDueDate && touched.nextPaymentDueDate
                  }
                >
                  <FormLabel color="brand.300" fontWeight={600} fontSize={15}>
                    Next Payment Due Date
                  </FormLabel>
                  <Field
                    as={Input}
                    h="50px"
                    rounded="40px"
                    border="1px solid"
                    borderColor="border.100"
                    bg="brand.700"
                    type="date"
                    name="nextPaymentDueDate"
                    _placeholder={{ color: 'brand.800' }}
                    placeholder="Select next payment due date"
                  />
                  <FormErrorMessage>
                    {errors.nextPaymentDueDate}
                  </FormErrorMessage>
                </FormControl>
              )}
              <Field name="setNextDueDate" type="checkbox">
                {({ field }: { field: any }) => (
                  <FormControl>
                    <Checkbox
                      {...field}
                      colorScheme="brand"
                      color="brand.300"
                      fontWeight={500}
                    >
                      Set next due date
                    </Checkbox>
                  </FormControl>
                )}
              </Field>
              <Button
                bg="brand.100"
                color="brand.200"
                fontWeight={500}
                type="submit"
                h="50px"
                _hover={{ bg: 'brand.100' }}
                isDisabled={loading}
              >
                {loading ? <Spinner /> : 'Save'}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PaymentForm;
