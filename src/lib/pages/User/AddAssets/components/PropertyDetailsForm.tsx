'use client';

import {
  Box,
  FormLabel,
  FormControl,
  Input,
  Stack,
  RadioGroup,
  Radio,
  Select,
  Button,
  Textarea,
  Flex,
  FormErrorMessage,
  Spinner,
  useToast,
  Heading,
  Text,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { AddAssetDetails } from '~/lib/api/services/assetsService';
import {
  GetCountryStates,
  GetStateLgas,
} from '~/lib/api/services/locationService';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import Cookie from 'js-cookie';
import { CreateAssetContext } from '..';

const PropertyDetailsForm = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) => {
  const toast = useToast();
  const [states, setStates] = useState<[]>([]);
  const [lgas, setLgas] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { setAssetData } = useContext<any>(CreateAssetContext);

  useEffect(() => {
    const GetStates = async () => {
      try {
        const res = await GetCountryStates(
          'da4e88a4-4c55-4724-8727-098b50731b96'
        );
        setStates(res?.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    GetStates();
  }, []);

  const initialValues = {
    propertyName: '',
    propertyType: '',
    propertySize: '',
    propertyAddress: {
      houseNumber: '',
      streetName: '',
      city: '',
      state: '',
      lga: '',
    },
    realtorDetails: {
      name: '',
    },
    phoneNumber: '',
    assetType: 'cashflow',
    // additionalComments: '',
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
    realtorDetails: Yup.object({
      name: Yup.string().required('Realtor name is required'),
    }),
    phoneNumber: Yup.string().required('Phone number is required'),
    assetType: Yup.string().required('Asset type is required'),
    // additionalComments: Yup.string().optional(),
  });

  const handleSubmit = async (values: any) => {
    setStep(step + 1);
    setAssetData({ ...values });
    // const formData = {
    //   property_name: values.propertyName,
    //   property_type: values.propertyType,
    //   size: values.propertySize,
    //   house_number: values.propertyAddress.houseNumber,
    //   street_name: values.propertyAddress.streetName,
    //   city_name: values.propertyAddress.city,
    //   state_id: values.propertyAddress.state,
    //   // comment: values.additionalComments,
    //   realtor_name: values.realtorDetails.name,
    //   phone: values.phoneNumber,
    //   lga_id: values.propertyAddress.lga,
    //   assetType: values.assetType,
    // };
    // setLoading(true);
    // try {
    //   const res = await AddAssetDetails(formData);
    //   if (res.status === true) {
    //     setLoading(false);
    //     toast({
    //       title: res.message as string,
    //       description: 'Property details saved',
    //       duration: 3000,
    //       position: 'top-right',
    //       isClosable: true,
    //       status: 'success',
    //     });
    //     Cookie.set('vestier-asset-id', res.data);
    //     setStep(step + 1);
    //     setAssetData({ ...formData });
    //   }
    // } catch (error: any) {
    //   setLoading(false);
    //   toast({
    //     title: error.response.data.message,
    //     description: 'Error Adding Property Details',
    //     duration: 3000,
    //     position: 'top-right',
    //     isClosable: true,
    //     status: 'error',
    //   });
    // }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue, values }) => {
        // Fetch lgas when state changes
        useEffect(() => {
          if (values.propertyAddress.state) {
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
        }, [values.propertyAddress.state, setFieldValue]);

        return (
          <Form>
            <Box w="100%">
              <Stack spacing="24px">
                <Box>
                  <Heading
                    fontSize={24}
                    fontWeight={700}
                    color="brand.100"
                    mb="6px"
                  >
                    Property Details
                  </Heading>
                  <Text color="brand.300" fontWeight={500}>
                    Get started with adding your property to asset by filling
                    the forms
                  </Text>
                </Box>
                <FormControl
                  isInvalid={!!errors.propertyName && touched.propertyName}
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
                  <FormErrorMessage>{errors.propertyName}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors.propertyType && touched.propertyType}
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    What kind of property are you listing?
                  </FormLabel>
                  <RadioGroup
                    onChange={(value) => setFieldValue('propertyType', value)}
                    value={values.propertyType}
                  >
                    <Stack spacing="12px">
                      <Radio name="Land" size="lg" value="Land">
                        Land
                      </Radio>
                      <Radio name="Building" size="lg" value="Building">
                        Building
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <FormErrorMessage>{errors.propertyType}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors.propertySize && touched.propertySize}
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
                  <FormErrorMessage>{errors.propertySize}</FormErrorMessage>
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
                        !!errors.propertyAddress?.houseNumber &&
                        touched.propertyAddress?.houseNumber
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
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                        w="100%"
                      />
                      <FormErrorMessage>
                        {errors.propertyAddress?.houseNumber}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={
                        !!errors.propertyAddress?.streetName &&
                        touched.propertyAddress?.streetName
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
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                        w="100%"
                      />
                      <FormErrorMessage>
                        {errors.propertyAddress?.streetName}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        !!errors.propertyAddress?.city &&
                        touched.propertyAddress?.city
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
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                        w="100%"
                      />
                      <FormErrorMessage>
                        {errors.propertyAddress?.city}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Flex
                    alignItems="flex-start"
                    justifyContent="space-between"
                    mb="15px"
                    gap="10px"
                    flexWrap={['wrap', 'wrap', 'nowrap']}
                  >
                    <FormControl
                      isInvalid={
                        !!errors.propertyAddress?.state &&
                        touched.propertyAddress?.state
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
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                        w="100%"
                      >
                        {states.map((state: any) => (
                          <option key={state.id} value={state.id}>
                            {state.name}
                          </option>
                        ))}
                      </Field>
                      <FormErrorMessage>
                        {errors.propertyAddress?.state}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        !!errors.propertyAddress?.lga &&
                        touched.propertyAddress?.lga
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
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                        w="100%"
                      >
                        {lgas.map((lga: any) => (
                          <option key={lga.id} value={lga.id}>
                            {lga.name}
                          </option>
                        ))}
                      </Field>
                      <FormErrorMessage>
                        {errors.propertyAddress?.lga}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    Enter your realtor name
                  </FormLabel>
                  <FormControl
                    isInvalid={
                      !!errors.realtorDetails?.name &&
                      touched.realtorDetails?.name
                    }
                  >
                    <Field
                      as={Input}
                      border="1px solid #C0C0C0"
                      bg="#FBFBFB"
                      h="50px"
                      borderRadius="40px"
                      placeholder="Name of Realtor"
                      _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                      name="realtorDetails.name"
                    />
                    <FormErrorMessage>
                      {errors.realtorDetails?.name}
                    </FormErrorMessage>
                  </FormControl>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.phoneNumber && touched.phoneNumber}
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    Enter Realtor’s Phone number
                  </FormLabel>
                  <Field
                    as={Input}
                    bg="#FBFBFB"
                    h="50px"
                    placeholder="Enter your phone number"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                    type="tel"
                    name="phoneNumber"
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                  />
                  <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.assetType && touched.assetType}
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    What kind of asset are you registering?
                  </FormLabel>
                  <RadioGroup
                    onChange={(value) => setFieldValue('assetType', value)}
                    value={values.assetType}
                  >
                    <Stack spacing="16px">
                      <Box
                        w="100%"
                        borderRadius="20px"
                        py="30px"
                        px="24px"
                        border="1px solid"
                        borderColor="border.200"
                      >
                        <Flex alignItems="flex-start" gap="24px">
                          <Radio name="cashflow" size="lg" value="cashflow" />
                          <Stack>
                            <Heading
                              fontSize={16}
                              fontWeight={600}
                              color="brand.400"
                            >
                              Cashflow Asset
                            </Heading>
                            <Text color="brand.300">
                              Property that generates a regular stream of income
                              such as lease, rental income regardless of its
                              price appreciation. These assets provide a steady
                              cash flow over time.
                            </Text>
                          </Stack>
                        </Flex>
                      </Box>
                      <Box
                        w="100%"
                        borderRadius="20px"
                        py="30px"
                        px="24px"
                        border="1px solid"
                        borderColor="border.200"
                      >
                        <Flex alignItems="flex-start" gap="24px">
                          <Radio name="owned" size="lg" value="owned" />
                          <Stack>
                            <Heading
                              fontSize={16}
                              fontWeight={600}
                              color="brand.400"
                            >
                              Owned Asset
                            </Heading>
                            <Text color="brand.300">
                              Property that you fully possess and control. They
                              simply appreciate in value over time or serve a
                              personal or operational purpose.
                            </Text>
                          </Stack>
                        </Flex>
                      </Box>
                      <Box
                        w="100%"
                        borderRadius="20px"
                        py="30px"
                        px="24px"
                        border="1px solid"
                        borderColor="border.200"
                      >
                        <Flex alignItems="flex-start" gap="24px">
                          <Radio name="instalment" size="lg" value="instalment" />
                          <Stack>
                            <Heading
                              fontSize={16}
                              fontWeight={600}
                              color="brand.400"
                            >
                              Instalment Asset
                            </Heading>
                            <Text color="brand.300">
                              Property you acquire through a financing
                              arrangement where you make regular payments over
                              time instead of paying the full amount upfront.
                            </Text>
                          </Stack>
                        </Flex>
                      </Box>
                    </Stack>
                  </RadioGroup>
                  <FormErrorMessage>{errors.assetType}</FormErrorMessage>
                </FormControl>
                <Flex justifyContent="flex-end">
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

export default PropertyDetailsForm;
