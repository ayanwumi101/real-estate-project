import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react';
import { AddIcon, InputSearchIcon } from '~/lib/components/Icons/Icons';
import useNavigate from '~/lib/utils/useNavigate';

interface NavigationTabProps {
  setActiveTab: React.Dispatch<
    React.SetStateAction<'available' | 'sold' | 'instalment'>
  >;
  activeTab: 'available' | 'sold' | 'instalment';
  tabs: string[];
  availableCount?: number;
  soldCount?: number;
  instalmentCount?: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchProperties: () => void;
}

const NavigationTab: React.FC<NavigationTabProps> = ({
  setActiveTab,
  activeTab,
  tabs,
  availableCount = 0,
  soldCount = 0,
  instalmentCount = 0,
  searchQuery,
  setSearchQuery,
  searchProperties,
}) => {
  const navigate = useNavigate();
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Box borderBottom="1px solid" borderColor="border.100" pb="20px">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        flexWrap={['wrap', 'nowrap']}
        gap={[5, 0]}
      >
        <Flex alignItems="center" gap="10px">
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => {
                setActiveTab(tab as 'available' | 'sold' | 'instalment');
                const params = new URLSearchParams(searchParams.toString());
                params.set('tab', tab);
                router.replace(`?${params.toString()}`, { scroll: false });
                setActiveTab(tab as 'available' | 'sold' | 'instalment');
              }}
              border="none"
              rounded="50px"
              h="40px"
              bg={activeTab === tab ? 'brand.500' : 'none'}
              color={activeTab === tab ? 'brand.100' : 'brand.800'}
              fontSize={15}
              fontWeight={600}
              px="22px"
              py="16px"
              textTransform={'capitalize'}
            >
              {`${tab} (${tab === 'available' ? availableCount : tab === 'sold' ? soldCount : instalmentCount})`}
            </Button>
          ))}
        </Flex>
        <Divider display={['block', 'none']} />
        <Flex
          alignItems="center"
          gap={['15px', '10px']}
          flexWrap={['wrap', 'nowrap']}
        >
          {/* <InputGroup w={['100%', '325px']}>
            <InputLeftElement pointerEvents="none">
              <InputSearchIcon />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search properties..."
              rounded="50px"
              fontSize={14}
              w="full"
              _placeholder={{ color: 'gray.500' }}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                searchProperties();
              }}
            />
          </InputGroup> */}

          <Button
            leftIcon={<AddIcon />}
            bg="brand.100"
            color="brand.200"
            fontWeight={600}
            w={['full', 'auto']}
            onClick={() => navigate('/realtor/properties/add-property')}
            fontSize={[13, 16]}
          >
            Add New Property
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavigationTab;
