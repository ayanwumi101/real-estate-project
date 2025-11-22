'use client';

import React, { useEffect, Fragment } from 'react';
import Header from './components/Header';
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
import {
  GetAvailablePropertyDetails,
  UpdateProperty,
} from '~/lib/api/services/propertiesService';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import {
  GetAllCountries,
  GetCountryStates,
  GetStateLgas,
} from '~/lib/api/services/locationService';
import Link from 'next/link';
import { formatCurrency } from '~/lib/utils/formatAmount';
import { ChevronLeftIcon } from '~/lib/components/Icons/Icons';

const index = () => {
  const { id } = useParams();
  const router = useRouter();
  const toast = useToast();
  const searchParams = useSearchParams();
  const [propertyType, setPropertyType] = React.useState<
    'available' | 'instalment' | 'sold'
  >('available');
  const [propertyDetails, setPropertyDetails] = React.useState<any>([]);
  const [states, setStates] = React.useState<[]>([]);
  const [lgas, setLgas] = React.useState<[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [countries, setCountries] = React.useState<any>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [propertyCost, setPropertyCost] = React.useState<string>('');

  const getAvailablePropertyDetails = async () => {
    try {
      const res = await GetAvailablePropertyDetails(id as string);
      setPropertyDetails(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch all countries
  useEffect(() => {
    const GetCountries = async () => {
      try {
        const res = await GetAllCountries();
        setCountries(res?.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    GetCountries();
  }, []);

  // Fetch states when countries change
  useEffect(() => {
    const GetStates = async () => {
      setLoading(true);
      try {
        const res = await GetCountryStates(countries[0]?.id);
        setStates(res?.data || []);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    GetStates();
  }, [countries]);

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'available' || type === 'instalment' || type === 'sold') {
      setPropertyType(type);
    } else {
      setPropertyType('available');
    }
  }, [id, propertyType]);

  const initialValues = {
    propertyName: propertyDetails?.property_name || '',
    propertyType: propertyDetails?.property_type || '',
    propertySize: propertyDetails?.size || '',
    propertyAddress: {
      houseNumber: propertyDetails?.house_number || '',
      streetName: propertyDetails?.street_name || '',
      city: propertyDetails?.city_name || '',
      state: propertyDetails?.state_id || '',
      lga: propertyDetails?.lga_id || '',
    },
    additionalInfo: propertyDetails?.comment || '',
    propertyCost: propertyDetails?.property_cost || '',
  };

  const validationSchema = Yup.object({
    propertyName: Yup.string().required('Property name is required'),
    propertyType: Yup.string().required('Property type is required'),
    propertySize: Yup.string().required('Property size is required'),
    propertyAddress: Yup.object({
      houseNumber: Yup.string().required('House number is required'),
      streetName: Yup.string().required('Street name is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      lga: Yup.string().required('LGA is required'),
    }),
    propertyCost: Yup.string().required('Property cost is required'),
    additionalInfo: Yup.string(),
  });

  useEffect(() => {
    getAvailablePropertyDetails();
  }, [searchParams, id, propertyType]);

  useEffect(() => {
    if (propertyDetails) {
      setPropertyCost(propertyDetails.property_cost || '');
    }
  }, [id, propertyDetails]);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    const formData = {
      property_name: values.propertyName,
      property_type: values.propertyType,
      size: values.propertySize,
      house_number: values.propertyAddress.houseNumber,
      street_name: values.propertyAddress.streetName,
      city_name: values.propertyAddress.city,
      state_id: values.propertyAddress.state,
      lga_id: values.propertyAddress.lga,
      property_cost: values.propertyCost,
      comment: values.additionalInfo,
    };
    try {
      const res = await UpdateProperty(id as string, formData);
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
        title: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
    setIsSubmitting(false);
  };

  return (
    <RealtorDashboardLayout
      title={
        <Flex alignItems="center" gap="8px" flexWrap={['wrap', 'nowrap']}>
          <Text fontSize={[15, 16]} fontWeight={600} color="brand.400">
            Properties
          </Text>
          <BsChevronRight size={15} fontWeight={900} />
          <Text fontSize={[15, 16]} fontWeight={600} color="brand.400">
            {propertyType === 'available'
              ? 'Available'
              : propertyType === 'sold'
                ? 'Sold'
                : 'Instalment'}{' '}
            Properties
          </Text>
          <BsChevronRight size={15} fontWeight={900} />
          <Text fontSize={[15, 16]} fontWeight={600} color="brand.800">
            {propertyDetails?.property_name}
          </Text>
        </Flex>
      }
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, setFieldValue, values, setFieldTouched }) => {
          // Fetch lgas when state changes
          useEffect(() => {
            if (values?.propertyAddress?.state) {
              setFieldValue('values.propertyAddress.lga', ''); // Reset city
              const fetchLgas = async () => {
                try {
                  const res = await GetStateLgas(values.propertyAddress.state);
                  setLgas(res?.data || []);
                } catch (error) {
                  console.error('Error fetching cities:', error);
                }
              };
              fetchLgas();
            }
          }, [values?.propertyAddress?.state, setFieldValue]);

          return (
            <Form>
              <Stack maxW="700px" mx="auto" spacing="24px">
                <FormControl
                  isInvalid={!!errors.propertyName && !!touched.propertyName}
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    What would you like to name your property?
                  </FormLabel>
                  <Field
                    as={Input}
                    name="propertyName"
                    border="1px solid #C0C0C0"
                    bg="#FBFBFB"
                    h="50px"
                    borderRadius="40px"
                    placeholder="Name your property"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                  />
                  <FormErrorMessage>
                    {typeof errors.propertyName === 'string'
                      ? errors.propertyName
                      : null}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors.propertyType && !!touched.propertyType}
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    What type of property are you listing?
                  </FormLabel>
                  <Field
                    as={Select}
                    border="1px solid #C0C0C0"
                    bg="#FBFBFB"
                    h="50px"
                    borderRadius="40px"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                    name="propertyType"
                  >
                    <option value="select">Select Property Type</option>
                    <option value="Land">Land</option>
                    <option value="Building">Building</option>
                  </Field>
                  <FormErrorMessage>
                    {typeof errors.propertyType === 'string'
                      ? errors.propertyType
                      : null}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors.propertySize && !!touched.propertySize}
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    What is the size of this property?
                  </FormLabel>
                  <Field
                    as={Input}
                    name="propertySize"
                    border="1px solid #C0C0C0"
                    bg="#FBFBFB"
                    h="50px"
                    borderRadius="40px"
                    placeholder={
                      values?.propertyType === 'Land'
                        ? 'What is the plot size'
                        : 'How many bedrooms'
                    }
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                  />
                  <FormErrorMessage>
                    {typeof errors.propertySize === 'string'
                      ? errors.propertySize
                      : null}
                  </FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    Where is the property located?
                  </FormLabel>
                  <Flex
                    alignItems="flex-start"
                    justifyContent="space-between"
                    mb="22px"
                    gap="10px"
                    flexWrap={['wrap', 'wrap', 'nowrap']}
                  >
                    <FormControl
                      isInvalid={
                        !!errors?.propertyAddress?.houseNumber &&
                        !!touched?.propertyAddress?.houseNumber
                      }
                    >
                      <Field
                        as={Input}
                        border="1px solid #C0C0C0"
                        bg="#FBFBFB"
                        h="50px"
                        name="propertyAddress.houseNumber"
                        borderRadius="40px"
                        placeholder="Plot/block/house number"
                        _placeholder={{
                          color: '#8295AA',
                          fontWeight: 500,
                        }}
                        w="100%"
                      />
                      <FormErrorMessage>
                        {typeof errors?.propertyAddress?.houseNumber ===
                        'string'
                          ? errors.propertyAddress.houseNumber
                          : null}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={
                        !!errors.propertyAddress?.streetName &&
                        !!touched.propertyAddress?.streetName
                      }
                    >
                      <Field
                        as={Input}
                        border="1px solid #C0C0C0"
                        bg="#FBFBFB"
                        h="50px"
                        name="propertyAddress.streetName"
                        borderRadius="40px"
                        placeholder="Street/Estate Name"
                        _placeholder={{
                          color: '#8295AA',
                          fontWeight: 500,
                        }}
                        w="100%"
                      />
                      <FormErrorMessage>
                        {typeof errors.propertyAddress?.streetName === 'string'
                          ? errors.propertyAddress?.streetName
                          : null}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        !!errors.propertyAddress?.city &&
                        !!touched.propertyAddress?.city
                      }
                    >
                      <Field
                        as={Input}
                        border="1px solid #C0C0C0"
                        bg="#FBFBFB"
                        h="50px"
                        name="propertyAddress.city"
                        borderRadius="40px"
                        placeholder="City/town"
                        _placeholder={{
                          color: '#8295AA',
                          fontWeight: 500,
                        }}
                        w="100%"
                      />
                      <FormErrorMessage>
                        {typeof errors.propertyAddress?.city === 'string'
                          ? errors.propertyAddress?.city
                          : null}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Flex
                    alignItems="flex-start"
                    justifyContent="space-between"
                    gap="10px"
                    flexWrap={['wrap', 'wrap', 'nowrap']}
                  >
                    <FormControl
                      isInvalid={
                        !!errors.propertyAddress?.state &&
                        !!touched.propertyAddress?.state
                      }
                    >
                      <Field
                        as={Select}
                        name="propertyAddress.state"
                        border="1px solid #C0C0C0"
                        bg="#FBFBFB"
                        h="50px"
                        borderRadius="40px"
                        placeholder="State"
                        _placeholder={{
                          color: '#8295AA',
                          fontWeight: 500,
                        }}
                        w="100%"
                      >
                        {loading ? (
                          <option disabled value="">
                            Loading states ...
                          </option>
                        ) : (
                          <>
                            {states.map((state: any) => (
                              <option key={state.id} value={state.id}>
                                {state.name}
                              </option>
                            ))}
                          </>
                        )}
                      </Field>
                      <FormErrorMessage>
                        {typeof errors.propertyAddress?.state === 'string'
                          ? errors.propertyAddress?.state
                          : null}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        !!errors.propertyAddress?.lga &&
                        !!touched.propertyAddress?.lga
                      }
                    >
                      <Field
                        as={Select}
                        name="propertyAddress.lga"
                        border="1px solid #C0C0C0"
                        bg="#FBFBFB"
                        h="50px"
                        borderRadius="40px"
                        placeholder="LGA"
                        _placeholder={{
                          color: '#8295AA',
                          fontWeight: 500,
                        }}
                        w="100%"
                      >
                        {lgas?.length < 1 ? (
                          <option disabled value="">
                            Select state first
                          </option>
                        ) : (
                          <>
                            {lgas.map((lga: any) => (
                              <option key={lga.id} value={lga.id}>
                                {lga.name}
                              </option>
                            ))}
                          </>
                        )}
                      </Field>
                      <FormErrorMessage>
                        {typeof errors.propertyAddress?.lga === 'string'
                          ? errors.propertyAddress?.lga
                          : null}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                </FormControl>
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
                    !!errors.additionalInfo && !!touched.additionalInfo
                  }
                >
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
                    name="additionalInfo"
                  />
                  <FormErrorMessage>
                    {typeof errors.additionalInfo === 'string'
                      ? errors.additionalInfo
                      : ''}
                  </FormErrorMessage>
                </FormControl>
                <Flex justifyContent="space-between" alignItems="center">
                  <Link href="/realtor/properties">
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
                    {isSubmitting ? <Spinner /> : 'Save Property'}
                  </Button>
                </Flex>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </RealtorDashboardLayout>
  );
};

export default index;
