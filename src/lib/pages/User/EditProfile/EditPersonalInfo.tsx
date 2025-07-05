'use client';

import {
  Box,
  Divider,
  Select,
  Input,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Heading,
  useToast,
  Spinner,
  FormErrorMessage,
  Flex,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import React, { useContext, useState } from 'react';
import CustomModal from '~/lib/components/Modal';
import * as Yup from 'yup';
import {
  SaveUserDetails,
  GetUserProfileDetails, AddProfileImage
} from '~/lib/api/services/profileService';
import { AppContext } from '~/lib/layout';
import { BsImageFill } from 'react-icons/bs';
import { GoTrash } from 'react-icons/go';
import { FileUploadIcon, SelectGenderIcon } from '~/lib/components/Icons/Icons';

const EditPersonalInfoModal = ({
  isOpen,
  onClose,
  gender,
}: {
  isOpen: boolean;
  onClose: () => void;
  gender: string;
}) => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const { setUserDetails, userDetails } = useContext<any>(AppContext);

  const initialValues = {
    profilePicture: null,
  };

  const validationSchema = Yup.object().shape({
    profilePicture: Yup.mixed()
      .required('Profile picture is required')
      .test('fileSize', 'File size is too large (max 3MB)', (value) => {
        if (!value) return false;
        if (typeof value === 'string') return true;
        if (value instanceof File) {
          return value.size <= 3 * 1024 * 1024;
        }
        return false;
      }),
  });

  const handleSubmit = async (values: any) => {
    const formData = {
      profile_image: values.profilePicture,
    };
    setLoading(true);
    try {
      const response = await AddProfileImage(formData);
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
        onClose();
      }
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
    <Box>
      <CustomModal isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ errors, touched, values, setFieldValue }) => {
            return (
              <Form>
                <Box w="auto">
                  <Stack spacing="20px" w="100%">
                    <Heading fontSize={24} color="brand.100">
                      Edit Personal Infomation
                    </Heading>
                    {/* Profile Picture */}
                    <FormControl
                      w="100%"
                      isInvalid={
                        !!errors.profilePicture && touched.profilePicture
                      }
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
                              onClick={() =>
                                setFieldValue('profilePicture', '')
                              }
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
                            display="none"
                            accept="image/*"
                            onChange={(event) => {
                              setFieldValue(
                                'profilePicture',
                                event.currentTarget.files?.[0]
                              );
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
                            <Heading
                              color="#000080"
                              fontSize={16}
                              fontWeight={600}
                            >
                              Browse file
                            </Heading>
                          </Box>
                        </FormLabel>
                      )}

                      <FormErrorMessage>
                        {errors.profilePicture}
                      </FormErrorMessage>
                    </FormControl>
                    {/* Submit Button */}
                    <Flex justifyContent="flex-end">
                      <Button
                        type="submit"
                        bg="#000080"
                        color="white"
                        h="48px"
                        borderRadius="30px"
                        fontWeight={600}
                        fontSize={16}
                        _hover={{ bg: '#000080' }}
                        minW={['100%', '200px']}
                        isDisabled={loading}
                      >
                        {loading ? <Spinner /> : 'Update Profile Picture'}
                      </Button>
                    </Flex>
                  </Stack>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </CustomModal>
    </Box>
  );
};

export default EditPersonalInfoModal;
