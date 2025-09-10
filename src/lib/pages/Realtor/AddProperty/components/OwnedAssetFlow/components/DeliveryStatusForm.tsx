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
  Textarea,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { CreateAssetContext } from '../../..';
import { formatCurrency } from '~/lib/utils/formatAmount';
import { ChevronLeftIcon } from '~/lib/components/Icons/Icons';
import { AddRealtorProperty } from '~/lib/api/services/propertiesService';
import { useRouter } from 'next/navigation';

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
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [propertyCost, setPropertyCost] = React.useState<string>('');
  const validationSchema = Yup.object().shape({
    propertyCost: Yup.string().required('Propety cost is required'),
    dateOfPurchase: Yup.string().required('Date of purchase is required'),
    allocationStatus: Yup.string().required('Allocation status is required'),
    documentationStatus: Yup.string().required(
      'Documentation status is required'
    ),
    handoverStatus: Yup.string().required('Handover status is required'),
    additionalInfo: Yup.string().required('Additional information is required'),
  });

  const initialValues = {
    propertyCost: assetData.propertyCost || '',
    dateOfPurchase: assetData.dateOfPurchase || '',
    allocationStatus: assetData.allocationStatus || '',
    documentationStatus: assetData.documentationStatus || '',
    handoverStatus: assetData.handoverStatus || '',
    additionalInfo: assetData.additionalInfo || '',
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = {
      property_name: assetData.propertyName,
      property_type: assetData.propertyType,
      size: assetData.propertySize,
      house_number: assetData.propertyAddress.houseNumber,
      street_name: assetData.propertyAddress.streetName,
      city_name: assetData.propertyAddress.city,
      state_id: assetData.propertyAddress.state,
      lga_id: assetData.propertyAddress.lga,
      realtor_name: assetData.realtorDetails.name,
      realtor_phone: assetData.phoneNumber,
      property_cost: values.propertyCost,
      bought_date: values.dateOfPurchase,
      allocation_status: values.allocationStatus,
      documentation_status: values.documentationStatus,
      handover_status: values.handoverStatus,
      comment: values.additionalInfo,
    };
    try {
      const res = await AddRealtorProperty(formData);
      if (res.id) {
        toast({
          title: 'Property Added successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        router.push('/realtor/properties');
      }
    } catch (error: any) {
      toast({
        title: error.response.data.message,
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
                <FormControl
                  isInvalid={
                    !!errors.additionalInfo && !!touched.additionalInfo
                  }
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    Add Additional Information
                  </FormLabel>
                  <Field
                    as={Textarea}
                    w="full"
                    bg="#FBFBFB"
                    border="1px solid #C0C0C0"
                    borderRadius="10px"
                    h="100px"
                    placeholder="Enter additional information as note"
                    resize="none"
                    name="additionalInfo"
                  />
                  <FormErrorMessage>
                    {typeof errors.additionalInfo === 'string'
                      ? errors.additionalInfo
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
                    minW="150px"
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

export default DeliveryStatusForm;
