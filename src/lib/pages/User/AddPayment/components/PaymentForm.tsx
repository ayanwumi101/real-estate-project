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
} from '@chakra-ui/react';
import { Field, Formik, Form } from 'formik';
import moment from 'moment';
import React, { useState } from 'react';
import * as Yup from 'yup';
import {
  AddAssetRemittance,
  AddPaymentToAsset,
} from '~/lib/api/services/assetsService';
import { formatCurrency } from '~/lib/utils/formatAmount';
import useNavigate from '~/lib/utils/useNavigate';

const initialValues = {
  paymentStatus: '',
  paymentDueDate: '',
  paymentDate: '',
  remittanceAmount: '',
};
const validationSchema = Yup.object().shape({
  paymentStatus: Yup.string().required('Payment status is required'),
  paymentDueDate: Yup.string().required('Payment due date is required'),
  paymentDate: Yup.string().required('Payment date is required'),
  remittanceAmount: Yup.number()
    .required('Remittance amount is required')
    .positive('Remittance amount must be a positive number'),
});

const PaymentForm = ({
  assetId,
  assetType,
  paymentDueDates,
}: {
  assetId: string | number;
  assetType: string;
  paymentDueDates: any[];
}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [remittanceAmount, setRemittanceAmount] = useState<string>('');

  const handleSubmit = async (
    values: typeof initialValues,
    resetForm: () => void
  ) => {
    setLoading(true);
    try {
      const response = await AddPaymentToAsset({
        payment_due_date: values.paymentDueDate,
        property_id: assetId,
        amount: values.remittanceAmount,
        status: values.paymentStatus,
        payment_date: values.paymentDate,
      });
      if (response.status === true) {
        toast({
          title: 'Success',
          description: 'Payment details added successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        resetForm();
        navigate(`/user/my-assets/${assetId}/payments`);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add payment details',
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
                  {/* {assetType === 'cashflow'
                    ? 'Remittance Due Date'
                    : 'Installment Due Date'} */}
                  Payment Due Date
                </FormLabel>
                {/* <Field
                  as={Select}
                  type="date"
                  h="50px"
                  rounded="40px"
                  border="1px solid"
                  borderColor="border.100"
                  bg="brand.700"
                  name="paymentDueDate"
                  placeholder="Select due date"
                  _placeholder={{ color: 'brand.800' }}
                >
                  {paymentDueDates.map((dueDate) => (
                    <option key={dueDate.id} value={dueDate.id}>
                      {moment(dueDate.due_date).format('dddd Do MMM, YYYY')}
                    </option>
                  ))}
                </Field> */}
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
                />
                <FormErrorMessage>{errors.paymentDate}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  !!errors.remittanceAmount && touched.remittanceAmount
                }
                isRequired
              >
                <FormLabel color="brand.300" fontWeight={600} fontSize={15}>
                  {assetType === 'cashflow'
                    ? 'Remittance Amount'
                    : 'Installment Amount'}
                </FormLabel>
                <Input
                  type="text"
                  value={formatCurrency(remittanceAmount)}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/[^\d]/g, '');
                    setRemittanceAmount(rawValue);
                    setFieldValue('remittanceAmount', rawValue);
                  }}
                  name="remittanceAmount"
                  bg="#FBFBFB"
                  border="1px solid #C0C0C0"
                  borderRadius="50px"
                  h="50px"
                  placeholder="₦ 0. 00"
                />
                <FormErrorMessage>{errors.remittanceAmount}</FormErrorMessage>
              </FormControl>
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
