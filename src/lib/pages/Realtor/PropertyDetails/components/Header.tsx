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
import React from 'react';
import {
  LocationIcon,
  ChevronLeftIcon,
  VerticalEllipsisIcon,
  RegisterSaleIcon,
  EditPropertyIcon,
} from '~/lib/components/Icons/Icons';
import useNavigate from '~/lib/utils/useNavigate';
import AddPaymentModal from '../Modals/AddPaymentModal';




interface Headerprops {
  propertyName: string;
  location: string;
  tabs: string[];
  setActiveTab: React.Dispatch<React.SetStateAction<'Details' | 'Payments'>>;
  activeTab: 'Details' | 'Payments';
}

interface NavigationTabsProps {
  tabs: string[];
  activeTab: 'Details' | 'Payments';
  setActiveTab: React.Dispatch<React.SetStateAction<'Details' | 'Payments'>>;
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
          bg={tab === activeTab ? "bg.200" : 'none'}
          fontSize={15}
          fontWeight={600}
          color={tab === activeTab ? "brand.100" : "brand.800"}
          onClick={() => setActiveTab(tab as 'Details' | 'Payments')}
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
}: Headerprops) => {
  const router = useRouter();
  const navigate = useNavigate();
  const { id } = useParams();
  const [openAddPaymentModal, setOpenAddPaymentModal] = React.useState(false);
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
                  Skyline Residences
                </Heading>
                <Badge
                  px="10px"
                  py="4px"
                  rounded="50px"
                  bg="bg.200"
                  fontSize={12}
                  fontWeight={500}
                  color="brand.100"
                  textTransform="capitalize"
                >
                  Available
                </Badge>
              </Flex>

              <Flex alignItems="center" gap="10px">
                <LocationIcon />
                <Text color="#2E353F" fontWeight={500}>
                  3517 W. Gray St. Utica, Pennsylvania 57867
                </Text>
              </Flex>
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
              <Menu>
                <MenuButton as={Button} rounded="5px" bg="bg.200">
                  <VerticalEllipsisIcon />
                </MenuButton>
                <MenuList py="0px">
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
                  <MenuItem
                    py="12px"
                    px="16px"
                    _hover={{ bg: 'border.100' }}
                    fontSize={14}
                    color="color.100"
                    fontWeight={500}
                    icon={<RegisterSaleIcon />}
                  >
                    Register sale
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Box>
        </Flex>
        <NavigationTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </Stack>
      <AddPaymentModal
        isOpen={openAddPaymentModal}
        onClose={() => setOpenAddPaymentModal(false)}
      />
    </Box>
  );
};

export default Header;
