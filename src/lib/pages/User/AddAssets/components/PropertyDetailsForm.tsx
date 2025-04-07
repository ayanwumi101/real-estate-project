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
  const { setAssetType, assetType, assetData, setAssetData } =
    useContext<any>(CreateAssetContext);

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
    propertyName: assetData?.propertyName || '',
    propertyType: assetData?.propertyType || '',
    propertySize: assetData?.propertySize || '',
    propertyAddress: {
      houseNumber: assetData?.propertyAddress?.houseNumber || '',
      streetName: assetData?.propertyAddress?.streetName || '',
      city: assetData?.propertyAddress?.city || '',
      state: assetData?.propertyAddress?.state || '',
      lga: assetData?.propertyAddress?.lga || '',
    },
    realtorDetails: {
      name: assetData?.realtorDetails?.name || '',
    },
    phoneNumber: assetData?.phoneNumber || '',
    assetType: assetData?.assetType || 'cashflow',
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
  });

  const handleSubmit = async (values: any) => {
    const formData = {
      property_name: values.propertyName,
      property_type: values.propertyType,
      size: values.propertySize,
      house_number: values.propertyAddress.houseNumber,
      street_name: values.propertyAddress.streetName,
      city_name: values.propertyAddress.city,
      state_id: values.propertyAddress.state,
      realtor_name: values.realtorDetails.name,
      phone: values.phoneNumber,
      lga_id: values.propertyAddress.lga,
      asset_type: values.assetType,
    };
    setAssetType(values.assetType);
    setAssetData(formData);
    setStep(step + 1);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ errors, touched, setFieldValue, values }) => {
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
                    {typeof errors.propertyName === 'string' ? errors.propertyName : null}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors.propertyType && !!touched.propertyType}
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
                  <FormErrorMessage>
                    {typeof errors.propertyType === 'string' ? errors.propertyType : null}
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
                    {typeof errors.propertySize === 'string' ? errors.propertySize : null}
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
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                        w="100%"
                      />
                      <FormErrorMessage>
                        {typeof errors?.propertyAddress?.houseNumber === 'string' ? errors.propertyAddress.houseNumber : null}
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
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                        w="100%"
                      />
                      <FormErrorMessage>
                        {typeof errors.propertyAddress?.streetName === 'string' ? errors.propertyAddress?.streetName : null}
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
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                        w="100%"
                      />
                      <FormErrorMessage>
                        {typeof errors.propertyAddress?.city === 'string' ? errors.propertyAddress?.city : null}
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
                        {typeof errors.propertyAddress?.state === 'string' ? errors.propertyAddress?.state : null}
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
                        {typeof errors.propertyAddress?.lga === 'string' ? errors.propertyAddress?.lga : null}
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
                      !!touched.realtorDetails?.name
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
                      {typeof errors.realtorDetails?.name === 'string' ? errors.realtorDetails?.name : null}
                    </FormErrorMessage>
                  </FormControl>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.phoneNumber && !!touched.phoneNumber}
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
                  <FormErrorMessage>
                    {typeof errors?.phoneNumber === 'string' ? errors.phoneNumber : null}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.assetType && !!touched.assetType}
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
                        border="1px solid"
                        borderColor="border.200"
                      >
                        <Radio
                          name="cashflow"
                          size="lg"
                          value="cashflow"
                          py="30px"
                          px="24px"
                          w="100%"
                          alignItems="flex-start"
                          gap="20px"
                        >
                          <Stack>
                            <Heading
                              fontSize={16}
                              fontWeight={600}
                              color="brand.400"
                            >
                              Cashflow Asset
                            </Heading>
                            <Text color="brand.300" fontSize={16}>
                              Property that generates a regular stream of income
                              such as lease, rental income regardless of its
                              price appreciation. These assets provide a steady
                              cash flow over time.
                            </Text>
                          </Stack>
                        </Radio>
                      </Box>
                      <Box
                        w="100%"
                        borderRadius="20px"
                        border="1px solid"
                        borderColor="border.200"
                      >
                        <Radio
                          name="owned"
                          size="lg"
                          value="owned"
                          py="30px"
                          px="24px"
                          w="100%"
                          alignItems="flex-start"
                          gap="20px"
                        >
                          <Stack>
                            <Heading
                              fontSize={16}
                              fontWeight={600}
                              color="brand.400"
                            >
                              Owned Asset
                            </Heading>
                            <Text color="brand.300" fontSize={16}>
                              Property that you fully possess and control. They
                              simply appreciate in value over time or serve a
                              personal or operational purpose.
                            </Text>
                          </Stack>
                        </Radio>
                      </Box>
                      <Box
                        w="100%"
                        borderRadius="20px"
                        border="1px solid"
                        borderColor="border.200"
                      >
                        <Radio
                          py="30px"
                          px="24px"
                          name="instalment"
                          size="lg"
                          value="instalment"
                          w="100%"
                          alignItems="flex-start"
                          gap="20px"
                        >
                          <Stack>
                            <Heading
                              fontSize={16}
                              fontWeight={600}
                              color="brand.400"
                            >
                              Instalment Asset
                            </Heading>
                            <Text color="brand.300" fontSize={16}>
                              Property you acquire through a financing
                              arrangement where you make regular payments over
                              time instead of paying the full amount upfront.
                            </Text>
                          </Stack>
                        </Radio>
                      </Box>
                    </Stack>
                  </RadioGroup>
                  <FormErrorMessage>
                    {typeof errors.assetType === 'string' ? errors.assetType : null}
                  </FormErrorMessage>
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

export default PropertyDetailsForm;
