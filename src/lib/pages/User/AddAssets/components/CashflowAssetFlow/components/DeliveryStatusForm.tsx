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
  const validationSchema = Yup.object().shape({
    boughtDate: Yup.string().required('Bought date is required'),
    propertyCost: Yup.string().required('Property cost is required'),
  });

  const initialValues = {
    boughtDate: assetData.boughtDate || '',
    propertyCost: assetData.propertyCost || '',
  };

  const handleSubmit = async (values: any) => {
    setAssetData({
      ...assetData,
      propertyCost: values.propertyCost,
      boughtDate: values.boughtDate,
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
                    placeholder="₦ 0, 00"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                    w="100%"
                  />
                  <FormErrorMessage>
                    {typeof errors.propertyCost === 'string'
                      ? errors.propertyCost
                      : ''}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.propertyCost && !!touched.propertyCost}
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
                  <FormErrorMessage>
                    {typeof errors.propertyCost === 'string'
                      ? errors.propertyCost
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
