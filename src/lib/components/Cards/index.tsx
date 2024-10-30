import {
  Box,
  Image,
  Text,
  Stack,
  Heading,
  Flex,
  Button,
} from '@chakra-ui/react';
import { LocationIcon } from '~/lib/components/Icons/Icons';
import { IoMdArrowForward } from 'react-icons/io';
import { FiEye } from 'react-icons/fi';
import Link from 'next/link';


export const PropertyCard = ({ imageSource }: { imageSource: string }) => {
  return (
    <Box w={['100%', '270px']} h="auto">
      <Box
        w="100%"
        h="300px"
        borderRadius="10px"
        bgImage={imageSource}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        display="flex"
        alignItems="flex-end"
        justifyContent="flex-end"
      >
        <Box
          w="100%"
          py="12px"
          bg="rgba(0,0,0,0.35)"
          backdropFilter="blur(8px)"
        >
          <Text textAlign="center" color="#ffffff">
            ₦40,500 - 50,000 / Share
          </Text>
        </Box>
      </Box>
      <Box pt="24px" pb="12px" borderBottom="1px solid #ABABFF">
        <Stack spacing="12px">
          <Heading fontSize={18} fontWeight={600} color="#222222">
            Skyline Residences
          </Heading>
          <Text fontSize={14} fontWeight={500} color="#2E353F">
            8% p.a expected returns
          </Text>
          <Flex alignItems="center" gap="14px">
            <LocationIcon />
            <Text fontSize={14} fontWeight={500} color="#2E353F">
              Lekki, Lagos
            </Text>
          </Flex>
        </Stack>
      </Box>
    </Box>
  );
};

export const UserPropertyCard = ({ imageSource }: { imageSource: string }) => {
  return (
    <Link href='/user/projects/1'>
      <Box w={['100%', '240px']} h="auto">
        <Box
          w="100%"
          h="300px"
          borderRadius="10px"
          bgImage={imageSource}
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition="center"
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-end"
        >
          <Box
            w="100%"
            py="12px"
            bg="rgba(0,0,0,0.35)"
            backdropFilter="blur(8px)"
          >
            <Text textAlign="center" color="#ffffff">
              ₦40,500 - 50,000 / Share
            </Text>
          </Box>
        </Box>
        <Box pt="24px" pb="12px" borderBottom="1px solid #ABABFF">
          <Stack spacing="12px">
            <Heading fontSize={18} fontWeight={600} color="#222222">
              Skyline Residences
            </Heading>
            <Text fontSize={14} fontWeight={500} color="#2E353F">
              <Box as="span" color="#FFAE42">
                8% p.a
              </Box>{' '}
              expected returns
            </Text>
            <Flex alignItems="center" gap="14px">
              <LocationIcon />
              <Text fontSize={14} fontWeight={500} color="#2E353F">
                Lekki, Lagos
              </Text>
            </Flex>
          </Stack>
        </Box>
      </Box>
    </Link>
  );
};

export const FeatureCard = ({
  image,
  heading,
  description,
}: {
  image: string;
  heading: string;
  description: string;
}) => {
  return (
    <Box
      w="360px"
      borderTop="1px solid #C0C0C0"
      borderBottom="1px solid #C0C0C0"
      py="10px"
    >
      <Stack spacing="24px">
        <Box w="60px" h="60px">
          <Image src={image} w="100%" />
        </Box>
        <Box>
          <Heading fontSize={20} color="#222222" fontWeight={700} mb="12px">
            {heading}
          </Heading>
          <Text color="#2E353F" fontWeight={400}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export const ImageCard = ({
  imageSource,
  location,
}: {
  imageSource: string;
  location: string;
}) => {
  return (
    <Box
      w="100%"
      h="300px"
      bgImage={imageSource}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
      display="flex"
      alignItems="flex-end"
      justifyContent="flex-end"
    >
      <Box
        w="100%"
        px="24px"
        py="12px"
        bg="rgba(0,0,0,0.35)"
        backdropFilter="blur(8px)"
      >
        <Text color="#ffffff" fontSize={18} fontWeight={700}>
          {location}
        </Text>
      </Box>
    </Box>
  );
};

export const SingleApartmentCard = ({
  title,
  description,
  buyProperty,
}: {
  title: string;
  description: string;
  buyProperty: () => void;
}) => {
  return (
    <Box py="16px" borderTop="1px solid #E4E4E4">
      <Stack spacing="10px">
        <Heading fontWeight={700} color="#222222" fontSize={16}>
          {title}
        </Heading>
        <Text color="#222222" fontWeight={500}>
          {description}
        </Text>
        <Flex alignItems="center" gap="8px">
          <Button bg="#EDEDFF" color="#000080" fontWeight={600}>
            More information
          </Button>
          <Button
            bg="none"
            textDecoration="underline"
            color="#000080"
            fontWeight={600}
            onClick={buyProperty}
          >
            Buy now
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export const PortfolioStatCard = () => {
  return (
    <Box
      w="357px"
      borderRadius="5px"
      pt="32px"
      border="1px solid #E4E4E4"
      boxShadow="md"
    >
      <Box px="16px" mb="16px">
        <Text mb="16px" color="#ABABFF" fontWeight={500}>
          Wallet Balance
        </Text>
        <Flex alignItems="center" gap="16px">
          <Heading fontSize={24} fontWeight={500} color="#222222">
            ₦ 150,000
          </Heading>
          <FiEye color="#2E353F" fontSize={20} />
        </Flex>
      </Box>
      <Box borderTop="1px solid #D8D8FF" bg="#EDEDFF" p="16px">
        <Flex alignItems="center" gap="10px">
          <Text fontWeight={600} color="#2E353F">
            Show more
          </Text>
          <IoMdArrowForward color="#2E353F" />
        </Flex>
      </Box>
    </Box>
  );
};

export const StatCard = () => {
  return (
    <Box
      w="260px"
      borderRadius="5px"
      py="22px"
      border="1px solid #E4E4E4"
      boxShadow="md"
      px='22px'
    >
      <Box>
        <Text mb="10px" fontSize={16} color="#ABABFF" fontWeight={500}>
          Wallet Balance
        </Text>
        <Heading fontSize={24} fontWeight={500} color="#222222">
          ₦ 150,000
        </Heading>
      </Box>
    </Box>
  );
};