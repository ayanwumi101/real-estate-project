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
import React, { useState } from 'react';
import * as Yup from 'yup';
import { AddAssetRemittance } from '~/lib/api/services/assetsService';
import { formatCurrency } from '~/lib/utils/formatAmount';
import useNavigate from '~/lib/utils/useNavigate';

const initialValues = {
  paymentStatus: '',
  remittanceDueDate: '',
  paymentDate: '',
  remittanceAmount: '',
};
const validationSchema = Yup.object().shape({
  paymentStatus: Yup.string().required('Payment status is required'),
  remittanceDueDate: Yup.string().required('Remittance due date is required'),
  paymentDate: Yup.string().required('Payment date is required'),
  remittanceAmount: Yup.number()
    .required('Remittance amount is required')
    .positive('Remittance amount must be a positive number'),
});

const PaymentForm = ({ assetId }: { assetId: string | number }) => {
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
      const response = await AddAssetRemittance(assetId, {
        remittance_due_date: values.remittanceDueDate,
        last_cashflow: values.paymentDate,
        amount: values.remittanceAmount,
        status: values.paymentStatus,
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
                  <option value="ongoing">Ongoing</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </Field>
                <FormErrorMessage>{errors.paymentStatus}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  !!errors.remittanceDueDate && touched.remittanceDueDate
                }
                isRequired
              >
                <FormLabel color="brand.300" fontWeight={600} fontSize={15}>
                  Remittance Due Date
                </FormLabel>
                <Field
                  as={Input}
                  type="date"
                  h="50px"
                  rounded="40px"
                  border="1px solid"
                  borderColor="border.100"
                  bg="brand.700"
                  name="remittanceDueDate"
                  placeholder="Select due date"
                  _placeholder={{ color: 'brand.800' }}
                />
                <FormErrorMessage>{errors.remittanceDueDate}</FormErrorMessage>
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
                  Remittance Amount
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
                {/* <Field
                  as={Input}
                  h="50px"
                  rounded="40px"
                  border="1px solid"
                  borderColor="border.100"
                  bg="brand.700"
                  type="text"
                  name="remittanceAmount"
                /> */}
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
