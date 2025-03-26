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

  const validationSchema = Yup.object().shape({
    // allocationStatus: Yup.string().required('Allocation status is required'),
    // documentationStatus: Yup.string().required(
    //   'Documentation status is required'
    // ),
    // handoverStatus: Yup.string().required('Handover status is required'),
    // paymentStatus: Yup.string().required('Payment status is required'),
    boughtDate: Yup.string().required('Bought date is required'),
    propertyCost: Yup.string().required('Property cost is required'),
  });

  const initialValues = {
    // paymentStatus: '',
    // allocationStatus: '',
    // documentationStatus: '',
    // handoverStatus: '',
    boughtDate: '',
    propertyCost: '',
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = {
      payment_status: '',
      allocation_status: '',
      documentation_status: '',
      handover_status: '',
      bought_date: values.boughtDate,
      property_cost: values.propertyCost
    }
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
                  <Field
                    as={Input}
                    name="propertyCost"
                    bg="#FBFBFB"
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                    h="50px"
                    placeholder="₦ 0, 00"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                    w="100%"
                  />
                  <FormErrorMessage>{errors.propertyCost}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.propertyCost && touched.propertyCost}
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    When was this property bought
                  </FormLabel>
                  <Field
                    as={Input}
                    type="date"
                    name="boughtDate"
                    bg="#FBFBFB"
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                    h="50px"
                    placeholder="₦ 0, 00"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                    w="100%"
                  />
                  <FormErrorMessage>{errors.propertyCost}</FormErrorMessage>
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
