import {
  Heading,
  Text,
  Button,
  Stack,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import React, { useState } from 'react';
import CustomModal from '~/lib/components/Modal';
import { formatCurrency } from '~/lib/utils/formatAmount';
import * as Yup from 'yup';
import { AddNewValuationToProperty } from '~/lib/api/services/assetsService';

const UpdateAssetValueModal = ({
  isOpen,
  onClose,
  propertyId,
}: {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
}) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [assetValue, setAssetValue] = useState<string>('');

  const initialValues = {
    assetValue: '',
    valuationDate: '',
  };

  const validationSchema = Yup.object({
    assetValue: Yup.string().required('Asset value is required'),
    valuationDate: Yup.date().required('Valuation Date is required'),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    try {
      await AddNewValuationToProperty(propertyId, {
        value: Number(values.assetValue),
        value_date: values.valuationDate,
        source: 'market_appraisal',
        notes: 'Q2 market revaluation',
      });
      toast({
        title: 'Valuation updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      onClose();
      window.location.reload();
    } catch (error: any) {
      toast({
        title:
          error?.response?.data?.error?.message ||
          'Error updating asset valuation',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
    setLoading(false);
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} size="lg">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ errors, touched, values, setFieldValue }) => {
          return (
            <Form>
              <Stack spacing="16px">
                <Heading fontWeight={600} fontSize={20}>
                  Update Asset Value
                </Heading>
                <Text fontSize={14} fontWeight={500} color="brand.300">
                  Keep your portfolio valuation up to date by recording the
                  latest market value of this asset.
                </Text>
                <FormControl
                  isInvalid={!!errors.assetValue && !!touched.assetValue}
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    Asset Value
                  </FormLabel>
                  <Input
                    type="text"
                    value={formatCurrency(assetValue)}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, '');
                      setAssetValue(rawValue);
                      setFieldValue('assetValue', rawValue);
                    }}
                    name="assetValue"
                    bg="#FBFBFB"
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                    h="50px"
                    placeholder="₦ 0, 00"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                    w="100%"
                  />
                  <FormErrorMessage>
                    {typeof errors.assetValue === 'string'
                      ? errors.assetValue
                      : ''}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.valuationDate && !!touched.valuationDate}
                  mb="10px"
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    Value As At
                  </FormLabel>
                  <Field
                    as={Input}
                    name="valuationDate"
                    bg="#FBFBFB"
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                    h="50px"
                    placeholder="dd/mm/yyyy"
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                  />
                  <FormErrorMessage>
                    {typeof errors.valuationDate === 'string'
                      ? errors.valuationDate
                      : ''}
                  </FormErrorMessage>
                </FormControl>
                <Flex justifyContent="flex-end" alignItems="center" gap="10px">
                  <Button
                    bg="bg.200"
                    fontWeight={600}
                    color="brand.100"
                    _hover={{ bg: 'bg.200' }}
                    h="45px"
                    onClick={onClose}
                              fontSize={15}
                              w='120px'
                  >
                    Cancel
                  </Button>
                  <Button
                    bg="#000080"
                    color="white"
                    h="45px"
                    borderRadius="30px"
                    fontWeight={600}
                    fontSize={15}
                    _hover={{ bg: '#000080' }}
                    type="submit"
                    minW="150px"
                  >
                    {loading ? <Spinner /> : 'Save valuation update'}
                  </Button>
                </Flex>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </CustomModal>
  );
};

export default UpdateAssetValueModal;
