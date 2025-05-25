'use client';

import {
  Box,
  Stack,
  Heading,
  Text,
  Button,
  Flex,
  Avatar,
  Divider,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  useToast,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import {
  NextOfKinEmptyStateIcon,
  TelephoneIconWithBg,
  EmailIconWithBg,
  VerticalEllipsisIcon,
} from '~/lib/components/Icons/Icons';
import { AppContext } from '~/lib/layout';
import useNavigate from '~/lib/utils/useNavigate';
import DeleteNokConfirmationModal from '../Modals/DeleteNokConfirmationModal';
import { DeleteNextOfKin } from '~/lib/api/services/nokService';
import EditNokDetails from '../Modals/EditNokDetails';

const NextOfKins = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const [openEditNokModal, setOpenEditNokModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedNokId, setSelectedNokId] = React.useState<string | null>(null);
  const [selectedNextOfKin, setSelectedNextOfKin] = React.useState<any>(null);
  const { nextOfKins, setNextOfKins } = useContext<any>(AppContext);

  const deleteNok = async () => {
    setLoading(true);
    try {
      const res = await DeleteNextOfKin(selectedNokId);
      if (res.status) {
        const updatedNextOfKins = nextOfKins.filter(
          (nok: any) => nok.id !== selectedNokId
        );
        setNextOfKins(updatedNextOfKins);
        setIsOpen(false);
        setSelectedNokId(null);
        toast({
          title: 'Next of Kin deleted successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } catch (error) {
      console.error('Error deleting next of kin:', error);
    }
    setLoading(false);
  };

  return (
    <Box w="full" px="40px" pb="50px">
      {nextOfKins.length < 1 ? (
        <Box
          h="70vh"
          border="1px solid"
          borderColor="border.100"
          rounded="5px"
          p="15px"
        >
          <Box
            w="100%"
            h="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              spacing="15px"
              alignItems="center"
              textAlign="center"
              maxW="500px"
              mx="auto"
              h="auto"
            >
              <NextOfKinEmptyStateIcon />
              <Heading fontSize={18} fontWeight={700} color="brand.300">
                No Next of Kin Registered
              </Heading>
              <Text color="brand.300">
                Secure your assets by assigning a next of kin. Ensure your
                properties are managed and transferred seamlessly when needed
              </Text>
              <Button
                bg="brand.100"
                color="brand.700"
                fontWeight={500}
                _hover={{ bg: 'secondary.100' }}
                onClick={() => navigate('/user/nok/add')}
              >
                Add a Next of Kin
              </Button>
            </Stack>
          </Box>
        </Box>
      ) : (
        <Box
          h="100%"
          border="1px solid"
          borderColor="border.100"
          rounded="5px"
          p="15px"
        >
          <Stack spacing="20px">
            <Box>
              <Stack spacing="12px">
                {' '}
                <Heading color="brand.300" fontSize={14} fontWeight={700}>
                  Next of Kin({nextOfKins?.length})
                </Heading>
                <Text color="brand.300" fontSize={14} fontWeight={500}>
                  They will be able to take care of your assets if anything
                  happens to you. You can add a next of kin here and associate
                  it with your already created asset.
                </Text>
                <Button
                  w="fit-content"
                  bg="brand.500"
                  color="brand.100"
                  fontSize={14}
                  fontWeight={600}
                  _hover={{ bg: 'brand.500' }}
                  onClick={() => navigate('/user/nok/add')}
                >
                  Add a Next of Kin
                </Button>
              </Stack>
            </Box>
            <Box>
              <Stack spacing="20px">
                {nextOfKins.map((nok: any, index: number) => (
                  <Box
                    border="1px solid"
                    borderColor="border.100"
                    py="10px"
                    px="24px"
                    rounded="6px"
                    key={nok.id}
                  >
                    <Stack spacing="14px">
                      <Box>
                        <Flex
                          alignItems="center"
                          justifyContent="space-between"
                          flexWrap="wrap"
                          gap={['20px', '0']}
                        >
                          <Box>
                            <Flex gap="10px" alignItems="flex-start">
                              <Avatar
                                name={nok?.fullname}
                                w="40px"
                                bg="brand.500"
                                h="40px"
                                color="brand.100"
                                fontWeight={700}
                                fontSize={20}
                              />
                              <Box>
                                <Stack spacing="4px">
                                  <Heading
                                    fontSize={16}
                                    color="brand.400"
                                    fontWeight={600}
                                  >
                                    {nok?.fullname}
                                  </Heading>
                                  <Text
                                    fontSize={14}
                                    color="brand.400"
                                    fontWeight={500}
                                  >
                                    {nok?.relationship}
                                  </Text>
                                </Stack>
                              </Box>
                            </Flex>
                          </Box>
                          <Menu>
                            <MenuButton
                              as={Button}
                              bg="none"
                              fontWeight={500}
                              fontSize={14}
                              rightIcon={<VerticalEllipsisIcon />}
                              _hover={{ bg: 'none' }}
                              _active={{ bg: 'none' }}
                              _focus={{ boxShadow: 'none' }}
                            >
                              Manage
                            </MenuButton>
                            <MenuList py="0px">
                              <MenuItem
                                py="12px"
                                px="16px"
                                _hover={{ bg: 'border.100' }}
                                fontSize={14}
                                color="color.100"
                                fontWeight={500}
                                // onClick={() =>
                                //   navigate(`/user/my-assets/${asset?.id}`)
                                // }
                              >
                                Associated properties
                              </MenuItem>
                              <MenuItem
                                py="12px"
                                px="16px"
                                _hover={{ bg: 'border.100' }}
                                fontSize={14}
                                color="color.100"
                                fontWeight={500}
                                onClick={() => {
                                  setOpenEditNokModal(true);
                                  setSelectedNextOfKin(nok);
                                }}
                              >
                                Edit Details
                              </MenuItem>
                              <MenuItem
                                py="12px"
                                px="16px"
                                _hover={{ bg: 'border.100' }}
                                fontSize={14}
                                color="color.100"
                                fontWeight={500}
                                onClick={() => {
                                  setIsOpen(true);
                                  setSelectedNokId(nok.id);
                                }}
                              >
                                Delete
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Flex>
                      </Box>
                      <Divider color="border.100" />
                      <Box>
                        <Stack spacing="12px">
                          <Flex alignItems="center" gap="10px">
                            <TelephoneIconWithBg />
                            <Text
                              color="brand.400"
                              fontSize={12}
                              fontWeight={500}
                            >
                              {nok?.phone}
                            </Text>
                          </Flex>
                          <Flex alignItems="center" gap="10px">
                            <EmailIconWithBg />
                            <Text
                              color="brand.400"
                              fontSize={12}
                              fontWeight={500}
                            >
                              {nok?.email}
                            </Text>
                          </Flex>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Box>
      )}
      <DeleteNokConfirmationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        deleteNok={deleteNok}
        loading={loading}
      />
      <EditNokDetails
        isOpen={openEditNokModal}
        onClose={() => setOpenEditNokModal(false)}
        selectedNextOfKin={selectedNextOfKin}
        setNextOfKins={setNextOfKins}
      />
    </Box>
  );
};

export default NextOfKins;
