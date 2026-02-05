'use client';

import React, { useEffect, Fragment, Suspense, useState } from 'react';
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
import { useParams, useRouter } from 'next/navigation';
import useNavigate from '~/lib/utils/useNavigate';
import { UpdateInstalmentPropertyDetails } from '~/lib/api/services/propertiesService';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { GetStateLgas } from '~/lib/api/services/locationService';
import Link from 'next/link';
import { formatCurrency } from '~/lib/utils/formatAmount';
import { ChevronLeftIcon } from '~/lib/components/Icons/Icons';
import { InstalmentPropertyDetails } from '~/lib/utils/types';

const UpdateInstalmentPropertyForm = ({
  id,
  propertyType,
  propertyDetails,
}: {
  id: string;
  propertyType: 'available' | 'sold' | 'instalment';
  propertyDetails: InstalmentPropertyDetails;
}) => {
  const router = useRouter();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [amountSold, setAmountSold] = React.useState<string>('');
  const [propertyCost, setPropertyCost] = React.useState<string>('');
  const [firstDeposit, setFirstDeposit] = useState<string>('');

  const initialValues = {
    first_payment_date:
      propertyDetails?.sale_information?.first_payment_date?.split(' ')[0] ||
      '',
    next_instalment_date:
      propertyDetails?.sale_information?.next_instalment_date?.split(' ')[0] ||
      '',
    payment_plan: propertyDetails?.sale_information?.payment_plan || '',
    duration:
      propertyDetails?.sale_information?.duration ||
      propertyDetails?.duration_in_months ||
      '',
    amount_sold: propertyDetails?.sale_information?.sale_price || 0,
    first_deposit: propertyDetails?.sale_information?.first_deposit || 0,
    payment_status: propertyDetails?.next_instalment_payment?.status,
    client_id: propertyDetails?.client?.id,
    property_cost: propertyDetails?.sale_information?.sale_price || '',
    bought_date:
      propertyDetails?.sale_information?.first_payment_date?.split(' ')[0] ||
      '',
    allocation_status: propertyDetails?.delivery_details?.allocation_status,
    documentation_status: propertyDetails?.delivery_details?.documentation_status,
    handover_status: propertyDetails?.delivery_details?.handover_status,
    comment: propertyDetails?.sale_information?.comment || '',
  };

  const validationSchema = Yup.object({
    first_payment_date: Yup.string(),
    next_instalment_date: Yup.string(),
    payment_plan: Yup.string(),
    duration: Yup.string(),
    amount_sold: Yup.number(),
    first_deposit: Yup.number(),
    payment_status: Yup.string(),
    client_id: Yup.string(),
    property_cost: Yup.string(),
    bought_date: Yup.string(),
    allocation_status: Yup.string(),
    documentation_status: Yup.string(),
    handover_status: Yup.string(),
    comment: Yup.string(),
  });

  useEffect(() => {
    if (propertyDetails) {
      setPropertyCost(propertyDetails?.sale_information?.sale_price || '');
      setAmountSold(propertyDetails?.sale_information?.sale_price);
      setFirstDeposit(propertyDetails?.sale_information?.first_deposit || '');
    }
  }, [id, propertyDetails]);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    const formData = {
      first_payment_date: values?.first_payment_date,
      next_instalment_date: values?.next_instalment_date,
      payment_plan: values?.payment_plan,
      duration: values?.duration.toString(),
      amount_sold: values?.amount_sold,
      first_deposit: values?.first_deposit,
      payment_status: values.payment_status,
      client_id: propertyDetails?.client?.id,
      property_cost: values.property_cost,
      bought_date: values.bought_date,
      allocation_status: values.allocation_status,
      documentation_status: values.documentation_status,
      handover_status: values.handover_status,
      comment: values.comment,
    };
    try {
      const res = await UpdateInstalmentPropertyDetails(id as string, formData);
      if (res.status === true) {
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
        title:
          error.response.data.message ||
          error?.response.data?.error?.message ||
          'Something went wrong',
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
      {({ errors, touched, setFieldValue, values }) => {
        return (
          <Form>
            <Stack maxW="700px" mx="auto" spacing="24px">
              <FormControl
                isInvalid={!!errors.amount_sold && touched.amount_sold}
              >
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
                    setFieldValue('amount_sold', rawValue);
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
                  {typeof errors.amount_sold === 'string'
                    ? errors.amount_sold
                    : ''}
                </FormErrorMessage>
              </FormControl>
              {/* <FormControl
                isInvalid={!!errors.property_cost && !!touched.property_cost}
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
                    setFieldValue('property_cost', rawValue);
                  }}
                  name="propertyCost"
                  bg="#FBFBFB"
                  border="1px solid #C0C0C0"
                  borderRadius="50px"
                  h="50px"
                  placeholder="₦ 0. 00"
                />
                <FormErrorMessage>
                  {typeof errors.property_cost === 'string'
                    ? errors.property_cost
                    : ''}
                </FormErrorMessage>
              </FormControl> */}
              <FormControl isInvalid={!!errors.duration && touched.duration}>
                <FormLabel fontWeight={600} fontSize={15} color="brand.400">
                  Duration of Payment in Month
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
                  name="duration"
                  type="number"
                  inputMode="numeric"
                />
                <FormErrorMessage>
                  {typeof errors.duration === 'string' ? errors.duration : ''}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                mb="10px"
                isInvalid={!!errors.payment_plan && touched.payment_plan}
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
                  name="payment_plan"
                >
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </Field>
                <FormErrorMessage>
                  {typeof errors.payment_plan === 'string'
                    ? errors.payment_plan
                    : ''}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.first_deposit && touched.first_deposit}
              >
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
                    setFieldValue('first_deposit', rawValue);
                  }}
                  name="first_deposit"
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
                  {typeof errors.first_deposit === 'string'
                    ? errors.first_deposit
                    : ''}
                </FormErrorMessage>
              </FormControl>
              <Flex
                alignItems="center"
                gap="24px"
                flexWrap={['wrap', 'nowrap']}
              >
                <FormControl
                  isInvalid={
                    !!errors.first_payment_date && touched.first_payment_date
                  }
                >
                  <FormLabel fontWeight={600} fontSize={15} color="brand.400">
                    First payment date
                  </FormLabel>
                  <Field
                    as={Input}
                    type="date"
                    name="first_payment_date"
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
                    {typeof errors.first_payment_date === 'string'
                      ? errors.first_payment_date
                      : ''}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={
                    !!errors.next_instalment_date &&
                    touched.next_instalment_date
                  }
                >
                  <FormLabel fontWeight={600} fontSize={15} color="brand.400">
                    Next payment date
                  </FormLabel>
                  <Field
                    as={Input}
                    type="date"
                    name="next_instalment_date"
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
                    {typeof errors.next_instalment_date === 'string'
                      ? errors.next_instalment_date
                      : ''}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              {/* <Flex
                alignItems="center"
                gap="24px"
                flexWrap={['wrap', 'nowrap']}
              >
                <FormControl
                  isInvalid={!!errors.bought_date && touched.bought_date}
                >
                  <FormLabel fontWeight={600} fontSize={15} color="brand.400">
                    Bought date
                  </FormLabel>
                  <Field
                    as={Input}
                    type="date"
                    name="bought_date"
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
                    {typeof errors.bought_date === 'string'
                      ? errors.bought_date
                      : ''}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors.payment_status && touched.payment_status}
                >
                  <FormLabel fontWeight={600} fontSize={15} color="brand.400">
                    Payment Status
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
                    name="payment_status"
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </Field>
                  <FormErrorMessage>
                    {typeof errors.payment_status === 'string'
                      ? errors.payment_status
                      : ''}
                  </FormErrorMessage>
                </FormControl>
              </Flex> */}
              <FormControl
                mb="10px"
                isInvalid={
                  !!errors.allocation_status && touched.allocation_status
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
                  name="allocation_status"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </Field>
                <FormErrorMessage>
                  {typeof errors.allocation_status === 'string'
                    ? errors.allocation_status
                    : ''}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                mb="10px"
                isInvalid={
                  !!errors.documentation_status && touched.documentation_status
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
                  name="documentation_status"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </Field>
                <FormErrorMessage>
                  {typeof errors.documentation_status === 'string'
                    ? errors.documentation_status
                    : ''}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                mb="10px"
                isInvalid={!!errors.handover_status && touched.handover_status}
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
                  name="handover_status"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </Field>
                <FormErrorMessage>
                  {typeof errors.handover_status === 'string'
                    ? errors.handover_status
                    : ''}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.comment && !!touched.comment}>
                <FormLabel fontWeight={600} fontSize={16} color="#222222">
                  Commments
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
                  name="comment"
                />
                <FormErrorMessage>
                  {typeof errors.comment === 'string' ? errors.comment : ''}
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

export default UpdateInstalmentPropertyForm;
