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
import useNavigate from '~/lib/utils/useNavigate';

interface NavigationTabProps {
  setActiveTab: React.Dispatch<
    React.SetStateAction<'available' | 'sold' | 'instalment'>
  >;
  activeTab: 'available' | 'sold' | 'instalment';
  tabs: string[];
}

const NavigationTab = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const navigate = useNavigate();
  return (
    <Box borderBottom="1px solid" borderColor="border.100" pb="20px">
      <Flex alignItems="center" justifyContent="space-between" gap={['5px', 0]}>
        <InputGroup w={['60%', '330px']}>
          <InputLeftElement pointerEvents="none">
            <InputSearchIcon />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search properties..."
            rounded="50px"
            fontSize={14}
            _placeholder={{ color: 'gray.500' }}
            pl="40px"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <Button
          leftIcon={<AddIcon />}
          bg="brand.100"
          color="brand.200"
          fontWeight={600}
          fontSize={[13, 16]}
          w={['40%', '180px']}
          onClick={() => navigate('/realtor/clients/add-client')}
        >
          Add New Client
        </Button>
      </Flex>
    </Box>
  );
};

export default NavigationTab;
