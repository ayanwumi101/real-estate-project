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
import Cookie from 'js-cookie';
import { CreateAssetContext } from '../../..';
import { formatCurrency } from '~/lib/utils/formatAmount';




const DeliveryStatusForm = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) => {
  const toast = useToast();
  const [loading, setLoading] = React.useState<boolean>(false);
  const assetId = Cookie.get('vestier-asset-id');
  const { step: parentStep, setStep: setParentStep } =
    useContext<any>(CreateAssetContext);
  const [propertyCost, setPropertyCost] = React.useState<string>('');
  const validationSchema = Yup.object().shape({
    propertyCost: Yup.string().required('Property cost is required'),
    dateOfPurchase: Yup.string().required('Date of purchase is required'),
    allocationStatus: Yup.string().required('Allocation status is required'),
    documentationStatus: Yup.string().required(
      'Documentation status is required'
    ),
    handoverStatus: Yup.string().required('Handover status is required'),
  });

  const initialValues = {
    propertyCost: '',
    dateOfPurchase: '',
    allocationStatus: '',
    documentationStatus: '',
    handoverStatus: '',
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = {
      payment_status: '',
      allocation_status: values.allocationStatus,
      documentation_status: values.documentationStatus,
      handover_status: values.handoverStatus,
      property_cost: values.propertyCost,
      bought_date: values.dateOfPurchase,
    };
    try {
      const res = await UpdateAssetDeliveryStatus(assetId as string, formData);
      if (res.status === true) {
        toast({
          title: res.message as string,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        setLoading(false);
        setStep(step + 1);
      }
    } catch (error: any) {
      setLoading(false);
      toast({
        title: 'An error occurred',
        description: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
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
                  isInvalid={!!errors.propertyCost && touched.propertyCost}
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
                  <FormErrorMessage>{errors.propertyCost}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.dateOfPurchase && touched.dateOfPurchase}
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
                  <FormErrorMessage>{errors.dateOfPurchase}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.allocationStatus && touched.allocationStatus
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
                  <FormErrorMessage>{errors.allocationStatus}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.documentationStatus && touched.documentationStatus
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
                    {errors.documentationStatus}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.handoverStatus && touched.handoverStatus}
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
                  <FormErrorMessage>{errors.handoverStatus}</FormErrorMessage>
                </FormControl>
                <Flex justifyContent="flex-end" gap="20px">
                  <Button
                    color="#000080"
                    bg="#EDEDFF"
                    h="48px"
                    borderRadius="30px"
                    fontWeight={600}
                    fontSize={16}
                    _hover={{ bg: '#000080' }}
                    onClick={() => setParentStep(parentStep - 1)}
                    minW="100px"
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
