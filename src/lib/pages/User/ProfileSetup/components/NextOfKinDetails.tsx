import React from 'react';
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Flex,
  Select,
  Button,
  FormErrorMessage, useToast, Spinner
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { UpdateNextOfKinDetails } from '~/lib/api/services/profileService';
import { useRouter } from 'next/navigation';



const NextOfKinDetails = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) => {
    const toast = useToast();
    const router = useRouter();
    const [loading, setLoading] = React.useState<boolean>(false);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name of Next of Kin is required'),
    relationship: Yup.string().required('Relationship is required'),
    phoneNumber: Yup.string()
      .matches(/^\d{10,15}$/, 'Phone number must be between 10-15 digits')
      .required('Phone number is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email address is required'),
  });

  // Initial form values
  const initialValues = {
    name: '',
    relationship: '',
    phoneNumber: '',
    email: '',
  };

  // Handle form submission
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const formData = {
        fullname: values.name,
        relationship: values.relationship,
        phone: values.phoneNumber,
        email: values.email,
    }
    try {
        const res = await UpdateNextOfKinDetails(formData);
        if(res.status === true){
            toast({
                title: res.message as string,
                description: 'Next of Kin details updated successfully',
                duration: 3000,
                position: 'top-right',
                isClosable: true,
                status: 'success',
            });
            setLoading(false);
            router.push('/user/dashboard');
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
        })
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
          <Box as="section" w={['100%', '100%',"600px"]}>
            <Stack spacing="24px">
              {/* Name of Next of Kin */}
              <FormControl isInvalid={!!errors.name && touched.name}>
                <FormLabel fontWeight={600} fontSize={16} color="#222222">
                  Name of Next of Kin
                </FormLabel>
                <Field
                  as={Input}
                  name="name"
                  placeholder="Name of Next of Kin"
                  type="text"
                  border="1px solid #C0C0C0"
                  bg="#FBFBFB"
                  h="50px"
                  borderRadius="40px"
                  _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              {/* Relationship */}
              <FormControl
                isInvalid={!!errors.relationship && touched.relationship}
              >
                <FormLabel fontWeight={600} fontSize={16} color="#222222">
                  What is the relationship
                </FormLabel>
                <Field
                  as={Select}
                  name="relationship"
                  placeholder="Select relationship"
                  bg="#FBFBFB"
                  border="1px solid #C0C0C0"
                  borderRadius="50px"
                  h="50px"
                  color="#8295AA"
                >
                  <option value="Sister">Sister</option>
                  <option value="Brother">Brother</option>
                  <option value="Sibling">Sibling</option>
                </Field>
                <FormErrorMessage>{errors.relationship}</FormErrorMessage>
              </FormControl>

              {/* Phone Number */}
              <FormControl
                isInvalid={!!errors.phoneNumber && touched.phoneNumber}
              >
                <FormLabel fontWeight={600} fontSize={16} color="#222222">
                  Phone Number of Next of Kin
                </FormLabel>
                <Field
                  as={Input}
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  type="tel"
                  border="1px solid #C0C0C0"
                  bg="#FBFBFB"
                  h="50px"
                  borderRadius="40px"
                  _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                />
                <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
              </FormControl>

              {/* Email Address */}
              <FormControl isInvalid={!!errors.email && touched.email}>
                <FormLabel fontWeight={600} fontSize={16} color="#222222">
                  Email Address of Next of Kin
                </FormLabel>
                <Field
                  as={Input}
                  name="email"
                  placeholder="Enter email address"
                  type="email"
                  border="1px solid #C0C0C0"
                  bg="#FBFBFB"
                  h="50px"
                  borderRadius="40px"
                  _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
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
                  _hover={{ bg: '#ededff' }}
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
                  minW='150px'
                >
                    {loading ? <Spinner /> : 'Complete'}
                </Button>
              </Flex>
            </Stack>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default NextOfKinDetails;
