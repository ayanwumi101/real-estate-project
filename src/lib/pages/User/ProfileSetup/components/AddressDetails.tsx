import React, { useContext, useState, useEffect } from 'react';
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Flex,
  Select,
  Button,
  Checkbox, FormErrorMessage,
  useToast, Spinner
} from '@chakra-ui/react';
import { ProfileSetupContext } from '..';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { GetCountryStates, GetStateCities } from '~/lib/api/services/locationService';
import { UpdateUserAddress } from '~/lib/api/services/profileService';



const AddressDetails = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) => {
  const { countries } = useContext(ProfileSetupContext);
  const [states, setStates] = useState<[]>([]);
  const [cities, setCities] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    streetNumber: Yup.string().required('Street number is required'),
    streetName: Yup.string().required('Street name is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
  });

  // Initial form values
  const initialValues = {
    streetNumber: '',
    streetName: '',
    country: '',
    state: '',
    city: '',
  };

  // Handle form submission
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = {
      street_no: values.streetNumber,
      street_name: values.streetName,
      country_id: values.country,
      state_id: values.state,
      city_id: values.city,
    }
    try {
      const res = await UpdateUserAddress(formData);
      if(res.status === true) {
        toast({
          title: res.message as string,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        setStep(step + 1);
        console.log('Address updated successfully');
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
    setLoading(false);
  };
  

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ errors, touched, values, setFieldValue }) => {
        // Fetch states when country changes
        useEffect(() => {
          if (values.country) {
            setFieldValue('state', ''); // Reset state
            setFieldValue('city', ''); // Reset city
            setStates([]); // Clear previous states
            setCities([]); // Clear previous cities

            const fetchStates = async () => {
              try {
                const res = await GetCountryStates(values.country);
                setStates(res?.data || []);
              } catch (error) {
                console.error('Error fetching states:', error);
              }
            };

            fetchStates();
          }
        }, [values.country, setFieldValue]);

        // Fetch cities when state changes
        useEffect(() => {
          if (values.state) {
            setFieldValue('city', ''); // Reset city
            setCities([]); // Clear previous cities

            const fetchCities = async () => {
              try {
                const res = await GetStateCities(values.state);
                setCities(res?.data || []);
              } catch (error) {
                console.error('Error fetching cities:', error);
              }
            };

            fetchCities();
          }
        }, [values.state, setFieldValue]);

        return (
          <Form>
            <Box w={['100%', '100%', '600px']}>
              <Stack spacing="24px">
                <FormControl>
                  <FormLabel
                    fontWeight={600}
                    mb="16px"
                    fontSize={16}
                    color="#222222"
                  >
                    Fill in your address
                  </FormLabel>

                  {/* Street Number and Street Name */}
                  <Flex
                    alignItems="center"
                    gap="15px"
                    flexWrap={['wrap', 'wrap', 'nowrap']}
                    mb="22px"
                  >
                    <FormControl
                      isInvalid={!!errors.streetNumber && touched.streetNumber}
                      w={['100%', '100%', '50%']}
                    >
                      <Field
                        as={Input}
                        name="streetNumber"
                        border="1px solid #C0C0C0"
                        bg="#FBFBFB"
                        h="50px"
                        borderRadius="40px"
                        placeholder="Street No"
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                      />
                      <FormErrorMessage>{errors.streetNumber}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={!!errors.streetName && touched.streetName}
                      w={['100%', '100%', '50%']}
                    >
                      <Field
                        as={Input}
                        name="streetName"
                        border="1px solid #C0C0C0"
                        bg="#FBFBFB"
                        h="50px"
                        borderRadius="40px"
                        placeholder="Street Name"
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                      />
                      <FormErrorMessage>{errors.streetName}</FormErrorMessage>
                    </FormControl>
                  </Flex>

                  {/* Country, State, and City */}
                  <Flex
                    alignItems="center"
                    gap="15px"
                    flexWrap={['wrap', 'wrap', 'nowrap']}
                  >
                    {/* Country */}
                    <FormControl
                      isInvalid={!!errors.country && touched.country}
                      w={['100%', '100%', '50%']}
                    >
                      <Field
                        as={Select}
                        name="country"
                        placeholder="Country"
                        border="1px solid #C0C0C0"
                        bg="#FBFBFB"
                        h="50px"
                        borderRadius="40px"
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                      >
                        {countries?.map((country: any) => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </Field>
                      <FormErrorMessage>{errors.country}</FormErrorMessage>
                    </FormControl>

                    {/* State */}
                    <FormControl
                      isInvalid={!!errors.state && touched.state}
                      w={['100%', '100%', '50%']}
                    >
                      <Field
                        as={Select}
                        name="state"
                        placeholder="State"
                        border="1px solid #C0C0C0"
                        bg="#FBFBFB"
                        h="50px"
                        borderRadius="40px"
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                      >
                        {states.map((state: any) => (
                          <option key={state.id} value={state.id}>
                            {state.name}
                          </option>
                        ))}
                      </Field>
                      <FormErrorMessage>{errors.state}</FormErrorMessage>
                    </FormControl>

                    {/* City */}
                    <FormControl
                      isInvalid={!!errors.city && touched.city}
                      w={['100%', '100%', '50%']}
                    >
                      <Field
                        as={Select}
                        name="city"
                        placeholder="City"
                        border="1px solid #C0C0C0"
                        bg="#FBFBFB"
                        h="50px"
                        borderRadius="40px"
                        _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                      >
                        {cities.map((city: any) => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </Field>
                      <FormErrorMessage>{errors.city}</FormErrorMessage>
                    </FormControl>
                  </Flex>
                </FormControl>

                {/* Buttons */}
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
                    type="submit"
                    bg="#000080"
                    color="white"
                    h="48px"
                    borderRadius="30px"
                    fontWeight={600}
                    fontSize={16}
                    _hover={{ bg: '#000080' }}
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

export default AddressDetails;
