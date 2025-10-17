import React, { useState } from 'react';
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
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { ChevronLeftIcon, CloseIcon } from '~/lib/components/Icons/Icons';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { formatCurrency } from '~/lib/utils/formatAmount';
import { CreateInstalmentPropertyPayment } from '~/lib/api/services/propertiesService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const PropertySaleContext = React.createContext<any>(null);

const DeliveryStatus = ({ loading }: { loading: boolean }) => {
  const {
    errors,
    clients,
    setStep,
    step,
    touched,
    setFieldValue,
    setFieldTouched,
  } = React.useContext(PropertySaleContext);
  return (
    <Stack spacing="20px">
      <Heading fontSize={24} fontWeight={600} color="brand.100">
        Delivery Status
      </Heading>
      <FormControl
        mb="10px"
        isInvalid={!!errors.allocationStatus && touched.allocationStatus}
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
        isInvalid={!!errors.documentationStatus && touched.documentationStatus}
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
          leftIcon={<ChevronLeftIcon />}
          variant="ghost"
          color="brand.100"
          fontWeight={500}
          onClick={() => setStep(step - 1)}
        >
          Back
        </Button>

        <Button
          px="40px"
          fontWeight={500}
          fontSize={15}
          color="brand.200"
          bg="brand.100"
          minW="180px"
          type="submit"
        >
          {loading ? <Spinner /> : 'Register Property Sale'}
        </Button>
      </Flex>
    </Stack>
  );
};

