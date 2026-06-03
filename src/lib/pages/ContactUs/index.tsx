'use client'

import {
  Box,
  Heading,
  Text,
  Input,
  FormLabel,
  FormControl,
  Flex,
  Stack,
  Textarea,
  Button,
  useToast,
  Spinner,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { ContactUS } from '~/lib/api/services/contactService';

const ContactForm = () => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email address is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    resetForm: () => void
  ) => {
    setLoading(true);
    try {
      await ContactUS({
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
        phone: values.phoneNumber,
        subject: values.subject,
        message: values.message,
      });
      toast({
        title: 'Message Sent Successfully',
        description: 'Your message has been sent successfully',
        duration: 3000,
        status: 'success',
        position: 'top',
        isClosable: true,
      });
      resetForm();
    } catch (error: any) {
      toast({
        title:
          error?.response?.data?.error?.message ||
          'An error occurred while sending your message',
        description: 'An error occurred while sending your message',
        duration: 3000,
        status: 'error',
        position: 'top',
        isClosable: true,
      });
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Box p={['20px', '40px']} bg="brand.200" boxShadow="md" borderRadius="40px">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Stack spacing="40px">
              <Box>
                <Heading
                  fontSize={32}
                  mb="10px"
                  fontWeight={500}
                  color="brand.400"
                >
                  Get in touch{' '}
                </Heading>
                <Text fontSize={18} color="brand.400">
                  Let us know how we can help
                </Text>
              </Box>
              <Box>
                <Stack spacing="16px">
                  <Box>
                    <Flex alignItems="center" gap="16px" flexWrap="wrap">
                      <FormControl
                        isInvalid={!!errors.firstName && !!touched.firstName}
                      >
                        <FormLabel
                          fontSize={16}
                          fontWeight={600}
                          color="brand.400"
                        >
                          First Name
                        </FormLabel>
                        <Field
                          as={Input}
                          name="firstName"
                          type="text"
                          placeholder="Enter your first name"
                          borderRadius="50px"
                          border="1px solid"
                          borderColor="border.200"
                          color="brand.300"
                          _placeholder={{ color: 'brand.800' }}
                          h="50px"
                        />
                        <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={!!errors.lastName && !!touched.lastName}
                      >
                        <FormLabel
                          fontSize={16}
                          fontWeight={600}
                          color="brand.400"
                        >
                          Last Name
                        </FormLabel>
                        <Field
                          as={Input}
                          name="lastName"
                          type="text"
                          placeholder="Enter your last name"
                          borderRadius="50px"
                          border="1px solid"
                          borderColor="border.200"
                          color="brand.300"
                          _placeholder={{ color: 'brand.800' }}
                          h="50px"
                        />
                        <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                      </FormControl>
                    </Flex>
                  </Box>
                  <FormControl isInvalid={!!errors.email && !!touched.email}>
                    <FormLabel fontSize={16} fontWeight={600} color="brand.400">
                      Email
                    </FormLabel>
                    <Field
                      as={Input}
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      borderRadius="50px"
                      border="1px solid"
                      borderColor="border.200"
                      color="brand.300"
                      _placeholder={{ color: 'brand.800' }}
                      h="50px"
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.phoneNumber && !!touched.phoneNumber}
                  >
                    <FormLabel fontSize={16} fontWeight={600} color="brand.400">
                      Phone Number
                    </FormLabel>
                    <Field
                      as={Input}
                      name="phoneNumber"
                      type="tel"
                      placeholder="Enter your phone number"
                      borderRadius="50px"
                      border="1px solid"
                      borderColor="border.200"
                      color="brand.300"
                      _placeholder={{ color: 'brand.800' }}
                      h="50px"
                    />
                    <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.subject && !!touched.subject}
                  >
                    <FormLabel fontSize={16} fontWeight={600} color="brand.400">
                      Subject
                    </FormLabel>
                    <Field
                      as={Input}
                      name="subject"
                      type="text"
                      placeholder="Enter your subject"
                      borderRadius="50px"
                      border="1px solid"
                      borderColor="border.200"
                      color="brand.300"
                      _placeholder={{ color: 'brand.800' }}
                      h="50px"
                    />
                    <FormErrorMessage>{errors.subject}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.message && !!touched.message}
                  >
                    <FormLabel fontSize={16} fontWeight={600} color="brand.400">
                      Message
                    </FormLabel>
                    <Field
                      as={Textarea}
                      name="message"
                      placeholder="Enter your message"
                      borderRadius="10px"
                      border="1px solid"
                      borderColor="border.200"
                      color="brand.300"
                      _placeholder={{ color: 'brand.800' }}
                      resize="none"
                      h="100px"
                    />
                    <FormErrorMessage>{errors.message}</FormErrorMessage>
                  </FormControl>
                  <Button
                    type="submit"
                    fontWeight={600}
                    color="brand.200"
                    w="full"
                    h="55px"
                    bg="brand.100"
                    _hover={{ bg: 'brand.100' }}
                  >
                    {loading ? <Spinner /> : 'Send Message'}
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const ContactDetails = () => {
  return (
    <Box>
      <Stack spacing="12px">
        <Heading fontWeight={500} fontSize={32}>
          Contact Us
        </Heading>
        <Text fontSize={[16, 18]} color="brand.300">
          Email, call, or complete the form to learn how Vestier can solve your
          real estate management problem.
        </Text>
        <Text fontSize={[16, 18]} color="brand.300">
          info@vestier.com
        </Text>
        <Box>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            gap="20px"
            flexWrap={['wrap', 'nowrap']}
          >
            <Box
              p="20px"
              borderRadius="10px"
              border="1px solid"
              borderColor="brand.600"
              w={['100%', '330px']}
              h="182px"
            >
              <Stack spacing="15px">
                {' '}
                <Heading fontSize={18} color="brand.400">
                  Customer Support
                </Heading>
                <Text color="brand.300">
                  Our support team is available around the clock to address any
                  concerns or queries you may have
                </Text>
              </Stack>
            </Box>
            <Box
              p="20px"
              borderRadius="10px"
              border="1px solid"
              borderColor="brand.600"
              w={['100%', '330px']}
              h="182px"
            >
              <Stack spacing="15px">
                {' '}
                <Heading fontSize={18} color="brand.400">
                  Feedback and Suggestions
                </Heading>
                <Text color="brand.300">
                  We value your feedback and are continuously working to improve
                  Vestier. Your input is crucial in shaping the future of
                  Vestier.
                </Text>
              </Stack>
            </Box>
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
};

const index = () => {
  return (
    <Box bg="bg.200" py="40px" mt="-116px" pt={['185px', '200px']}>
      <Box maxW="1300px" mx="auto">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          rowGap={['35px', '0']}
        >
          <Box w={['100%', '50%']} px="24px">
            <ContactDetails />
          </Box>
          <Box w={['100%', '50%']} px="24px">
            <ContactForm />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default index;
