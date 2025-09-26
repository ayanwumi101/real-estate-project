import { Heading, Text, Button, Flex, Box, Stack, Spinner } from '@chakra-ui/react';
import React from 'react';
import CustomModal from '~/lib/components/Modal';

const RemoveNokFromPropertyModal = ({
  isOpen,
  onClose,
  propertyName,
  nokName,
  loading,
  removeNok,
}: {
  isOpen: boolean;
  onClose: () => void;
  propertyName: string;
  nokName: string;
  loading: boolean;
  removeNok: () => void;
}) => {
  return (
    <CustomModal size="lg" isOpen={isOpen} onClose={onClose}>
      <Box>
        <Stack spacing="30px">
          <Box>
            <Heading fontSize={20} mb="16px" fontWeight={600}>
              Remove {nokName} as Next of Kin for {propertyName}?
            </Heading>
            <Text fontSize={14} fontWeight={500} color='brand.300'>
              This action will unlink {nokName} as the registered next of kin
              for this property. You can reassign a new next of kin anytime
              under property settings.
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
              h="45px"
              w="full"
              borderRadius="50px"
            >
              Cancel
            </Button>
            <Button
              bg="bg.600"
              _hover={{ bg: 'bg.600' }}
              color="color.200"
              h="45px"
              borderRadius="50px"
              w="full"
              fontSize="15px"
              fontWeight={600}
              onClick={removeNok}
            >
              {loading ? <Spinner /> : 'Yes Remove'}
            </Button>
          </Flex>
        </Stack>
      </Box>
    </CustomModal>
  );
};

export default RemoveNokFromPropertyModal;
