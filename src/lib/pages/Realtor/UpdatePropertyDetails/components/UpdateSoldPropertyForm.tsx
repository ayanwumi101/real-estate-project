'use client';

import React, { useEffect, Fragment, Suspense } from 'react';
import {
  Box,
  Stack,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Heading,
  FormErrorMessage,
  Textarea,
  Button,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import useNavigate from '~/lib/utils/useNavigate';
import RealtorDashboardLayout from '~/lib/layout/components/RealtorDashboardHeader';
import { BsChevronRight } from 'react-icons/bs';
import { UpdateSoldPropertyDetails } from '~/lib/api/services/propertiesService';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import Link from 'next/link';
import { formatCurrency } from '~/lib/utils/formatAmount';
import { ChevronLeftIcon } from '~/lib/components/Icons/Icons';
import { SoldPropertyDetails } from '~/lib/utils/types';
import { useContext } from 'react';
import { AppContext } from '~/lib/layout';

const UpdateSoldPropertyForm = ({
  id,
  propertyType,
  propertyDetails,
}: {
  id: string;
  propertyType: 'available' | 'sold' | 'instalment';
  propertyDetails: SoldPropertyDetails;
}) => {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [amountSold, setAmountSold] = React.useState<string>('');
  const [commission, setCommission] = React.useState<string>('');
    const { GetNotifications } = useContext(AppContext);

  const initialValues = {
    amountSold: propertyDetails?.sale_info?.amount_sold || '',
    commission: propertyDetails?.totals?.total_commission || '',
    dateSold: propertyDetails?.sale_info?.date_sold?.split('T')[0],
    allocationStatus: propertyDetails?.delivery_details?.allocation_status,
    documentationStatus:
      propertyDetails?.delivery_details?.documentation_status,
    handoverStatus: propertyDetails?.delivery_details?.handover_status,
  };

  const validationSchema = Yup.object({
    amountSold: Yup.string(),
    commission: Yup.string(),
    dateSold: Yup.string(),
    documentationStatus: Yup.string(),
    allocationStatus: Yup.string(),
    handoverStatus: Yup.string(),
  });

  useEffect(() => {
    if (propertyDetails) {
      setAmountSold(propertyDetails?.sale_info?.amount_sold || '');
      setCommission(propertyDetails?.totals?.total_commission.toString() || '');
    }
  }, [id, propertyDetails]);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    const formData = {
      client_id: propertyDetails?.client?.id,
      amount_sold: Number(values.amountSold),
      commission: Number(values.commission),
      date_sold: values.dateSold,
      allocation_status: values.allocationStatus,
      documentation_status: values.documentationStatus,
      handover_status: values.handoverStatus,
    };
    try {
      const res = await UpdateSoldPropertyDetails(id as string, formData);
      if (res.status === true) {
        await GetNotifications();
        toast({
          title: 'Property updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        router.push(`/realtor/properties/${id}?type=${propertyType}`);
      }
    } catch (error: any) {
      toast({
        title: error.response.data.message || error.response.data.error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ errors, touched, setFieldValue, values, setFieldTouched }) => {
        return (
          <Form>
            <Stack maxW="700px" mx="auto" spacing="24px">
              <FormControl
                isInvalid={!!errors.amountSold && !!touched.amountSold}
              >
                <FormLabel fontWeight={600} fontSize={16} color="#222222">
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
                isInvalid={!!errors.commission && !!touched.commission}
              >
                <FormLabel fontWeight={600} fontSize={16} color="#222222">
                  Commission
                </FormLabel>
                <Input
                  type="text"
                  value={formatCurrency(commission)}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/[^\d]/g, '');
                    setCommission(rawValue);
                    setFieldValue('commission', rawValue);
                  }}
                  name="propertyCost"
                  bg="#FBFBFB"
                  border="1px solid #C0C0C0"
                  borderRadius="50px"
                  h="50px"
                  placeholder="₦ 0. 00"
                />
                <FormErrorMessage>
                  {typeof errors.commission === 'string'
                    ? errors.commission
                    : ''}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.dateSold && !!touched.dateSold}>
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
                  // mb="10px"
                  type="date"
                  name="dateSold"
                />
                <FormErrorMessage>
                  {typeof errors.dateSold === 'string' ? errors.dateSold : ''}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                mb="10px"
                isInvalid={
                  !!errors.allocationStatus && !!touched.allocationStatus
                }
              >
                <FormLabel fontWeight={600} fontSize={15} color="brand.400">
                  Allocation status
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
                  !!errors.documentationStatus && !!touched.documentationStatus
                }
              >
                <FormLabel fontWeight={600} fontSize={15} color="brand.400">
                  Documentation status
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
                isInvalid={!!errors.handoverStatus && !!touched.handoverStatus}
              >
                <FormLabel fontWeight={600} fontSize={15} color="brand.400">
                  Handover status
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
              <Flex justifyContent="space-between" alignItems="center">
                <Link href={`/realtor/properties?tab=${propertyType}`}>
                  {' '}
                  <Button
                    leftIcon={<ChevronLeftIcon />}
                    color="brand.100"
                    fontWeight={600}
                    variant="ghost"
                    _hover={{ bg: 'none' }}
                    p="0"
                  >
                    Cancel
                  </Button>
                </Link>

                <Button
                  bg="#000080"
                  color="white"
                  h="48px"
                  borderRadius="30px"
                  fontWeight={600}
                  fontSize={16}
                  _hover={{ bg: '#000080' }}
                  type="submit"
                  minW="180px"
                >
                  {isSubmitting ? <Spinner /> : 'Update Property'}
                </Button>
              </Flex>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UpdateSoldPropertyForm;
