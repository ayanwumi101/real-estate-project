import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Flex,
  Select,
  Button,
  FormErrorMessage, Spinner, useToast
} from '@chakra-ui/react';
import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { UpdateAssetDeliveryStatus } from '~/lib/api/services/assetsService';



const DeliveryStatusForm = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) => {
  const toast = useToast();
  const [loading, setLoading] = React.useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    paymentStatus: Yup.string().required('Payment status is required'),
    allocationStatus: Yup.string().required('Allocation status is required'),
    documentationStatus: Yup.string().required(
      'Documentation status is required'
    ),
    handoverStatus: Yup.string().required('Handover status is required'),
  });

  const initialValues = {
    paymentStatus: '',
    allocationStatus: '',
    documentationStatus: '',
    handoverStatus: '',
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = {}
    try {
      const res = await UpdateAssetDeliveryStatus(
        '93b6f340-ec3e-4f5e-ac92-c22e22dc0736',
        formData
      );
      if (res.status === true) {
        toast({
          title: res.message as string,
          status: 'success',
          duration: 5000,
          isClosable: true,
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
        duration: 5000,
        isClosable: true,
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
            <Box as="section" w="600px">
              <Stack spacing="24px">
                <FormControl
                  isInvalid={!!errors.paymentStatus && touched.paymentStatus}
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    What is the payment status?
                  </FormLabel>
                  <Field
                  as={Select}
                    name='paymentStatus'
                    bg="#FBFBFB"
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                    h="50px"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value='Pending'>Pending</option>
                    <option value="Completed">Completed</option>
                  </Field>
                  <FormErrorMessage>{errors.paymentStatus}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.allocationStatus && touched.allocationStatus}
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    What is the allocation status?
                  </FormLabel>
                  <Field
                  as={Select}
                    name='allocationStatus'
                    bg="#FBFBFB"
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                    h="50px"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value='Pending'>Pending</option>
                    <option value="Completed">Completed</option>
                  </Field>
                  <FormErrorMessage>{errors.allocationStatus}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.documentationStatus && touched.documentationStatus}
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    What is the documentation status?
                  </FormLabel>
                  <Field
                  as={Select}
                    name='documentationStatus'
                    bg="#FBFBFB"
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                    h="50px"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value='Pending'>Pending</option>
                    <option value="Completed">Completed</option>
                  </Field>
                  <FormErrorMessage>{errors.documentationStatus}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.handoverStatus && touched.handoverStatus}
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    What is the handover status?
                  </FormLabel>
                  <Field
                  as={Select}
                    name='handoverStatus'
                    bg="#FBFBFB"
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                    h="50px"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value='Pending'>Pending</option>
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
                    onClick={() => setStep(step - 1)}
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
                    type='submit'
                  >
                    {loading ? <Spinner /> : 'Submit'}
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
