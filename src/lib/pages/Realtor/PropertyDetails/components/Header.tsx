import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Button,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import {
  LocationIcon,
  ChevronLeftIcon,
  VerticalEllipsisIcon,
  RegisterSaleIcon,
  EditPropertyIcon,
} from '~/lib/components/Icons/Icons';
import useNavigate from '~/lib/utils/useNavigate';
import AddPaymentModal from '../Modals/AddPaymentModal';
import { GetPropertyDueDates } from '~/lib/api/services/propertiesService';
import Link from 'next/link';



interface Headerprops {
  propertyName: string;
  location: string;
  tabs: string[];
  setActiveTab: React.Dispatch<
    React.SetStateAction<'Details' | 'Sales History'>
  >;
  activeTab: 'Details' | 'Sales History';
  propertyType: 'available' | 'instalment' | 'sold';
}

interface NavigationTabsProps {
  tabs: string[];
  activeTab: 'Details' | 'Sales History';
  setActiveTab: React.Dispatch<
    React.SetStateAction<'Details' | 'Sales History'>
  >;
}

const NavigationTabs = ({
  tabs,
  activeTab,
  setActiveTab,
}: NavigationTabsProps) => {
  return (
    <Flex alignItems="center" gap="8px" py="15px">
      {tabs.map((tab) => (
        <Button
          key={tab}
          bg={tab === activeTab ? 'bg.200' : 'none'}
          fontSize={15}
          fontWeight={600}
          color={tab === activeTab ? 'brand.100' : 'brand.800'}
          onClick={() => setActiveTab(tab as 'Details' | 'Sales History')}
        >
          {tab}
        </Button>
      ))}
    </Flex>
  );
};

const Header = ({
  propertyName,
  location,
  tabs,
  activeTab,
  setActiveTab,
  propertyType,
}: Headerprops) => {
  const router = useRouter();
  const navigate = useNavigate();
  const { id } = useParams();
  const [openAddPaymentModal, setOpenAddPaymentModal] = React.useState(false);
  const [selectedProperty, setSelectedProperty] = React.useState<any>(null);
  const [dueDates, setDueDates] = React.useState<any>([]);

  const GetDueDates = async () => {
    if (propertyType === 'instalment' && id) {
      try {
        const res = await GetPropertyDueDates(id as string);
        setDueDates(res?.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    GetDueDates();
  }, [id]);
  return (
   
    
      <Box
        px={['20px', '20px']}
        borderBottom="1px solid"
        borderColor="border.100"
      >
        <Stack spacing="10px" alignItems="flex-start" w="full">
          <Button
            onClick={() => navigate('/realtor/properties')}
            variant="ghost"
            leftIcon={<ChevronLeftIcon />}
            p="0"
            _hover={{ bg: 'none' }}
            color="brand.100"
          >
            Back
          </Button>
          <Flex
            alignItems="flex-start"
            justifyContent="space-between"
            gap={['20px', 0]}
            flexWrap={['wrap', 'wrap', 'nowrap']}
            w="full"
          >
            <Box>
              <Stack spacing="10px">
                <Flex alignItems="center" gap="10px">
                  <Heading fontSize={[20, 24]} fontWeight={500} color="#222222">
                    {propertyName}
                  </Heading>
                  <Badge
                    px="10px"
                    py="4px"
                    rounded="50px"
                    bg={
                      propertyType === 'instalment'
                        ? '#F6EDDF'
                        : propertyType === 'sold'
                          ? '#E7F5EC'
                          : 'bg.200'
                    }
                    fontSize={12}
                    fontWeight={500}
                    color={
                      propertyType === 'instalment'
                        ? '#E1A101'
                        : propertyType === 'sold'
                          ? '#1BD155'
                          : 'brand.100'
                    }
                    textTransform="capitalize"
                  >
                    {propertyType}
                  </Badge>
                </Flex>
                {location && (
                  <Flex alignItems="center" gap="10px">
                    <LocationIcon />
                    <Text color="#2E353F" fontWeight={500}>
                      {location ? location : 'N/A'}
                    </Text>
                  </Flex>
                )}
              </Stack>
            </Box>
            <Box>
              <Flex alignItems="center" gap="10px">
                <Button
                  bg="brand.100"
                  _hover={{ bg: 'bg.200' }}
                  color="brand.200"
                  fontWeight={600}
                  fontSize={15}
                  leftIcon={<EditPropertyIcon />}
                  h="43px"
                >
                  Edit Property
                </Button>
                {propertyType === 'available' && (
                  <Menu>
                    <MenuButton as={Button} rounded="5px" bg="bg.200">
                      <VerticalEllipsisIcon />
                    </MenuButton>
                    <MenuList py="0px">
                      {/* {propertyType === 'instalment' && (
                    <MenuItem
                      py="12px"
                      px="16px"
                      _hover={{ bg: 'border.100' }}
                      fontSize={14}
                      color="color.100"
                      fontWeight={500}
                      icon={<RegisterSaleIcon />}
                      onClick={() => setOpenAddPaymentModal(true)}
                    >
                      Add Payment
                    </MenuItem>
                  )} */}
                      <Link
                        href={`/realtor/properties/${id}/register-sale?type=fully_sold`}
                      >
                        <MenuItem
                          py="12px"
                          px="16px"
                          _hover={{ bg: 'border.100' }}
                          fontSize={14}
                          color="color.100"
                          fontWeight={500}
                          icon={<RegisterSaleIcon />}
                        >
                          Register sale as Outright payment
                        </MenuItem>
                      </Link>
                      <Link
                        href={`/realtor/properties/${id}/register-sale?type=instalment`}
                      >
                        <MenuItem
                          py="12px"
                          px="16px"
                          _hover={{ bg: 'border.100' }}
                          fontSize={14}
                          color="color.100"
                          fontWeight={500}
                          icon={<RegisterSaleIcon />}
                        >
                          Register sale as Instalment payment
                        </MenuItem>
                      </Link>
                    </MenuList>
                  </Menu>
                )}
              </Flex>
            </Box>
          </Flex>
          <NavigationTabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </Stack>
        {/* <AddPaymentModal
        isOpen={openAddPaymentModal}
        onClose={() => setOpenAddPaymentModal(false)}
        instalmentId={id as string}
        dueDates={dueDates}
      /> */}
      </Box>
  );
};

export default Header;
