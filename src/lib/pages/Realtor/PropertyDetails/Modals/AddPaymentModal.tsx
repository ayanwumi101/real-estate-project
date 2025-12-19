import {
  Heading,
  Text,
  Button,
  Input,
  InputLeftElement,
  InputGroup,
  Select,
  Stack,
  FormLabel,
  FormControl,
  Box,
  Flex,
  FormErrorMessage,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import CustomModal from '~/lib/components/Modal';
import { AddPaymentToInstalmentProperty } from '~/lib/api/services/propertiesService';
import * as yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { FormatAmount, formatCurrency } from '~/lib/utils/formatAmount';
import moment from 'moment';

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  instalmentId: string;
  dueDate: string | Date;
  clientId: string;
}

const AddPaymentModal = ({
  isOpen,
  onClose,
  instalmentId,
  dueDate,
  clientId,
}: AddPaymentModalProps) => {
  const toast = useToast();
  const [loading, setLoading] = React.useState(false);
  const [commission, setCommission] = React.useState<string>('');
  const [instalmentAmount, setInstalmentAmount] = React.useState<string>('');

  const initialValues = {
    due_date: '',
    amount: 0,
    payment_date: '',
    commission: 0,
    payment_status: 'paid',
  };

  // More robust date parsing that handles multiple formats
  const parsedDueDate = React.useMemo(() => {
    if (!dueDate) return null;

    // If it's already a Date object, use it
    if (dueDate instanceof Date) {
      return moment(dueDate).isValid() ? moment(dueDate).toDate() : null;
    }

    // Try parsing as ISO string first
    let parsed = moment(dueDate);

    // If that fails, try the specific format you mentioned
    if (!parsed.isValid()) {
      parsed = moment(dueDate, 'YYYY-MM-DD HH:mm:ss');
    }

    // If still invalid, try other common formats
    if (!parsed.isValid()) {
      parsed = moment(dueDate, [
        'YYYY-MM-DD',
        'DD/MM/YYYY',
        'MM/DD/YYYY',
        'YYYY-MM-DD HH:mm:ss',
      ]);
    }

    return parsed.isValid() ? parsed.toDate() : null;
  }, [dueDate]);

  const validationSchema = yup.object({
    due_date: yup
      .date()
      .typeError('Invalid date format')
      .required('Due date is required')
      .test(
        'min-date',
        `Due date cannot be earlier than ${
          parsedDueDate
            ? moment(parsedDueDate).format('MMMM DD, YYYY')
            : 'the specified date'
        }`,
        function (value) {
          if (!parsedDueDate) return true;
          if (!value) return true;
          return moment(value).isSameOrAfter(parsedDueDate, 'day');
        }
      ),

    amount: yup
      .number()
      .typeError('Amount must be a number')
      .positive('Amount must be greater than 0')
      .required('Amount is required'),

    payment_date: yup
      .date()
      .typeError('Invalid payment date')
      .test(
        'min-date',
        `Payment date cannot be earlier than ${
          parsedDueDate
            ? moment(parsedDueDate).format('MMMM DD, YYYY')
            : 'the specified date'
        }`,
        function (value) {
          if (!parsedDueDate) return true;
          if (!value) return true;
          return moment(value).isSameOrAfter(parsedDueDate, 'day');
        }
      )
      .when('payment_status', {
        is: 'completed',
        then: (schema) =>
          schema.required('Payment date is required when payment is completed'),
        otherwise: (schema) => schema.notRequired(),
      }),

    commission: yup
      .number()
      .typeError('Commission must be a number')
      .min(0, 'Commission cannot be negative')
      .when('payment_status', {
        is: 'completed',
        then: (schema) =>
          schema.required('Commission is required when payment is completed'),
        otherwise: (schema) => schema.notRequired(),
      }),

    payment_status: yup
      .string()
      .oneOf(['pending', 'completed'], 'Invalid payment status')
      .required('Payment status is required'),
  });

  const handleSubmit = async (values: any) => {
    const formData = {
      property_sale_id: instalmentId,
      client_id: clientId,
      amount_paid: Number(values.amount),
      payment_date: values.payment_date,
      due_date: values.due_date,
      commission: Number(values.commission),
      payment_status: values.payment_status,
    };

    console.log(formData);
    setLoading(true);

    try {
      await AddPaymentToInstalmentProperty(formData);
      toast({
        title: 'Payment added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });

      // Reset local state
      setCommission('');
      setInstalmentAmount('');

      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: 'Unable to add new instalment payment',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal size="xl" isOpen={isOpen} onClose={onClose}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue, setFieldTouched }) => {
          return (
            <Form>
              <Stack spacing="24px">
                <Heading fontSize={20} fontWeight={600}>
                  Add Instalment Payment
                </Heading>

                {parsedDueDate && (
                  <Box bg="blue.50" p="12px" borderRadius="8px">
                    <Text fontSize={14} color="blue.700">
                      <strong>Note:</strong> Due date must be on or after{' '}
                      {moment(parsedDueDate).format('MMMM DD, YYYY')}
                    </Text>
                  </Box>
                )}

                <Box>
                  <Stack spacing="20px">
                    <FormControl
                      isInvalid={
                        !!errors.payment_status && touched.payment_status
                      }
                    >
                      <FormLabel
                        fontSize={16}
                        fontWeight={600}
                        color="brand.300"
                      >
                        Payment Status
                      </FormLabel>
                      <Field
                        as={Select}
                        placeholder="Select payment status"
                        rounded="50px"
                        color="brand.800"
                        outline="none"
                        h="50px"
                        border="1px solid"
                        borderColor="border.200"
                        _focus={{ border: 'none', outline: 'none' }}
                        name="payment_status"
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </Field>
                      <FormErrorMessage>
                        {typeof errors.payment_status === 'string'
                          ? errors.payment_status
                          : ''}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={!!errors.due_date && touched.due_date}
                    >
                      <FormLabel
                        fontSize={16}
                        fontWeight={600}
                        color="brand.300"
                      >
                        Instalment Due Date
                      </FormLabel>
                      <Field
                        as={Input}
                        type="date"
                        placeholder="dd/mm/yyyy"
                        rounded="50px"
                        color="brand.800"
                        outline="none"
                        h="50px"
                        border="1px solid"
                        borderColor="border.200"
                        _focus={{ border: 'none', outline: 'none' }}
                        name="due_date"
                        min={
                          parsedDueDate
                            ? moment(parsedDueDate).format('YYYY-MM-DD')
                            : undefined
                        }
                      />
                      <FormErrorMessage>
                        {typeof errors.due_date === 'string'
                          ? errors.due_date
                          : ''}
                      </FormErrorMessage>
                    </FormControl>
                    {values.payment_status === 'completed' && (
                      <FormControl
                        isInvalid={
                          !!errors.payment_date && touched.payment_date
                        }
                      >
                        <FormLabel
                          fontSize={16}
                          fontWeight={600}
                          color="brand.300"
                        >
                          Payment Date
                        </FormLabel>
                        <Field
                          as={Input}
                          type="date"
                          placeholder="dd/mm/yyyy"
                          rounded="50px"
                          color="brand.800"
                          outline="none"
                          h="50px"
                          border="1px solid"
                          borderColor="border.200"
                          _focus={{ border: 'none', outline: 'none' }}
                          name="payment_date"
                          // isDisabled={values.payment_status === 'pending'}
                        />
                        <FormErrorMessage>
                          {typeof errors.payment_date === 'string'
                            ? errors.payment_date
                            : ''}
                        </FormErrorMessage>
                      </FormControl>
                    )}

                    <FormControl isInvalid={!!errors.amount && touched.amount}>
                      <FormLabel
                        fontSize={16}
                        fontWeight={600}
                        color="brand.300"
                      >
                        Instalment Amount
                      </FormLabel>
                      <Input
                        value={formatCurrency(instalmentAmount)}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/[^\d]/g, '');
                          setInstalmentAmount(rawValue);
                          setFieldValue('amount', rawValue);
                        }}
                        type="text"
                        placeholder="Enter instalment amount received"
                        rounded="50px"
                        color="brand.800"
                        outline="none"
                        h="50px"
                        border="1px solid"
                        borderColor="border.200"
                        _focus={{ border: 'none', outline: 'none' }}
                        name="amount"
                      />
                      <FormErrorMessage>
                        {typeof errors.amount === 'string' ? errors.amount : ''}
                      </FormErrorMessage>
                    </FormControl>
                    {values.payment_status === 'completed' && (
                      <FormControl
                        isInvalid={!!errors.commission && touched.commission}
                      >
                        <FormLabel
                          fontSize={16}
                          fontWeight={600}
                          color="brand.300"
                        >
                          Commission
                        </FormLabel>
                        <Input
                          type="text"
                          value={formatCurrency(commission)}
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(
                              /[^\d]/g,
                              ''
                            );
                            setCommission(rawValue);
                            setFieldValue('commission', rawValue);
                          }}
                          placeholder="Enter commission received"
                          rounded="50px"
                          color="brand.800"
                          outline="none"
                          h="50px"
                          border="1px solid"
                          borderColor="border.200"
                          _focus={{ border: 'none', outline: 'none' }}
                          name="commission"
                          // isDisabled={values.payment_status === 'pending'}
                        />
                        <FormErrorMessage>
                          {typeof errors.commission === 'string'
                            ? errors.commission
                            : ''}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Stack>
                </Box>

                <Box>
                  <Flex
                    alignItems="center"
                    gap="16px"
                    justifyContent="flex-end"
                  >
                    <Button
                      bg="brand.500"
                      color="brand.100"
                      fontWeight={500}
                      onClick={onClose}
                      fontSize={15}
                      px="30px"
                    >
                      Cancel
                    </Button>
                    <Button
                      bg="brand.100"
                      fontWeight={500}
                      color="brand.200"
                      px="40px"
                      type="submit"
                      isLoading={loading}
                    >
                      Save
                    </Button>
                  </Flex>
                </Box>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </CustomModal>
  );
};

export default AddPaymentModal;
