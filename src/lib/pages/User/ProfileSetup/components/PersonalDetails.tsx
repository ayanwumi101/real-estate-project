import {
  Box,
  FormLabel,
  FormControl,
  Input,
  Stack,
  Select,
  Spinner,
  Button,
  Flex,
  Text,
  Heading,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import {
  GetUserProfileDetails,
  SaveUserDetails,
} from '~/lib/api/services/profileService';
import {
  ChevronLeftIcon,
  FileUploadIcon,
  SelectGenderIcon,
} from '~/lib/components/Icons/Icons';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { GoTrash } from 'react-icons/go';
import { BsImageFill } from 'react-icons/bs';
import { AppContext } from '~/lib/layout';

// Validation Schema
const validationSchema = Yup.object().shape({
  profilePicture: Yup.mixed().test(
    'fileSize',
    'Profile picture must be less than 3MB',
    (value) => {
      if (!value) return true;
      return value instanceof File ? value.size <= 3 * 1024 * 1024 : true; // 3MB
    }
  ).notRequired(),
  dateOfBirth: Yup.date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .required('Date of birth is required'),
  gender: Yup.string().required('Gender is required'),
});

interface PersonalDetailsProps {
  step: number;
  setStep: (value: number) => void;
}

const PersonalDetails = ({ step, setStep }: PersonalDetailsProps) => {
  const { setUserDetails } = useContext<any>(AppContext);
  const initialValues = {
    profilePicture: null,
    dateOfBirth: '',
    gender: '',
  };
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const handleSubmit = async (values: any) => {
    const formData = {
      profile_image: values.profilePicture,
      dateofbirth: values.dateOfBirth,
      gender: values.gender,
    };
    setLoading(true);
    try {
      const response = await SaveUserDetails(formData);
      if (response.status === true) {
        const newData = await GetUserProfileDetails();
        setUserDetails(newData.data);
        toast({
          title: response.message as string,
          description: 'Personal details saved',
          duration: 3000,
          position: 'top-right',
          isClosable: true,
          status: 'success',
        });
      }
      setStep(step + 1);
    } catch (error: any) {
      setLoading(false);
      toast({
        title: error.response.data.message,
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
      {({
        errors,
        touched,
        setFieldValue,
        values,
       setFieldTouched
      }) => (
        <Form>
          <Box w={['100%', '100%', '600px']}>
            <Stack spacing="25px" w="100%">
              {/* Profile Picture */}
              <FormControl
                w="100%"
                isInvalid={!!errors.profilePicture && touched.profilePicture}
              >
                <FormLabel
                  fontWeight={600}
                  fontSize={16}
                  color="#222222"
                  mb="20px"
                >
                  Upload your profile picture
                </FormLabel>

                {values.profilePicture ? (
                  <Box
                    w="100%"
                    py="30px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    border="1px dashed #C0C0C0"
                    borderRadius="5px"
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      gap="8px"
                    >
                      <BsImageFill size={30} />
                      <Text color="#8295AA">
                        {(values.profilePicture as File).name}
                      </Text>
                      <Button
                        bg="none"
                        h="30px"
                        borderRadius="30px"
                        ml="10px"
                        onClick={() => setFieldValue('profilePicture', '')}
                        _hover={{ bg: 'none' }}
                      >
                        <Flex
                          alignItems="center"
                          gap="5px"
                          justifyContent="center"
                        >
                          <GoTrash color="tomato" size={20} />
                          <Text color="tomato">Remove</Text>
                        </Flex>
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <FormLabel
                    w="100%"
                    py="30px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    border="1px dashed #C0C0C0"
                    borderRadius="5px"
                    htmlFor="upload"
                  >
                    <Input
                      type="file"
                      id="upload"
                      accept="image/*"
                      display="none"
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0];
                        if (file) {
                          setFieldValue('profilePicture', file);
                          setFieldTouched('profilePicture', true);
                        }
                      }}
                    />
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      gap="8px"
                    >
                      <FileUploadIcon />
                      <Text color="#8295AA">Drop Files here or</Text>
                      <Heading color="#000080" fontSize={16} fontWeight={600}>
                        Browse file
                      </Heading>
                    </Box>
                  </FormLabel>
                )}
                <FormErrorMessage>{errors.profilePicture}</FormErrorMessage>
              </FormControl>

              {/* Date of Birth */}
              <FormControl
                isInvalid={!!errors.dateOfBirth && touched.dateOfBirth}
              >
                <FormLabel fontWeight={600} fontSize={16} color="#222222">
                  Select Date of Birth
                </FormLabel>
                <Field
                  as={Input}
                  type="date"
                  name="dateOfBirth"
                  border="1px solid #C0C0C0"
                  bg="#FBFBFB"
                  h="50px"
                  borderRadius="40px"
                  _placeholder={{ color: '#8295AA', fontWeight: 500 }}
                />
                <FormErrorMessage>{errors.dateOfBirth}</FormErrorMessage>
              </FormControl>

              {/* Gender */}
              <FormControl isInvalid={!!errors.gender && touched.gender}>
                <FormLabel fontWeight={600} fontSize={16} color="#222222">
                  Select your Gender
                </FormLabel>
                <InputGroup
                  w="100%"
                  borderRadius="40px"
                  border="1px solid #C0C0C0"
                >
                  <InputLeftElement
                    pointerEvents="none"
                    borderTopLeftRadius="40px"
                    borderBottomLeftRadius="40px"
                    h="50px"
                    bg="#F5F5F5"
                    w="12%"
                  >
                    <SelectGenderIcon />
                  </InputLeftElement>
                  <Field
                    as={Select}
                    name="gender"
                    border="none"
                    h="50px"
                    bg="#FBFBFB"
                    outline="none"
                    w="100%"
                    borderTopRightRadius="40px"
                    borderBottomRightRadius="40px"
                    placeholder="Select gender"
                    color="black"
                    pl="16"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Field>
                </InputGroup>
                <FormErrorMessage>{errors.gender}</FormErrorMessage>
              </FormControl>

              {/* Submit Button */}
              <Flex justifyContent="space-between" alignItems="center">
                <Button
                  leftIcon={<ChevronLeftIcon />}
                  variant="ghost"
                  _hover={{ bg: 'none' }}
                  color="brand.100"
                  isDisabled={step < 2}
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
                      minW={['100px', '120px']}
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

export default PersonalDetails;