const RegisterProperty = ({ onNext }: { onNext: () => void }) => {
  const {
    errors,
    clients,
    setStep,
    step,
    touched,
    setFieldValue,
    setFieldTouched,
  } = React.useContext(PropertySaleContext);
  const [amountSold, setAmountSold] = useState<string>('');
  const [firstDeposit, setFirstDeposit] = useState<string>('');
  const [instalmentAmount, setInstalmentAmount] = useState<string>('');
  const [commissionReceived, setCommissionReceived] = useState<string>('');
  return (
    <Stack spacing="20px">
      <Heading fontSize={24} fontWeight={600} color="brand.100">
        Register property sale as instalment
      </Heading>
      <FormControl isInvalid={!!errors.clientName && touched.clientName}>
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
          {clients.map((client: any) => (
            <option key={client?.id} value={client?.id}>
              {client?.firstname} - {client?.lastname}
            </option>
          ))}
        </Field>
        <FormErrorMessage>
          {typeof errors.clientName === 'string' ? errors.clientName : ''}
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
      <Flex alignItems="center" gap="24px" flexWrap={['wrap', 'nowrap']}>
        <FormControl isInvalid={!!errors.amountSold && touched.amountSold}>
          <FormLabel fontWeight={600} fontSize={15} color="brand.400">
            Amount Sold
          </FormLabel>
          <Input
            type="text"
            placeholder="₦ 0. 00"
            value={formatCurrency(amountSold)}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[^\d]/g, '');
              setAmountSold(rawValue);
              setFieldValue('amountSold', rawValue);
            }}
            name="amountSold"
            rounded="50px"
            color="brand.800"
            outline="none"
            h="50px"
            border="1px solid"
            borderColor="border.200"
            bg="brand.700"
            mb="10px"
          />
          <FormErrorMessage>
            {typeof errors.amountSold === 'string' ? errors.amountSold : ''}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.firstDeposit && touched.firstDeposit}>
          <FormLabel fontWeight={600} fontSize={15} color="brand.400">
            First Deposit
          </FormLabel>
          <Input
            type="text"
            placeholder="₦ 0. 00"
            value={formatCurrency(firstDeposit)}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[^\d]/g, '');
              setFirstDeposit(rawValue);
              setFieldValue('firstDeposit', rawValue);
            }}
            name="firstDeposit"
            rounded="50px"
            color="brand.800"
            outline="none"
            h="50px"
            border="1px solid"
            borderColor="border.200"
            bg="brand.700"
            mb="10px"
          />
          <FormErrorMessage>
            {typeof errors.firstDeposit === 'string' ? errors.firstDeposit : ''}
          </FormErrorMessage>
        </FormControl>
      </Flex>
      <FormControl
        isInvalid={!!errors.paymentDuration && touched.paymentDuration}
      >
        <FormLabel fontWeight={600} fontSize={15} color="brand.400">
          Duration of Payment (Month)
        </FormLabel>
        <Field
          as={Input}
          placeholder="Input payment duration. e.g 5 months"
          rounded="50px"
          color="brand.800"
          outline="none"
          h="50px"
          border="1px solid"
          borderColor="border.200"
          bg="brand.700"
          mb="10px"
          name="paymentDuration"
          type="number"
        />
        <FormErrorMessage>
          {typeof errors.paymentDuration === 'string'
            ? errors.paymentDuration
            : ''}
        </FormErrorMessage>
      </FormControl>
      <Flex alignItems="center" gap="24px" flexWrap={['wrap', 'nowrap']}>
        <FormControl
          isInvalid={!!errors.instalmentAmount && touched.instalmentAmount}
        >
          <FormLabel fontWeight={600} fontSize={15} color="brand.400">
            Instalment Amount
          </FormLabel>
          <Input
            type="text"
            placeholder="₦ 0. 00"
            value={formatCurrency(instalmentAmount)}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[^\d]/g, '');
              setInstalmentAmount(rawValue);
              setFieldValue('instalmentAmount', rawValue);
            }}
            name="instalmentAmount"
            rounded="50px"
            color="brand.800"
            outline="none"
            h="50px"
            border="1px solid"
            borderColor="border.200"
            bg="brand.700"
            mb="10px"
          />
          <FormErrorMessage>
            {typeof errors.instalmentAmount === 'string'
              ? errors.instalmentAmount
              : ''}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!errors.commissionReceived && touched.commissionReceived}
        >
          <FormLabel fontWeight={600} fontSize={15} color="brand.400">
            Commission Received
          </FormLabel>
          <Input
            type="text"
            placeholder="₦ 0. 00"
            value={formatCurrency(commissionReceived)}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[^\d]/g, '');
              setCommissionReceived(rawValue);
              setFieldValue('commissionReceived', rawValue);
            }}
            name="commissionReceived"
            rounded="50px"
            color="brand.800"
            outline="none"
            h="50px"
            border="1px solid"
            borderColor="border.200"
            bg="brand.700"
            mb="10px"
          />
          <FormErrorMessage>
            {typeof errors.commissionReceived === 'string'
              ? errors.commissionReceived
              : ''}
          </FormErrorMessage>
        </FormControl>
      </Flex>
      <FormControl
        mb="10px"
        isInvalid={!!errors.paymentPlan && touched.paymentPlan}
      >
        <FormLabel fontWeight={600} fontSize={15} color="brand.400">
          Payment Plan
        </FormLabel>
        <Field
          as={Select}
          placeholder="Select payment plan"
          rounded="50px"
          color="brand.800"
          outline="none"
          h="50px"
          border="1px solid"
          borderColor="border.200"
          bg="brand.700"
          name="paymentPlan"
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </Field>
        <FormErrorMessage>
          {typeof errors.paymentPlan === 'string' ? errors.paymentPlan : ''}
        </FormErrorMessage>
      </FormControl>
      <Flex alignItems="center" gap="24px" flexWrap={['wrap', 'nowrap']}>
        <FormControl
          isInvalid={!!errors.firstPaymentDate && touched.firstPaymentDate}
        >
          <FormLabel fontWeight={600} fontSize={15} color="brand.400">
            First payment date
          </FormLabel>
          <Field
            as={Input}
            placeholder="Enter amount sold"
            rounded="50px"
            color="brand.800"
            outline="none"
            h="50px"
            border="1px solid"
            borderColor="border.200"
            bg="brand.700"
            mb="10px"
            type="date"
            name="firstPaymentDate"
          />
          <FormErrorMessage>
            {typeof errors.firstPaymentDate === 'string'
              ? errors.firstPaymentDate
              : ''}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!errors.nextPaymentDate && touched.nextPaymentDate}
        >
          <FormLabel fontWeight={600} fontSize={15} color="brand.400">
            Next payment date
          </FormLabel>
          <Field
            as={Input}
            placeholder="Enter commission received"
            rounded="50px"
            color="brand.800"
            outline="none"
            h="50px"
            border="1px solid"
            borderColor="border.200"
            bg="brand.700"
            mb="10px"
            type="date"
            name="nextPaymentDate"
          />
          <FormErrorMessage>
            {typeof errors.nextPaymentDate === 'string'
              ? errors.nextPaymentDate
              : ''}
          </FormErrorMessage>
        </FormControl>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Link href="/realtor/properties">
          <Button
            variant="ghost"
            color="brand.100"
            fontWeight={500}
            leftIcon={<CloseIcon />}
          >
            Cancel
          </Button>
        </Link>
        <Button
          px="40px"
          fontWeight={500}
          fontSize={15}
          color="brand.200"
          bg="brand.100"
          minW="180px"
          onClick={onNext}
        >
          Next
        </Button>
      </Flex>
    </Stack>
  );
};

