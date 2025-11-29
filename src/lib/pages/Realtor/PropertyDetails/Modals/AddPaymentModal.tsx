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
  dueDates: any[];
}

const AddPaymentModal = ({
  isOpen,
  onClose,
  instalmentId,
  dueDates,
}: AddPaymentModalProps) => {
  const toast = useToast();
  const [loading, setLoading] = React.useState(false);
  const [commission, setCommission] = React.useState<string>('');
  const [instalmentAmount, setInstalmentAmount] = React.useState<string>('');
  const initialValues = {
    schedule_id: '',
    amount: 0,
    payment_date: '',
    commission: 0,
    payment_status: 'paid',
  };

  const validationSchema = yup.object({
    schedule_id: yup.string().required('Schedule ID is required'),
    amount: yup.number().required('Amount is required'),
    payment_date: yup.date().required('Payment date is required'),
    commission: yup.number().required('Commission is required'),
    payment_status: yup.string().required('Payment status is required'),
  });

  const handleSubmit = async (values: any) => {
    const formData = {
      instalment_id: instalmentId,
      schedule_id: values.schedule_id,
      amount: Number(values.amount),
      payment_date: values.payment_date,
      commission: Number(values.commission),
      payment_status: values.payment_status,
    };
    console.log(formData);
    setLoading(true);
    try {
      const response = await AddPaymentToInstalmentProperty(formData);
      console.log(response);
      if (response.id) {
        toast({
          title: 'Payment added successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Unable to add new instalment payment',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
    setLoading(false);
  };

  console.log(dueDates, 'due dates');

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
                {/* <Box>
                  <Flex alignItems="center" gap="32px">
                    <Stack spacing="6px">
                      <Heading fontSize={16} fontWeight={600} color="brand.600">
                        Paid Instalment
                      </Heading>
                      <Text fontSize={16} fontWeight={500} color="brand.400">
                        {FormatAmount(Number(paidInstalment))}
                      </Text>
                    </Stack>
                    <Stack spacing="6px">
                      <Heading fontSize={16} fontWeight={600} color="brand.600">
                        Months Paid
                      </Heading>
                      <Text>{monthsPaid}</Text>
                    </Stack>
                  </Flex>
                </Box> */}
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
                        {errors.payment_status &&
                          touched.payment_status &&
                          errors.payment_status}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.schedule_id && touched.schedule_id}
                    >
                      <FormLabel
                        fontSize={16}
                        fontWeight={600}
                        color="brand.300"
                      >
                        Instalment Due Date
                      </FormLabel>
                      <Field
                        as={Select}
                        placeholder="Select Schedule Date"
                        rounded="50px"
                        color="brand.800"
                        outline="none"
                        h="50px"
                        border="1px solid"
                        borderColor="border.200"
                        _focus={{ border: 'none', outline: 'none' }}
                        name="schedule_id"
                      >
                        {dueDates?.map((item: any) => (
                          <option
                            key={item?.schedule_id}
                            value={item?.schedule_id}
                          >
                            {moment(item?.due_date).format(
                              'dddd, MMMM Do YYYY'
                            )}
                          </option>
                        ))}
                      </Field>
                      <FormErrorMessage>
                        {errors.schedule_id &&
                          touched.schedule_id &&
                          errors.schedule_id}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.payment_date && touched.payment_date}
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
                      />
                      <FormErrorMessage>
                        {errors.payment_date &&
                          touched.payment_date &&
                          errors.payment_date}
                      </FormErrorMessage>
                    </FormControl>
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
                        {errors.amount && touched.amount && errors.amount}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.payment_date && touched.payment_date}
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
                          const rawValue = e.target.value.replace(/[^\d]/g, '');
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
                      />
                      <FormErrorMessage>
                        {errors.commission &&
                          touched.commission &&
                          errors.commission}
                      </FormErrorMessage>
                    </FormControl>
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
                    >
                      {loading ? <Spinner /> : 'Save'}
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
