'use client'

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
  FormErrorMessage, Spinner, useToast
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AddAssetDetails } from '~/lib/api/services/assetsService';
import {
  GetCountryStates,
  GetStateLgas,
} from '~/lib/api/services/locationService';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

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
      businessName: '',
      name: '',
      officeAddress: {
        houseNumber: '',
        streetName: '',
        city: '',
        state: '',
        lga: '',
      },
    },
    phoneNumber: '',
    additionalComments: '',
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
      businessName: Yup.string().required('Realtor business name is required'),
      name: Yup.string().required('Realtor name is required'),
      officeAddress: Yup.object({
        houseNumber: Yup.string().required('Office house number is required'),
        streetName: Yup.string().required('Office street name is required'),
        city: Yup.string().required('Office city is required'),
        state: Yup.string().required('Office state is required'),
        lga: Yup.string().required('Office LGA is required'),
      }),
    }),
    phoneNumber: Yup.string().required('Phone number is required'),
    additionalComments: Yup.string().optional(),
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
      comment: values.additionalComments,
      realtor_name: values.realtorDetails.name,
      business_name: values.realtorDetails.businessName,
      realtor_house_number: values.realtorDetails.officeAddress.houseNumber,
      realtor_street_name: values.realtorDetails.officeAddress.streetName,
      realtor_city_name: values.realtorDetails.officeAddress.city,
      realtor_city_town: values.realtorDetails.officeAddress.city,
      realtor_state_id: values.realtorDetails.officeAddress.state,
      realtor_lga_id: values.realtorDetails.officeAddress.lga,
      phone: values.phoneNumber,
      lga_id: values.propertyAddress.lga,
    };
    setLoading(true);
    try {
      const res = await AddAssetDetails(formData);
      if(res.status === true){
        setLoading(false);
        toast({
          title: res.message as string,
          description: 'Property details saved',
          duration: 3000,
          position: 'top-right',
          isClosable: true,
          status: 'success',
        });
        setStep(step + 1);
      }
    } catch (error: any) {
      setLoading(false);
      toast({
        title: error.response.data.message,
        description: 'Error Adding Property Details',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
        status: 'error',
      })
    }
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

        useEffect(() => {
          if (values.realtorDetails.officeAddress.state) {
            setFieldValue('values.realtorDetails.officeAddress.lga', ''); // Reset city
            const fetchLgas = async () => {
              try {
                const res = await GetStateLgas(
                  values.realtorDetails.officeAddress.state
                );
                setLgas(res?.data || []);
              } catch (error) {
                console.error('Error fetching cities:', error);
              }
            };
            fetchLgas();
          }
        }, [values.realtorDetails.officeAddress.state, setFieldValue]);

        return (
          <Form>
            <Box w="600px">
              <Stack spacing="24px">
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
                  <FormLabel>What kind of property are you listing?</FormLabel>
                  <RadioGroup
                    onChange={(value) => setFieldValue('propertyType', value)}
                    value={values.propertyType}
                  >
                    <Stack>
                      <Radio name="Land" value="Land">
                        Land
                      </Radio>
                      <Radio name="Building" value="Building">
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
                    placeholder="Name your property"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                  />
                  <FormErrorMessage>{errors.propertySize}</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    Where is the property located?
                  </FormLabel>
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    mb="22px"
                    gap="10px"
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
                    alignItems="center"
                    justifyContent="space-between"
                    mb="15px"
                    gap="10px"
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
                    Enter your realtor details
                  </FormLabel>
                  <FormControl
                    isInvalid={
                      !!errors.realtorDetails?.businessName &&
                      touched.realtorDetails?.businessName
                    }
                    mb="22px"
                  >
                    <Field
                      as={Input}
                      border="1px solid #C0C0C0"
                      bg="#FBFBFB"
                      h="50px"
                      borderRadius="40px"
                      placeholder="Realtor Business Name"
                      _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                      name="realtorDetails.businessName"
                    />
                    <FormErrorMessage>
                      {errors.realtorDetails?.businessName}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    mb="22px"
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
                <FormControl>
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    Office address of realtor
                  </FormLabel>
                  <Flex
                    alignItems="flex-start"
                    justifyContent="space-between"
                    mb="22px"
                    gap="10px"
                  >
                    <FormControl
                      isInvalid={
                        !!errors.realtorDetails?.officeAddress?.houseNumber &&
                        touched.realtorDetails?.officeAddress?.houseNumber
                      }
                    >
                      <Field
                        as={Input}
                        border="1px solid #C0C0C0"
                        bg="#FBFBFB"
                        h="50px"
                        borderRadius="40px"
                        placeholder="Plot/block/house number"
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                        w="100%"
                        name="realtorDetails.officeAddress.houseNumber"
                      />
                      <FormErrorMessage>
                        {errors.realtorDetails?.officeAddress?.houseNumber}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        !!errors.realtorDetails?.officeAddress?.streetName &&
                        touched.realtorDetails?.officeAddress?.streetName
                      }
                    >
                      <Field
                        as={Input}
                        border="1px solid #C0C0C0"
                        bg="#FBFBFB"
                        h="50px"
                        borderRadius="40px"
                        placeholder="Street/Estate Name"
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                        w="100%"
                        name="realtorDetails.officeAddress.streetName"
                      />
                      <FormErrorMessage>
                        {errors.realtorDetails?.officeAddress?.streetName}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        !!errors.realtorDetails?.officeAddress?.city &&
                        touched.realtorDetails?.officeAddress?.city
                      }
                    >
                      <Field
                        as={Input}
                        border="1px solid #C0C0C0"
                        bg="#FBFBFB"
                        h="50px"
                        borderRadius="40px"
                        placeholder="City/Town"
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                        w="100%"
                        name="realtorDetails.officeAddress.city"
                      />
                      <FormErrorMessage>
                        {errors.realtorDetails?.officeAddress?.city}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Flex
                    alignItems="flex-start"
                    justifyContent="space-between"
                    mb="15px"
                    gap="10px"
                  >
                    <FormControl
                      isInvalid={
                        !!errors.realtorDetails?.officeAddress?.state &&
                        touched.realtorDetails?.officeAddress?.state
                      }
                    >
                      <Field
                        as={Select}
                        border="1px solid #C0C0C0"
                        bg="#FBFBFB"
                        h="50px"
                        borderRadius="40px"
                        placeholder="State"
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                        w="100%"
                        name="realtorDetails.officeAddress.state"
                      >
                        {states.map((state: any) => (
                          <option key={state.id} value={state.id}>
                            {state.name}
                          </option>
                        ))}
                      </Field>
                      <FormErrorMessage>
                        {errors.realtorDetails?.officeAddress?.state}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        !!errors.realtorDetails?.officeAddress?.lga &&
                        touched.realtorDetails?.officeAddress?.lga
                      }
                    >
                      <Field
                        as={Select}
                        border="1px solid #C0C0C0"
                        bg="#FBFBFB"
                        h="50px"
                        borderRadius="40px"
                        placeholder="LGA"
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                        w="100%"
                        name="realtorDetails.officeAddress.lga"
                      >
                        {lgas.map((lga: any) => (
                          <option key={lga.id} value={lga.id}>
                            {lga.name}
                          </option>
                        ))}
                      </Field>
                      <FormErrorMessage>
                        {errors.realtorDetails?.officeAddress?.lga}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.phoneNumber && touched.phoneNumber}
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    Enter Realtor’s Phone number
                  </FormLabel>
                  <Flex border="1px solid #C0C0C0" borderRadius="50px">
                    <Select
                      w="115px"
                      bg="#F5F5F5"
                      borderTopLeftRadius="50px"
                      borderBottomLeftRadius="50px"
                      border="none"
                      h="50px"
                    >
                      <option value="">+234</option>
                      <option value="">+235</option>
                      <option value="">+236</option>
                    </Select>

                    <Field
                      as={Input}
                      borderTopRightRadius="50px"
                      borderBottomRightRadius="50px"
                      border="none"
                      bg="#FBFBFB"
                      h="50px"
                      placeholder="Enter your phone number"
                      _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                      type="tel"
                      name="phoneNumber"
                    />
                  </Flex>
                  <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.additionalComments && touched.additionalComments
                  }
                >
                  <FormLabel fontWeight={600} fontSize={16} color="#222222">
                    Add any additional comment
                  </FormLabel>
                  <Field
                    as={Textarea}
                    border="1px solid #C0C0C0"
                    bg="#FBFBFB"
                    h="85px"
                    borderRadius="20px"
                    placeholder="Enter any additional comments you want to remember"
                    _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                    resize="none"
                    px="25px"
                    py="15px"
                    name="additionalComments"
                    overflow="hidden"
                  />
                  <FormErrorMessage>
                    {errors.additionalComments}
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
                  >
                    {loading ? <Spinner /> : "Continue"}
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
