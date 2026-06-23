'use client';

import {
  Box,
  Image,
  Text,
  Stack,
  Heading,
  Flex,
  Button,
  Divider,
  Avatar,
  chakra,
  VStack,
  Radio,
} from '@chakra-ui/react';
import {
  LocationIcon,
  TelephoneIconWithBg,
  EmailIconWithBg,
} from '~/lib/components/Icons/Icons';
import { IoMdArrowForward } from 'react-icons/io';
import { FiEye } from 'react-icons/fi';
import Link from 'next/link';
import { ReactHTMLElement, ReactNode, ReactElement } from 'react';
import { motion } from 'framer-motion';

const MotionBox = chakra(motion.div);

export const PropertyCard = ({ imageSource }: { imageSource: string }) => {
  return (
    <Box w={['100%', '270px']} h="auto" overflow="hidden" borderRadius="10px">
      <MotionBox
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
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3, ease: 'easeInOut' },
        }}
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
      </MotionBox>
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
    // <Link href="/user/projects/1">
    <Box w={['100%', '240px']} h="auto">
      <Link href="/user/projects/1" style={{ width: '100%' }}>
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
      </Link>
    </Box>

    // </Link>
  );
};

export const FeatureCard = ({
  Icon,
  heading,
  description,
}: {
  Icon: any;
  heading: string;
  description: string;
}) => {
  return (
    <Box w="360px" border="1px solid #C0C0C0" p="20px" rounded="10px">
      <Stack spacing="24px">
        <Icon />
        <Box>
          <Heading fontSize={19} color="#222222" fontWeight={700} mb="16px">
            {heading}
          </Heading>
          <Text
            color="#2E353F"
            fontWeight={400}
            fontSize={15}
            letterSpacing="0.5px"
          >
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
          <Button
            bg="#EDEDFF"
            color="#000080"
            _hover={{ bg: '#000080' }}
            fontWeight={600}
          >
            More information
          </Button>
          <Button
            bg="none"
            textDecoration="underline"
            color="#000080"
            _hover={{ bg: '#000080' }}
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

export const PortfolioStatCard = ({
  label,
  balance,
  showHideIcon,
}: {
  label: string;
  balance: string | number;
  showHideIcon: boolean;
}) => {
  return (
    <Box
      minW={['300px', '32%']}
      borderRadius="5px"
      py="32px"
      px="20px"
      border="1px solid #E4E4E4"
      // boxShadow="md"
      h="130px"
    >
      <Stack spacing="16px" w="100%">
        <Text color="#ABABFF" fontWeight={500}>
          {label}
        </Text>
        <Flex alignItems="center" gap="16px" w="100%">
          <Heading fontSize={24} fontWeight={500} color="#222222">
            {balance}
          </Heading>
          {showHideIcon && <FiEye color="#2E353F" fontSize={20} />}
        </Flex>
      </Stack>
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
      boxShadow="sm"
      px="22px"
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

export const AssetStatCard = ({
  label,
  children,
}: {
  label: string;
  children: ReactElement;
}) => {
  return (
    <Box
      minW={['300px', '32%']}
      borderRadius="5px"
      py="25px"
      border="1px solid #E4E4E4"
      // boxShadow="sm"
      px="22px"
      h={['auto', '120px']}
    >
      <Box w="100%">
        <Text mb="10px" fontSize={16} color="#ABABFF" fontWeight={500}>
          {label}
        </Text>
        {children}
      </Box>
    </Box>
  );
};

export const CustomerInformationItem = ({
  Icon,
  label,
  labelValue,
}: {
  Icon: any;
  label: string;
  labelValue: string;
}) => {
  return (
    <Box>
      <Flex alignItems="flex-start" gap={['10px', '17px']}>
        <Icon />
        <Stack spacing="10px">
          <Heading as="h3" fontSize={16} fontWeight={600} color="brand.300">
            {label}
          </Heading>
          <Text color="brand.400" fontSize={16} fontWeight={500}>
            {labelValue}
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
};

export const SingleNextOfKinCard = ({
  name,
  relationship,
  phoneNumber,
  email,
}: {
  name: string;
  relationship: string;
  phoneNumber: string;
  email: string;
}) => {
  return (
    <Box
      borderRadius="6px"
      border="1px solid"
      borderColor="border.100"
      py="12px"
      px="24px"
    >
      <Stack spacing="14px">
        <Box>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={['20px', '0']}
          >
            <Box>
              <Flex gap="10px" alignItems="flex-start">
                <Avatar
                  name={name}
                  w="40px"
                  bg="brand.500"
                  h="40px"
                  color="brand.100"
                  fontWeight={700}
                  fontSize={20}
                />
                <Box>
                  <Stack spacing="4px">
                    <Heading fontSize={16} color="brand.400" fontWeight={600}>
                      {name}
                    </Heading>
                    <Text fontSize={14} color="brand.400" fontWeight={500}>
                      {relationship}
                    </Text>
                  </Stack>
                </Box>
              </Flex>
            </Box>
            {/* <Text fontSize={14} fontWeight={500} color="brand.100">
              Associated with Harborview Towers
            </Text> */}
          </Flex>
        </Box>
        <Divider color="border.100" />
        <Box>
          <Stack spacing="12px">
            <Flex alignItems="center" gap="10px">
              <TelephoneIconWithBg />
              <Text color="brand.400" fontSize={12} fontWeight={500}>
                {phoneNumber}
              </Text>
            </Flex>
            <Flex alignItems="center" gap="10px">
              <EmailIconWithBg />
              <Text color="brand.400" fontSize={12} fontWeight={500}>
                {email}
              </Text>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export const AddAssetNextOfKinCard = ({
  id,
  name,
  relationship,
  phoneNumber,
  email,
  selectedNextOfKin,
  setSelectedNextOfKin,
}: {
  id: string;
  name: string;
  relationship: string;
  phoneNumber: string;
  email: string;
  selectedNextOfKin: number;
  setSelectedNextOfKin: (id: number) => void;
}) => {
  return (
    <Box
      borderRadius="6px"
      border="1px solid"
      borderColor="border.100"
      py="12px"
      px="24px"
      w="full"
    >
      <Radio size="lg" value={id.toString()} name={id.toString()} w="full">
        <Stack spacing="14px" pl="5" w="full">
          <Box w="full">
            <Flex
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={['20px', '0']}
            >
              <Box>
                <Flex gap="10px" alignItems="flex-start">
                  <Avatar
                    name={name}
                    w="40px"
                    bg="brand.500"
                    h="40px"
                    color="brand.100"
                    fontWeight={700}
                    fontSize={20}
                  />
                  <Box>
                    <Stack spacing="4px">
                      <Heading fontSize={16} color="brand.400" fontWeight={600}>
                        {name}
                      </Heading>
                      <Text fontSize={14} color="brand.400" fontWeight={500}>
                        {relationship}
                      </Text>
                    </Stack>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>
          <Divider color="border.100" w="full" />
          <Box w="full">
            <Flex alignItems="center" justifyContent="space-between">
              <Stack spacing="12px">
                <Flex alignItems="center" gap="10px">
                  <TelephoneIconWithBg />
                  <Text color="brand.400" fontSize={12} fontWeight={500}>
                    {phoneNumber}
                  </Text>
                </Flex>
                <Flex alignItems="center" gap="10px">
                  <EmailIconWithBg />
                  <Text color="brand.400" fontSize={12} fontWeight={500}>
                    {email}
                  </Text>
                </Flex>
              </Stack>
            </Flex>
          </Box>
        </Stack>
      </Radio>
    </Box>
  );
};

export const OfferCard = ({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) => {
  return (
    <Box
      border="1px solid"
      borderColor="border.200"
      borderRadius="10px"
      py="30px"
      px="20px"
      w={['100%', '300px']}
    >
      <VStack alignItems="center" textAlign="center" spacing="20px">
        <Image
          src={image}
          w="193px"
          h="193px"
          borderRadius="50%"
          objectFit="cover"
        />
        <Heading fontSize={18} color="brand.400">
          {title}
        </Heading>
        <Text color="brand.300">{description}</Text>
      </VStack>
    </Box>
  );
};
