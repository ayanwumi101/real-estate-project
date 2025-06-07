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
  useToast,
  Spinner,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ProfileSetupContext } from '..';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { UpdatebankDetails } from '~/lib/api/services/profileService';
import { ChevronLeftIcon } from '~/lib/components/Icons/Icons';

const BankDetails = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) => {
  const { banks } = useContext(ProfileSetupContext);
  const [loading, setLoading] = React.useState<boolean>(false);
  const toast = useToast();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    bank: Yup.string().required('Bank is required'),
    accountNumber: Yup.string()
      .matches(/^\d{10}$/, 'Account number must be 10 digits')
      .required('Account number is required'),
    accountName: Yup.string().required('Account name is required'),
  });

  // Initial form values
  const initialValues = {
    bank: '',
    accountNumber: '',
    accountName: '',
  };

  // Handle form submission
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = {
      bank_name: values.bank,
      account_number: values.accountNumber,
      account_name: values.accountName,
    };
    try {
      const res = await UpdatebankDetails(formData);
      if (res.status === true) {
        toast({
          title: res.message as string,
          description: 'Bank details updated successfully',
          duration: 3000,
          position: 'top-right',
          isClosable: true,
          status: 'success',
        });
        setLoading(false);
        setStep(step + 1);
        console.log(res);
      }
    } catch (error: any) {
      setLoading(false);
      toast({
        title: error.response.data.message as string,
        description: 'An error occurred',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
        status: 'error',
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Box as="section" w={['100%', '100%', '600px']}>
            <Stack spacing="24px">
              {/* Bank Selection */}
              <FormControl isInvalid={!!errors.bank && touched.bank}>
                <FormLabel fontWeight={600} fontSize={16} color="#222222">
                  Select your bank
                </FormLabel>
                <Field
                  as={Select}
                  name="bank"
                  placeholder="Select your bank"
                  bg="#FBFBFB"
                  border="1px solid #C0C0C0"
                  borderRadius="50px"
                  h="50px"
                  color="#8295AA"
                >
                  {banks?.map((bank: any) => (
                    <option key={bank.name} value={bank.name}>
                      {bank.name}
                    </option>
                  ))}
                </Field>
                <FormErrorMessage>{errors.bank}</FormErrorMessage>
              </FormControl>

              {/* Account Number */}
              <FormControl
                isInvalid={!!errors.accountNumber && touched.accountNumber}
              >
                <FormLabel fontWeight={600} fontSize={16} color="#222222">
                  Account Number
                </FormLabel>
                <Field
                  as={Input}
                  type="tel"
                  name="accountNumber"
                  border="1px solid #C0C0C0"
                  bg="#FBFBFB"
                  h="50px"
                  borderRadius="40px"
                  placeholder="e.g 1234567890"
                  _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                />
                <FormErrorMessage>{errors.accountNumber}</FormErrorMessage>
              </FormControl>

              {/* Account Name */}
              <FormControl
                isInvalid={!!errors.accountName && touched.accountName}
              >
                <FormLabel fontWeight={600} fontSize={16} color="#222222">
                  Account Name
                </FormLabel>
                <Field
                  as={Input}
                  type="text"
                  name="accountName"
                  border="1px solid #C0C0C0"
                  bg="#FBFBFB"
                  h="50px"
                  borderRadius="40px"
                  placeholder="Enter Account Name"
                  _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                />
                <FormErrorMessage>{errors.accountName}</FormErrorMessage>
              </FormControl>

              {/* Buttons */}
              <Flex justifyContent="space-between" alignItems="center">
                <Button
                  leftIcon={<ChevronLeftIcon />}
                  variant="ghost"
                  _hover={{ bg: 'none' }}
                  color="brand.100"
                >
                  Back
                </Button>
                <Box>
                  <Flex alignItems="center" gap={['10px', '20px']}>
                    <Button
                      bg="brand.500"
                      color="brand.100"
                      _hover={{ bg: 'brand.500' }}
                      h="48px"
                      borderRadius="30px"
                      fontWeight={600}
                      fontSize={16}
                      minW="100px"
                      onClick={() => setStep(step + 1)}
                    >
                      Skip
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
                      minW={['100px', '110px']}
                    >
                      {loading ? <Spinner /> : 'Continue'}
                    </Button>
                  </Flex>
                </Box>
              </Flex>
            </Stack>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default BankDetails;
