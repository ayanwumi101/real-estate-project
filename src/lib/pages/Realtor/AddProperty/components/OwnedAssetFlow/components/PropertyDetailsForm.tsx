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
  GetAllCountries,
  GetCountryStates,
  GetStateLgas,
} from '~/lib/api/services/locationService';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import Cookie from 'js-cookie';
import { CreateAssetContext } from '../../..';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ChevronLeftIcon } from '~/lib/components/Icons/Icons';

const PropertyDetailsForm = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) => {
  const [states, setStates] = useState<[]>([]);
  const [lgas, setLgas] = useState<[]>([]);
  const [countries, setCountries] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { setAssetType, assetType, assetData, setAssetData } =
    useContext<any>(CreateAssetContext);

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
      ``;
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
    phoneNumber: assetData?.phoneNumber || '234',
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
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .min(7, 'Phone number must be at least 7 digits'),
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
    setAssetData(values);
    setStep(step + 1);
  };

  return (
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
            <Box w="100%">
              <Stack spacing="24px">
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
                  <Select
                    onChange={(value) => setFieldValue('propertyType', value)}
                    value={values.propertyType}
                    border="1px solid #C0C0C0"
                    bg="#FBFBFB"
                    h="50px"
                    borderRadius="40px"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                  >
                    <option value="Land">Land</option>
                    <option value="Building">Building</option>
                  </Select>
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
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
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
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
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
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
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
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
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
                      {typeof errors.realtorDetails?.name === 'string'
                        ? errors.realtorDetails?.name
                        : null}
                    </FormErrorMessage>
                  </FormControl>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.phoneNumber && !!touched.phoneNumber}
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    Enter Realtor’s Phone number
                  </FormLabel>
                  <PhoneInput
                    value={values.phoneNumber}
                    onChange={(value: string) =>
                      setFieldValue('phoneNumber', value)
                    }
                    onBlur={() => setFieldTouched('phoneNumber', true)}
                    containerStyle={{
                      border: '1px solid #C0C0C0',
                      backgroundColor: '#FBFBFB',
                      padding: '5px 14px 5px 14px',
                      borderRadius: '24px',
                      height: '50px',
                    }}
                    inputStyle={{
                      border: 'none',
                      paddingLeft: '50px',
                      paddingTop: '5px',
                      backgroundColor: '#FBFBFB',
                    }}
                    buttonStyle={{
                      border: 'none',
                      background: 'none',
                    }}
                  />
                  <FormErrorMessage>
                    {typeof errors?.phoneNumber === 'string'
                      ? errors.phoneNumber
                      : null}
                  </FormErrorMessage>
                </FormControl>
                <Flex justifyContent="space-between" alignItems="center">
                  <Button
                    leftIcon={<ChevronLeftIcon />}
                    color="brand.100"
                    fontWeight={600}
                    variant="ghost"
                    _hover={{ bg: 'none' }}
                    isDisabled={true}
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

export default PropertyDetailsForm;
