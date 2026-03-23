import { Box, Stack, Button, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import {
  AddIcon,
  ChevronLeftIcon,
  LocationIcon,
} from '~/lib/components/Icons/Icons';
import useNavigate from '~/lib/utils/useNavigate';

const Header = ({ assetDetails }: { assetDetails: any }) => {
  const navigate = useNavigate();
  return (
    <Box py="30px" px={['20px', '40px']} borderY="1px solid #E4E4E4">
      <Stack spacing="20px" alignItems="flex-start" w="full">
        <Button
          onClick={() => navigate('/user/portfolio')}
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
              <Heading fontSize={[20, 24]} fontWeight={500} color="#222222">
                {assetDetails?.property_name || 'Property Name'}
              </Heading>
              <Flex alignItems="center" gap="10px">
                <LocationIcon />
                <Text color="#2E353F" fontWeight={500}>
                  {`${assetDetails?.house_number} ${assetDetails?.street_name}, ${assetDetails?.city_name}, ${assetDetails?.state_id}`}
                </Text>
              </Flex>
            </Stack>
          </Box>
          <Button
            bg="#000080"
            _hover={{ bg: '#000080' }}
            color="#ffffff"
            fontWeight={500}
            fontSize={15}
            leftIcon={<AddIcon />}
            h="48px"
            onClick={() =>
              navigate(`/user/my-assets/${assetDetails?.id}/add-payment`)
            }
          >
            Add new payment
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Header;
