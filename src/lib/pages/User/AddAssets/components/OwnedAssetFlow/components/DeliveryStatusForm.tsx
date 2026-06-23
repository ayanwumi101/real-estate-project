import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Flex,
  Select,
  Button,
  FormErrorMessage,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { UpdateAssetDeliveryStatus } from '~/lib/api/services/assetsService';
import { CreateAssetContext } from '../../..';
import { formatCurrency } from '~/lib/utils/formatAmount';
import { ChevronLeftIcon } from '~/lib/components/Icons/Icons';

const DeliveryStatusForm = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) => {
  const {
    step: parentStep,
    setStep: setParentStep,
    assetData,
    setAssetData,
  } = useContext<any>(CreateAssetContext);
  const [propertyCost, setPropertyCost] = React.useState<string>('');
  const [currentAssetValue, setCurrentAssetValue] = React.useState<string>('');


  const validationSchema = Yup.object().shape({
    propertyCost: Yup.string().required('Propety cost is required'),
    dateOfPurchase: Yup.string().required('Date of purchase is required'),
    allocationStatus: Yup.string().required('Allocation status is required'),
    documentationStatus: Yup.string().required(
      'Documentation status is required'
    ),
    handoverStatus: Yup.string().required('Handover status is required'),
    currentAssetValue: Yup.string().required('Current asset value is required'),
  });

  const initialValues = {
    propertyCost: assetData.propertyCost || '',
    dateOfPurchase: assetData.dateOfPurchase || '',
    allocationStatus: assetData.allocationStatus || '',
    documentationStatus: assetData.documentationStatus || '',
    handoverStatus: assetData.handoverStatus || '',
    currentAssetValue: assetData.currentAssetValue || '',
  };

  const handleSubmit = async (values: any) => {
    setAssetData({
      ...assetData,
      propertyCost: values.propertyCost,
      dateOfPurchase: values.dateOfPurchase,
      allocationStatus: values.allocationStatus,
      documentationStatus: values.documentationStatus,
      handoverStatus: values.handoverStatus,
      currentAssetValue: values.currentAssetValue,
    });
    setStep(step + 1);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ errors, touched, values, setFieldValue }) => {
        return (
          <Form>
            <Box as="section" w={['100%', '100%', '600px']}>
              <Stack spacing="24px">
                <FormControl
                  isInvalid={!!errors.propertyCost && !!touched.propertyCost}
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    How much does the property cost?
                  </FormLabel>
                  <Input
                    type="text"
                    value={formatCurrency(propertyCost)}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, '');
                      setPropertyCost(rawValue);
                      setFieldValue('propertyCost', rawValue);
                    }}
                    name="propertyCost"
                    bg="#FBFBFB"
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                    h="50px"
                    placeholder="₦ 0. 00"
                  />
                  <FormErrorMessage>
                    {typeof errors.propertyCost === 'string'
                      ? errors.propertyCost
                      : ''}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.currentAssetValue && !!touched.currentAssetValue
                  }
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    Current Asset Value
                  </FormLabel>
                  <Input
                    type="text"
                    value={formatCurrency(currentAssetValue)}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, '');
                      setCurrentAssetValue(rawValue);
                      setFieldValue('currentAssetValue', rawValue);
                    }}
                    name="currentAssetValue"
                    bg="#FBFBFB"
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                    h="50px"
                    placeholder="₦ 0, 00"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                    w="100%"
                  />
                  <FormErrorMessage>
                    {typeof errors.currentAssetValue === 'string'
                      ? errors.currentAssetValue
                      : ''}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.dateOfPurchase && !!touched.dateOfPurchase
                  }
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    When was this property bought?
                  </FormLabel>
                  <Field
                    as={Input}
                    name="dateOfPurchase"
                    bg="#FBFBFB"
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                    h="50px"
                    placeholder="dd/mm/yyyy"
                    type="date"
                  />
                  <FormErrorMessage>
                    {typeof errors.dateOfPurchase === 'string'
                      ? errors.dateOfPurchase
                      : ''}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.allocationStatus && !!touched.allocationStatus
                  }
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    What is the allocation status?
                  </FormLabel>
                  <Field
                    as={Select}
                    name="allocationStatus"
                    bg="#FBFBFB"
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                    h="50px"
                    placeholder="Select"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </Field>
                  <FormErrorMessage>
                    {typeof errors.allocationStatus === 'string'
                      ? errors.allocationStatus
                      : ''}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.documentationStatus &&
                    !!touched.documentationStatus
                  }
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    What is the documentation status?
                  </FormLabel>
                  <Field
                    as={Select}
                    name="documentationStatus"
                    bg="#FBFBFB"
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                    h="50px"
                    placeholder="Select"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </Field>
                  <FormErrorMessage>
                    {typeof errors.documentationStatus === 'string'
                      ? errors.documentationStatus
                      : ''}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.handoverStatus && !!touched.handoverStatus
                  }
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    What is the handover status?
                  </FormLabel>
                  <Field
                    as={Select}
                    name="handoverStatus"
                    bg="#FBFBFB"
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                    h="50px"
                    placeholder="Select"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </Field>
                  <FormErrorMessage>
                    {typeof errors.handoverStatus === 'string'
                      ? errors.handoverStatus
                      : ''}
                  </FormErrorMessage>
                </FormControl>
                <Flex justifyContent="space-between" alignItems="center">
                  <Button
                    leftIcon={<ChevronLeftIcon />}
                    color="brand.100"
                    fontWeight={600}
                    variant="ghost"
                    _hover={{ bg: 'none' }}
                    onClick={() => setParentStep(parentStep - 1)}
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

export default DeliveryStatusForm;
