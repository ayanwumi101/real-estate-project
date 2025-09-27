import React from 'react';
import {
  Text,
  Flex,
  Heading,
  Stack,
  Button,
  Select,
  Input,
  FormLabel,
  FormControl,
  Box,
  FormErrorMessage,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { CloseIcon } from '~/lib/components/Icons/Icons';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { formatCurrency } from '~/lib/utils/formatAmount';
import { CreateSoldPropertyPayment } from '~/lib/api/services/propertiesService';
import { useRouter } from 'next/navigation';

interface FormValues {
  clientName: string;
  amountSold: string;
  commissionReceived: string;
  dateSold: string;
  allocationStatus: string;
  documentationStatus: string;
  handoverStatus: string;
}

const initialValues: FormValues = {
  clientName: '',
  amountSold: '',
  commissionReceived: '',
  dateSold: '',
  allocationStatus: '',
  documentationStatus: '',
  handoverStatus: '',
};

const validationSchema = Yup.object({
  clientName: Yup.string().required('Client name is required'),
  amountSold: Yup.number()
    .typeError('Amount sold must be a number')
    .positive('Amount sold must be positive')
    .required('Amount sold is required'),
  commissionReceived: Yup.number()
    .typeError('Commission received must be a number')
    .positive('Commission received must be positive')
    .required('Commission received is required'),
  dateSold: Yup.date().required('Date sold is required'),
  allocationStatus: Yup.string().required('Allocation status is required'),
  documentationStatus: Yup.string().required(
    'Documentation status is required'
  ),
  handoverStatus: Yup.string().required('Handover status is required'),
});

const FullySoldProperty = ({
  clients,
  propertyId,
}: {
  clients: any[];
  propertyId: string;
}) => {
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [amountSold, setAmountSold] = React.useState<string>('');
  const [commissionReceived, setCommissionReceived] =
    React.useState<string>('');

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const response = await CreateSoldPropertyPayment({
        realtor_property_id: propertyId as string,
        client_id: values.clientName,
        amount_sold: Number(values.amountSold),
        commission: Number(values.commissionReceived),
        date_sold: values.dateSold,
        allocation_status: values.allocationStatus,
        documentation_status: values.documentationStatus,
        handover_status: values.handoverStatus,
        payment_plan: 'full_payment',
      });
      if (response.status === true) {
        toast({
          title: 'Success',
          description: 'Property sale registered successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        router.push('/realtor/properties');
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description:
          error?.response?.data?.message ||
          error?.error?.message ||
          'An error occurred while registering the property sale',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
    setLoading(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, setFieldValue, setFieldTouched }) => {
        return (
          <Form>
            <Box maxW="700px" mx="auto" px={['16px', 0]}>
              <Stack spacing="20px">
                <Heading fontSize={[20, 24]} color="brand.100" fontWeight={600}>
                  Register Property Sale
                </Heading>
                <FormControl
                  isInvalid={!!errors.clientName && touched.clientName}
                >
                  <FormLabel fontWeight={600} fontSize={15} color="brand.400">
                    Client's Name
                  </FormLabel>
                  <Field
                    as={Select}
                    placeholder="Select from client list"
                    rounded="50px"
                    color="brand.800"
                    outline="none"
                    h="50px"
                    border="1px solid"
                    borderColor="border.200"
                    bg="brand.700"
                    mb="10px"
                    name="clientName"
                  >
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {`${client.firstname} ${client.lastname}`}
                      </option>
                    ))}
                  </Field>
                  <FormErrorMessage>
                    {typeof errors.clientName === 'string'
                      ? errors.clientName
                      : ''}
                  </FormErrorMessage>
                  <Flex alignItems="center" gap="5px">
                    <Text fontWeight={500} fontSize={14} color="brand.400">
                      Can’t find the client?{' '}
                      <Box as="span" color="brand.100" cursor="pointer">
                        Create client profile
                      </Box>
                    </Text>
                  </Flex>
                </FormControl>
                <Flex
                  alignItems="center"
                  gap="24px"
                  flexWrap={['wrap', 'nowrap']}
                >
                  <FormControl
                    isInvalid={!!errors.amountSold && touched.amountSold}
                  >
                    <FormLabel fontWeight={600} fontSize={15} color="brand.400">
                      Amount Sold
                    </FormLabel>
                    <Input
                      type="text"
                      value={formatCurrency(amountSold)}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^\d]/g, '');
                        setAmountSold(rawValue);
                        setFieldValue('amountSold', rawValue);
                      }}
                      name="amountSold"
                      bg="#FBFBFB"
                      border="1px solid #C0C0C0"
                      borderRadius="50px"
                      h="50px"
                      placeholder="₦ 0. 00"
                    />
                    <FormErrorMessage>
                      {typeof errors.amountSold === 'string'
                        ? errors.amountSold
                        : ''}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      !!errors.commissionReceived && touched.commissionReceived
                    }
                  >
                    <FormLabel fontWeight={600} fontSize={15} color="brand.400">
                      Commission Received
                    </FormLabel>
                    <Input
                      type="text"
                      value={formatCurrency(commissionReceived)}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^\d]/g, '');
                        setCommissionReceived(rawValue);
                        setFieldValue('commissionReceived', rawValue);
                      }}
                      name="commissionReceived"
                      bg="#FBFBFB"
                      border="1px solid #C0C0C0"
                      borderRadius="50px"
                      h="50px"
                      placeholder="₦ 0. 00"
                    />
                    <FormErrorMessage>
                      {typeof errors.commissionReceived === 'string'
                        ? errors.commissionReceived
                        : ''}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
                <FormControl isInvalid={!!errors.dateSold && touched.dateSold}>
                  <FormLabel fontWeight={600} fontSize={15} color="brand.400">
                    Date Sold
                  </FormLabel>
                  <Field
                    as={Input}
                    placeholder="Enter date sold"
                    rounded="50px"
                    color="brand.800"
                    outline="none"
                    h="50px"
                    border="1px solid"
                    borderColor="border.200"
                    bg="brand.700"
                    mb="10px"
                    type="date"
                    name="dateSold"
                  />
                  <FormErrorMessage>
                    {typeof errors.dateSold === 'string' ? errors.dateSold : ''}
                  </FormErrorMessage>
                </FormControl>
                <Heading
                  my="2"
                  fontSize={24}
                  fontWeight={600}
                  color="brand.100"
                >
                  Delivery Status
                </Heading>
                <FormControl
                  mb="10px"
                  isInvalid={
                    !!errors.allocationStatus && touched.allocationStatus
                  }
                >
                  <FormLabel fontWeight={600} fontSize={15} color="brand.400">
                    What is the allocation status
                  </FormLabel>
                  <Field
                    as={Select}
                    placeholder="Select allocation status"
                    rounded="50px"
                    color="brand.800"
                    outline="none"
                    h="50px"
                    border="1px solid"
                    borderColor="border.200"
                    bg="brand.700"
                    name="allocationStatus"
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </Field>
                  <FormErrorMessage>
                    {typeof errors.allocationStatus === 'string'
                      ? errors.allocationStatus
                      : ''}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  mb="10px"
                  isInvalid={
                    !!errors.documentationStatus && touched.documentationStatus
                  }
                >
                  <FormLabel fontWeight={600} fontSize={15} color="brand.400">
                    What is the documentation status
                  </FormLabel>
                  <Field
                    as={Select}
                    placeholder="Select documentation status"
                    rounded="50px"
                    color="brand.800"
                    outline="none"
                    h="50px"
                    border="1px solid"
                    borderColor="border.200"
                    bg="brand.700"
                    name="documentationStatus"
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </Field>
                  <FormErrorMessage>
                    {typeof errors.documentationStatus === 'string'
                      ? errors.documentationStatus
                      : ''}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  mb="10px"
                  isInvalid={!!errors.handoverStatus && touched.handoverStatus}
                >
                  <FormLabel fontWeight={600} fontSize={15} color="brand.400">
                    What is the handover status
                  </FormLabel>
                  <Field
                    as={Select}
                    placeholder="Select handover status"
                    rounded="50px"
                    color="brand.800"
                    outline="none"
                    h="50px"
                    border="1px solid"
                    borderColor="border.200"
                    bg="brand.700"
                    name="handoverStatus"
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </Field>
                  <FormErrorMessage>
                    {typeof errors.handoverStatus === 'string'
                      ? errors.handoverStatus
                      : ''}
                  </FormErrorMessage>
                </FormControl>
                <Flex alignItems="center" justifyContent="space-between">
                  <Button
                    variant="ghost"
                    color="brand.100"
                    fontWeight={500}
                    leftIcon={<CloseIcon />}
                  >
                    Cancel
                  </Button>
                  <Button
                    px="40px"
                    fontWeight={500}
                    fontSize={15}
                    color="brand.200"
                    bg="brand.100"
                    type="submit"
                  >
                    {loading ? <Spinner /> : 'Save payment'}
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

export default FullySoldProperty;
