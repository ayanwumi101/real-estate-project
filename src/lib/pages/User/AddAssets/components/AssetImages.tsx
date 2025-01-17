'use client';

import {
  Box,
  FormControl,
  Input,
  FormLabel,
  Button,
  Flex,
  Text,
  FormErrorMessage,
  Heading,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import React, { useState } from 'react';
import { BsImageFill } from 'react-icons/bs';
import { GoTrash } from 'react-icons/go';
import * as Yup from 'yup';
import { FileUploadIcon } from '~/lib/components/Icons/Icons';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import { AddAssetImages } from '~/lib/api/services/assetsService';

const validationSchema = Yup.object().shape({
  assetImages: Yup.array()
    .of(Yup.mixed().required('Each image is required'))
    .min(1, 'At least one image is required'),
});

const AssetImages = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const assetId = Cookie.get('vestier-asset-id');
  const toast = useToast();
  const router = useRouter();

  const initialValues: { assetImages: File[] } = {
    assetImages: [],
  };


  const handleSubmit = async (values: any) => {
    const formData = {
      asset_id: assetId,
      images: values.assetImages,
    };
    setLoading(true);
    try {
      const res = await AddAssetImages(formData);
      if (res.status === true) {
        toast({
          title: res.message as string,
          description: 'Asset images added successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        router.push('/user/my-assets');
        Cookie.remove('vestier-asset-id');
      }
    } catch (error: any) {
      toast({
        title: 'An error occurred.',
        description: error.response.data.message,
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
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue, values }: any) => (
        <Form>
          <Box w="600px">
            <FormControl
              isInvalid={!!errors.assetImages && !!touched.assetImages}
              mb="24px"
            >
              <FormLabel
                fontWeight={600}
                fontSize={16}
                color="#222222"
                mb="20px"
              >
                Add Asset Images
              </FormLabel>

              {values.assetImages.length > 0 ? (
                <Box
                  w="100%"
                  py="20px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border="1px dashed #C0C0C0"
                  borderRadius="24px"
                  h="200px"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap="8px"
                  >
                    <BsImageFill size={30} />
                    <Text color="#8295AA">
                      <Text color="#8295AA">
                        {`${values.assetImages[0]?.name} ${
                          values.assetImages.length > 1
                            ? `and ${values.assetImages.length - 1} others`
                            : ''
                        }`}
                      </Text>
                      {/* {(values.assetImages as File).name} */}
                    </Text>
                    <Button
                      bg="none"
                      h="30px"
                      borderRadius="30px"
                      ml="10px"
                      onClick={() => setFieldValue('assetImages', [])}
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
                  py="20px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border="1px dashed #C0C0C0"
                  borderRadius="24px"
                  htmlFor="upload"
                  h="200px"
                >
                  <Input
                    type="file"
                    id="upload"
                    multiple
                    display="none"
                    onChange={(event) => {
                      const files = event.currentTarget.files;
                      if (files) {
                        setFieldValue('assetImages', Array.from(files));
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

              <FormErrorMessage>{errors.assetImages}</FormErrorMessage>
            </FormControl>
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
                bg="#000080"
                color="white"
                h="48px"
                borderRadius="30px"
                fontWeight={600}
                fontSize={16}
                _hover={{ bg: '#000080' }}
                type="submit"
              >
                {loading ? <Spinner /> : 'Submit'}
              </Button>
            </Flex>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AssetImages;
