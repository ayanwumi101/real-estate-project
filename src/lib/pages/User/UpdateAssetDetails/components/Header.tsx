import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Button,
  Spinner,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import {
  InvestIcon,
  LocationIcon,
  ChevronLeftIcon,
  AddIcon,
  SaveAssetDetailsIcon,
} from '~/lib/components/Icons/Icons';

interface Headerprops {
  propertyName: string;
  location: string;
  loading?: boolean;
  updateAsset: () => void;
  fetching: boolean;
}

const Header = ({
  propertyName,
  location,
  loading,
  updateAsset,
  fetching,
}: Headerprops) => {
  const router = useRouter();
  ``;
  return (
    <Box py="30px" px={['20px', '40px']} borderBottom="1px solid #E4E4E4">
      <Stack spacing="30px" alignItems="flex-start" w="full">
        <Button
          onClick={() => router.back()}
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
          <Box w="full">
            {fetching ? (
              <Stack spacing="10px" w="full">
                <Skeleton w="50%" h="30px"></Skeleton>
                <SkeletonText
                  noOfLines={2}
                  skeletonHeight={3}
                  w="60%"
                ></SkeletonText>
              </Stack>
            ) : (
              <Stack spacing="10px">
                <Heading fontSize={[20, 24]} fontWeight={500} color="#222222">
                  {propertyName ? propertyName : 'Property Name'}
                </Heading>
                <Flex alignItems="center" gap="10px">
                  <LocationIcon />
                  <Text color="#2E353F" fontWeight={500}>
                    {location ? location : 'Location'}
                    {/* Plot 10, Adewunmi Layout, Iju Ishaga, Lagos */}
                  </Text>
                </Flex>
              </Stack>
            )}
          </Box>
          <Box>
            {fetching ? (
              <Flex alignItems="center" gap="10px">
                {' '}
                <Skeleton w="150px" rounded="60px" h="45px"></Skeleton>{' '}
                <Skeleton w="150px" rounded="60px" h="45px"></Skeleton>
              </Flex>
            ) : (
              <Flex alignItems="center" gap="10px">
                <Button
                  bg="bg.200"
                  _hover={{ bg: 'bg.200' }}
                  color="brand.100"
                  fontWeight={600}
                  fontSize={15}
                  h="45px"
                  px="30px"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  bg="#000080"
                  _hover={{ bg: '#000080' }}
                  color="#ffffff"
                  fontWeight={500}
                  fontSize={15}
                  leftIcon={<SaveAssetDetailsIcon />}
                  h="45px"
                  px="30px"
                  onClick={updateAsset}
                >
                  {loading ? <Spinner /> : 'Save'}
                </Button>
              </Flex>
            )}
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Header;
