import {
  Box,
  Stack,
  Text,
  Flex,
  Button,
  Heading,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';
import CustomModal from '~/lib/components/Modal';

const DeleteNokConfirmationModal = ({
  isOpen,
  onClose,
  loading,
  deleteNok,
}: {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  deleteNok: () => void;
}) => {
  return (
    <CustomModal size="lg" isOpen={isOpen} onClose={onClose}>
      <Box>
        <Stack spacing="30px">
          <Box>
            <Heading fontSize={24} mb="2">
              Delete Next of Kin
            </Heading>
            <Text>
              Are you sure you want to delete this Next of Kin? This action
              cannot be undone.
            </Text>
          </Box>
          <Flex gap="15px" justifyContent="flex-end">
            <Button
              variant="outline"
              onClick={onClose}
              color="brand.300"
              border="1px solid #E4E4E4"
              rounded="6px"
              fontSize="15px"
              fontWeight={500}
              h="50px"
              w="full"
              borderRadius="50px"
            >
              Cancel
            </Button>
            <Button
              bg="bg.600"
              _hover={{ bg: 'bg.600' }}
              color="color.200"
              h="50px"
              borderRadius="50px"
              w="full"
              fontSize="15px"
              fontWeight={600}
              onClick={deleteNok}
            >
              {loading ? <Spinner /> : 'Delete Next of Kin'}
            </Button>
          </Flex>
        </Stack>
      </Box>
    </CustomModal>
  );
};

export default DeleteNokConfirmationModal;