const InstalmentPaymentProperty = ({
  clients,
  propertyId,
}: {
  clients: any[];
  propertyId: string;
}) => {
  const router = useRouter();
  const toast = useToast();
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  interface FormValues {
    clientName: string;
    amountSold: string;
    firstDeposit: string;
    paymentDuration: string;
    instalmentAmount: string;
    commissionReceived: string;
    paymentPlan: string;
    firstPaymentDate: string | Date;
    nextPaymentDate: string | Date;
    allocationStatus: string;
    documentationStatus: string;
    handoverStatus: string;
  }

  const initialValues: FormValues = {
    clientName: '',
    amountSold: '',
    firstDeposit: '',
    paymentDuration: '',
    instalmentAmount: '',
    commissionReceived: '',
    paymentPlan: '',
    firstPaymentDate: '',
    nextPaymentDate: '',
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
    firstDeposit: Yup.number()
      .typeError('First deposit must be a number')
      .positive('First deposit must be positive')
      .required('First deposit is required'),
    paymentDuration: Yup.string().required('Payment duration is required'),
    instalmentAmount: Yup.number()
      .typeError('Instalment amount must be a number')
      .positive('Instalment amount must be positive')
      .required('Instalment amount is required'),
    commissionReceived: Yup.number()
      .typeError('Commission received must be a number')
      .positive('Commission received must be positive')
      .required('Commission received is required'),
    paymentPlan: Yup.string().required('Payment plan is required'),
    firstPaymentDate: Yup.date().required('First payment date is required'),
    nextPaymentDate: Yup.date().required('Next payment date is required'),
    allocationStatus: Yup.string().required('Allocation status is required'),
    documentationStatus: Yup.string().required(
      'Documentation status is required'
    ),
    handoverStatus: Yup.string().required('Handover status is required'),
  });

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const response = await CreateInstalmentPropertyPayment(propertyId, {
        client_id: values.clientName,
        amount_sold: Number(values.amountSold),
        first_deposit: Number(values.firstDeposit),
        payment_duration: values.paymentDuration,
        instalment_amount: Number(values.instalmentAmount),
        commission: Number(values.commissionReceived),
        payment_plan: values.paymentPlan,
        first_payment_date: values.firstPaymentDate,
        next_instalment_date: values.nextPaymentDate,
        allocation_status: values.allocationStatus,
        documentation_status: values.documentationStatus,
        handover_status: values.handoverStatus,
      });
      if (response.status === true) {
        toast({
          title: 'Success',
          description: 'Instalment payment registered successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        router.push('/realtor/properties');
      }
    } catch (error) {
      toast({
        title: 'Error!',
        description: 'Failed to register instalment payment',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
    setLoading(false);
  };

  return (
    <Box maxW="700px" mx="auto" px={['16px', 0]}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          values,
          validateForm,
          setTouched,
          setFieldValue,
          setFieldTouched,
        }) => {
          return (
            <Form>
              <PropertySaleContext.Provider
                value={{
                  clients,
                  step,
                  errors,
                  touched,
                  values,
                  setStep,
                  setFieldValue,
                  setFieldTouched,
                }}
              >
                {step === 1 && (
                  <RegisterProperty
                    onNext={async () => {
                      // Mark all step-1 fields as touched so errors show
                      setTouched({
                        clientName: true,
                        amountSold: true,
                        firstDeposit: true,
                        paymentDuration: true,
                        instalmentAmount: true,
                        commissionReceived: true,
                        paymentPlan: true,
                        firstPaymentDate: true,
                        nextPaymentDate: true,
                      });
                      const stepErrors = await validateForm();
                      // Only move to next step if none of those fields has an error
                      const hasError = Object.keys(stepErrors).some((k) =>
                        [
                          'clientName',
                          'amountSold',
                          'firstDeposit',
                          'paymentDuration',
                          'instalmentAmount',
                          'commissionReceived',
                          'paymentPlan',
                          'firstPaymentDate',
                          'nextPaymentDate',
                        ].includes(k)
                      );
                      if (!hasError) setStep(2);
                    }}
                  />
                )}
                {step === 2 && <DeliveryStatus loading={loading} />}
              </PropertySaleContext.Provider>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default InstalmentPaymentProperty;
