import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { AddIcon, InputSearchIcon } from '~/lib/components/Icons/Icons';


interface NavigationTabProps {
  setActiveTab: React.Dispatch<
    React.SetStateAction<'available' | 'sold' | 'instalment'>
  >;
  activeTab: 'available' | 'sold' | 'instalment';
  tabs: string[];
}

const NavigationTab = () => {
  return (
    <Box borderBottom="1px solid" borderColor="border.100" pb="20px">
      <Flex alignItems="center" justifyContent="space-between">
        <InputGroup w="330px">
          <InputLeftElement pointerEvents="none">
            <InputSearchIcon />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search properties..."
            rounded="50px"
            fontSize={14}
            _placeholder={{ color: 'gray.500' }} pl='40px'
          />
        </InputGroup>
        <Link href="/realtor/properties/add-property">
          <Button
            leftIcon={<AddIcon />}
            bg="brand.100"
            color="brand.200"
            fontWeight={600}
          >
            Add New Client
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default NavigationTab;
