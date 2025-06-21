import {
  Box,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Divider,
  Heading,
  Text,
  Stack,
  Button,
  Flex,
  Spinner,
  Select,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import React from 'react';
import CustomModal from '~/lib/components/Modal';
import * as Yup from 'yup';
import {
  GetUserProfileDetails,
  UpdatebankDetails,
} from '~/lib/api/services/profileService';

const AddBankDetailsModal = ({
  isOpen,
  onClose,
  type,
  userDetails,
  setUserDetails,
  banks,
}: {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  userDetails: any;
  setUserDetails: (userDetails: any) => void;
  banks: any[];
}) => {
  const toast = useToast();
  const [loading, setLoading] = React.useState<boolean>(false);
  const initialValues = {
    bankName: userDetails?.bank_name || '',
    accountNumber: userDetails?.account_number || '',
    accountName: userDetails?.account_name || '',
  };

  const validationSchema = Yup.object({
    bankName: Yup.string().required('Bank name is required'),
    accountNumber: Yup.string().required('Account number is required'),
    accountName: Yup.string().required('Account name is required'),
  });

  // function to handle bank details submission
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = {
      bank_name: values.bankName,
      account_number: values.accountNumber,
      account_name: values.accountName,
    };
    try {
      const res = await UpdatebankDetails(formData);
      if (res.status === true) {
        const res = await GetUserProfileDetails();
        const data = await res.data;
        setUserDetails(data);
        toast({
          title: res.message as string,
          description: 'Bank details updated successfully',
          duration: 3000,
          position: 'top-right',
          isClosable: true,
          status: 'success',
        });
        setLoading(false);
        onClose();
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
    <Box w="100%">
      <CustomModal isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ errors, touched, values, setFieldValue }) => {
            return (
              <Form>
                <Stack spacing="20px" w="100%">
                  <Heading fontSize={24} fontWeight={500} color="brand.100">
                    {type === 'add' ? 'Add Bank Details' : 'Edit Bank Details'}
                  </Heading>
                  <Divider />
                  <FormControl
                    isInvalid={!!errors.bankName && !!touched.bankName}
                  >
                    <FormLabel>Bank Name</FormLabel>
                    <Field
                      as={Select}
                      name="bankName"
                      placeholder="Select bank name"
                      h="50px"
                      border="1px solid #C0C0C0"
                      borderRadius="50px"
                    >
                      {banks?.map((bank: any) => (
                        <option key={bank.name} value={bank.name}>
                          {bank.name}
                        </option>
                      ))}
                    </Field>
                    <FormErrorMessage>
                      {typeof errors.bankName === 'string'
                        ? errors.bankName
                        : ''}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      !!errors.accountNumber && !!touched.accountNumber
                    }
                  >
                    <FormLabel>Account Number</FormLabel>
                    <Field
                      as={Input}
                      name="accountNumber"
                      type="tel"
                      placeholder="Enter account number"
                      h="50px"
                      border="1px solid #C0C0C0"
                      borderRadius="50px"
                    />
                    <FormErrorMessage>
                      {typeof errors.accountNumber === 'string'
                        ? errors.accountNumber
                        : ''}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.accountName && !!touched.accountName}
                  >
                    <FormLabel>Account Name</FormLabel>
                    <Field
                      as={Input}
                      name="accountName"
                      type="text"
                      placeholder="Enter your account name"
                      h="50px"
                      border="1px solid #C0C0C0"
                      borderRadius="50px"
                    />
                    <FormErrorMessage>
                      {typeof errors.accountName === 'string'
                        ? errors.accountName
                        : ''}
                    </FormErrorMessage>
                  </FormControl>
                  <Flex
                    alignItems="center"
                    justifyContent="flex-end"
                    gap="30px"
                  >
                    <Button
                      bg="brand.500"
                      color="brand.100"
                      fontWeight={500}
                      minW="100px"
                      onClick={onClose}
                      _hover={{ bg: '#EDEDFF' }}
                    >
                      Cancel
                    </Button>
                    <Button
                      bg="brand.100"
                      color="brand.200"
                      fontWeight={500}
                      minW="150px"
                      type="submit"
                      isDisabled={loading}
                      _hover={{ bg: 'brand.100' }}
                    >
                      {loading ? (
                        <Spinner />
                      ) : type === 'add' ? (
                        'Add Details'
                      ) : (
                        'Update Details'
                      )}
                    </Button>
                  </Flex>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </CustomModal>
    </Box>
  );
};

export default AddBankDetailsModal;
