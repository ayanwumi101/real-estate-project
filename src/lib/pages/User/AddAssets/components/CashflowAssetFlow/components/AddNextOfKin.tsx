import {
  Box,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Stack,
  Text,
  Flex,
  Spinner,
  useToast,
  Heading,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { EmptyStateIcon, InputSearchIcon } from '~/lib/components/Icons/Icons';
import { AppContext } from '~/lib/layout';
import {
  AddAssetNextOfKinCard,
  SingleNextOfKinCard,
} from '~/lib/components/Cards';
import Cookie from 'js-cookie';
import { AddAsset, AddNextOfKinToAsset } from '~/lib/api/services/assetsService';
import { useRouter } from 'next/navigation';
import AddNextOfKinModal from '~/lib/pages/User/AddNextOfKin';
import { CreateAssetContext } from '../../..';



const AddNextOfKin = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (value: number) => void;
}) => {
  const toast = useToast();
  const router = useRouter();
  const assetId = Cookie.get('vestier-asset-id');
  const { nextOfKins, setNextOfKins } = useContext<any>(AppContext);
  const [selectedNextOfKin, setSelectedNextOfKin] = React.useState<any>('');
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [filteredNextOfKins, setFilteredNextOfKins] =
    React.useState<any>(nextOfKins);
     const {
        step: parentStep,
        setStep: setParentStep,
        assetData,
        setAssetData,
     } = useContext<any>(CreateAssetContext);
  

  const handleChange = (searchValue: string) => {
    setSearchTerm(searchValue);
    if (searchTerm === '') {
      setFilteredNextOfKins(nextOfKins);
    } else {
      setFilteredNextOfKins(
        nextOfKins.filter((nextOfKin: any) =>
          nextOfKin?.fullname?.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  };

  const handleSubmit = async () => {
    const formData = {
      assetData,
      nok_ids: [selectedNextOfKin],
    };
    try {
      if (selectedNextOfKin) {
        setLoading(true);
        const res = await AddAsset(formData);
        if (res.status === true) {
          toast({
            title: 'Asset Added Successfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
          setLoading(false);
          router.push('/user/my-assets');
        }
      } else {
        toast({
          title: 'Please select a Next of Kin',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <Box>
      <Stack spacing="32px">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<InputSearchIcon />}
            mt="1.5"
            ml="2"
          />
          <Input
            type="text"
            placeholder="Search Next of Kin"
            border="1px solid"
            borderColor="border.200"
            bg="brand.700"
            h="50px"
            borderRadius="50px"
            color="brand.800"
            pl="12"
            value={searchTerm}
            onChange={(e) => handleChange(e.target.value)}
          />
        </InputGroup>
        <Box>
          {filteredNextOfKins?.length < 1 ? (
            <Box maxW="460px" mx="auto">
              <Stack spacing="12px" alignItems="center" textAlign="center">
                <EmptyStateIcon />
                <Heading fontSize={18} color="brand.300">
                  No Next of Kin Registered{' '}
                </Heading>
                <Text color="brand.300">
                  Secure your assets by assigning a next of kin. Ensure your
                  properties are managed and transferred seamlessly when needed
                </Text>
                <Button
                  bg="brand.100"
                  color="brand.200"
                  py="16px"
                  px="32px"
                  fontWeight={500}
                  h="50px"
                  onClick={() => setOpenModal(true)}
                  _hover={{ bg: '#000080' }}
                >
                  Add Next of Kin
                </Button>
              </Stack>
            </Box>
          ) : (
            <Box>
              <Stack spacing="12px">
                {filteredNextOfKins?.map((nextOfKin: any, index: number) => (
                  <AddAssetNextOfKinCard
                    name={nextOfKin?.fullname}
                    email={nextOfKin?.email}
                    phoneNumber={nextOfKin?.phone}
                    relationship={nextOfKin?.relationship}
                    key={nextOfKin?.id}
                    id={nextOfKin?.id}
                    selectedNextOfKin={selectedNextOfKin}
                    setSelectedNextOfKin={setSelectedNextOfKin}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Box>
        <Flex justifyContent="flex-end" gap="10px">
          <Button
            color="#000080"
            _hover={{ bg: '#000080' }}
            bg="#EDEDFF"
            h="48px"
            borderRadius="30px"
            fontWeight={500}
            fontSize={16}
            onClick={() => setStep(step - 1)}
            minW="100px"
          >
            Back
          </Button>
          <Button
            bg="#000080"
            _hover={{ bg: '#000080' }}
            color="white"
            h="48px"
            borderRadius="30px"
            fontWeight={500}
            fontSize={16}
            onClick={handleSubmit}
            minW="120px"
          >
            {loading ? <Spinner /> : 'Complete'}
          </Button>
        </Flex>
      </Stack>
      <AddNextOfKinModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        setNextOfKins={setNextOfKins}
      />
    </Box>
  );
};

export default AddNextOfKin;
