import {
  Stack,
  Heading,
  Text,
  Menu,
  Flex,
  Button,
  Box,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import React from 'react';
import { LocationIcon, ChevronDownIcon } from '~/lib/components/Icons/Icons';
import CustomModal from '~/lib/components/Modal';

const AssociatedPropertiesModal = ({
  isOpen,
  onClose,
  selectedNextOfKin,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedNextOfKin?: any;
}) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      {selectedNextOfKin?.properties?.length < 1 ? (
        <Box textAlign="center">
          <Stack spacing="20px" alignItems="center" py="30px">
            <Heading fontSize={20} fontWeight={600} color="brand.100">
              No associated properties
            </Heading>
            <Text>
              This next of kin has no associated properties. Please add
              properties
            </Text>
          </Stack>
        </Box>
      ) : (
        <Stack spacing="40px">
          <Heading fontSize={20} fontWeight={600} color="brand.100">
            Properties - {selectedNextOfKin?.properties?.length} associated
          </Heading>
          <Stack>
            {selectedNextOfKin?.properties?.map((property: any) => {
              return (
                <Box key={property?.id}>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Box>
                      <Stack spacing="7px">
                        <Heading
                          fontWeight={600}
                          fontSize={16}
                          color="brand.300"
                        >
                          {property?.name}
                        </Heading>
                        <Flex alignItems="center" gap="10px">
                          <LocationIcon />
                          <Text
                            fontSize={14}
                            fontWeight={400}
                            color="brand.400"
                          >
                            {property?.name}
                          </Text>
                        </Flex>
                      </Stack>
                    </Box>
                    <Menu>
                      <MenuButton
                        rightIcon={<ChevronDownIcon />}
                        as={Button}
                        bg="none"
                        _hover={{ bg: 'none' }}
                        fontSize={14}
                        fontWeight={500}
                        color="brand.300"
                      >
                        Associated
                      </MenuButton>
                      <MenuList py="2px">
                        <MenuItem
                          py="12px"
                          px="16px"
                          _hover={{ bg: 'border.100' }}
                          fontSize={14}
                          color="color.100"
                          fontWeight={500}
                          // onClick={() => navigate(`/user/my-assets/${asset?.id}`)}
                        >
                          Remove
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                </Box>
              );
            })}
          </Stack>
          <Flex justifyContent="flex-end">
            <Button
              bg="brand.100"
              color="brand.200"
              fontWeight={500}
              onClick={onClose}
              w="150px"
              _hover={{ bg: '#000080' }}
            >
              Close
            </Button>
          </Flex>
        </Stack>
      )}
    </CustomModal>
  );
};

export default AssociatedPropertiesModal;
