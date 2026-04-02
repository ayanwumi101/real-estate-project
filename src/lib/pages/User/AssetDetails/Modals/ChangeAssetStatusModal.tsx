import {
  Box,
  Stack,
  Text,
  Flex,
  Button,
  Heading,
  Spinner,
  Select,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import CustomModal from '~/lib/components/Modal';

const ChangeAssetStatusModal = ({
  isOpen,
  onClose,
  loading,
  changeAssetStatus,
  assetStatus,
  setAssetStatus,
}: {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  changeAssetStatus: () => void;
  assetStatus: string;
  setAssetStatus: (status: string) => void;
}) => {
  return (
    <CustomModal size="lg" isOpen={isOpen} onClose={onClose}>
      <Box>
        <Stack spacing="30px">
          <Box>
            <Heading fontSize={24} mb="2">
              Change Asset Status
            </Heading>
            <Text>Are you sure you want to change this asset status?</Text>
          </Box>
          <FormControl>
            <FormLabel fontSize={15}>Select Asset Status</FormLabel>
            <Select
              value={assetStatus}
              onChange={(e) => setAssetStatus(e.target.value)}
              rounded="50px"
              h="48px"
              outline="none"
              placeholder="Select asset status"
            >
              <option value="occupied">Occupied</option>
              <option value="not-occupied">Not Occupied</option>
            </Select>
          </FormControl>
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
              bg="brand.100"
              _hover={{ bg: 'brand.100' }}
              color="brand.200"
              h="50px"
              borderRadius="50px"
              w="full"
              fontSize="15px"
              fontWeight={600}
              onClick={changeAssetStatus}
            >
              {loading ? <Spinner /> : 'Change Asset Status'}
            </Button>
          </Flex>
        </Stack>
      </Box>
    </CustomModal>
  );
};

export default ChangeAssetStatusModal;
