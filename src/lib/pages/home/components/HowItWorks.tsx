import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  HStack,
  VStack,
  Button,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { ArrowForward } from '~/lib/components/Icons/Icons';

export const SingleCard = ({
  image,
  label,
}: {
  image: string;
  label: string;
}) => {
  return (
    <Box w="220px">
      <VStack spacing="24px">
        <Image src={image} />
        <Flex
          justifyContent="center"
          fontWeight={600}
          alignItems="center"
          gap="8px"
          flexDir={['column', 'row']}
        >
          <Text fontSize={14} color="#222222">
            {label}
          </Text>
          <ArrowForward />
        </Flex>
      </VStack>
    </Box>
  );
};

export const FeatureCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Box
      borderBottom="1px solid #C0C0C0"
      py="10px"
    >
      <Stack spacing="24px">
        <Stack spacing="16px">
          <Heading fontSize={20} fontWeight={700} color="#222222">
            {title}
          </Heading>
          <Text fontSize={16} color="#2E353F">
            {description}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};

const HowItWorks = () => {
  return (
    <Box w="100%">
      <VStack maxW="1200px" mx="auto" spacing="60px" py="60px" px={['24px', 0]}>
        <Box textAlign="center" maxW="740px" mx="auto">
          <Heading mb="24px" fontSize={40} color="#222222">
            How it works
          </Heading>
          <Text textAlign="center" color="#2E353F">
            Ready to explore the world of fractional real estate ownership?
            Become part of a thriving community of investors by selecting a
            project and start investing
          </Text>
        </Box>
        <Box>
          <HStack
            flexWrap="wrap"
            justifyContent={['center',"space-between"]}
            alignItems="flex-end"
            spacing={[5, 0]}
          >
            <SingleCard
              image="/assets/icons/google.png"
              label="Explore Available Projects"
            />
            <SingleCard
              image="/assets/icons/cursor.png"
              label="Select project of interest"
            />
            <SingleCard
              image="/assets/icons/card.png"
              label="Make first payment"
            />
            <SingleCard
              image="/assets/icons/dashboard.png"
              label="Track your portfolio"
            />
            <SingleCard
              image="/assets/icons/stock.png"
              label="Engage The Marketplace"
            />
          </HStack>
        </Box>
        <Box textAlign="center">
          <Button
            mx="auto"
            textAlign="center"
            bg="#000080"
            py="6"
            px="24px"
            borderRadius="50px"
            fontWeight={700}
            color="#ffffff"
          >
            Load More
          </Button>
        </Box>
      </VStack>
      <Box
        w="100%"
        h="500px"
        bgImage="/assets/images/house-6.png"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box maxW="1200px" mx="auto" px={['24px', 0]}>
          <Flex
            alignItems="flex-start"
            justifyContent="space-between"
            // gap="80px"
            flexWrap='wrap'
          >
            <Box maxW="550px" mb={['32px', 0]}>
              <Heading fontSize={[34,48]} fontWeight={700} color="#ffffff">
                Start Your Investment <br /> Journey Today
              </Heading>
            </Box>
            <Box maxW="550px">
              <Stack spacing="24px">
                <Text fontSize={18} fontWeight={500}>
                  Ready to explore the world of fractional real estate
                  ownership? <br />
                  Become part of a thriving community of investors by selecting
                  a <br />
                  project and start investing
                </Text>
                <Button
                  w="225px"
                  bg="#EDEDFF"
                  py="6"
                  px="24px"
                  borderRadius="50px"
                  fontWeight={700}
                  color="#000080"
                >
                  Load More
                </Button>
              </Stack>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box py="70px" maxW="1200px" mx="auto" px={['24px', 0]}>
        <Flex alignItems="flex-start" justifyContent="space-between" flexWrap='wrap' gap={[7,0]}>
          <Box w="570px">
            <Stack spacing="20px">
              <FeatureCard
                title="Secured Transactions"
                description="Advanced encryption and trusted payment gateways protect your financial information."
              />
              <FeatureCard
                title="Enhanced Privacy"
                description="Strict data protection measures ensure your personal information remains confidential."
              />
              <FeatureCard
                title="Two-Factor Authentication"
                description="Added security layer to safeguard your account against unauthorized access."
              />
            </Stack>
          </Box>
          <Box w="570px" color="#2E353F">
            <Text fontSize={[20,32]} lineHeight={['30px',"45px"]} fontWeight={500}>
              Our innovative platform allows you to invest in specific units
              across various projects with fractional ownership, making property
              investment accessible to everyone.
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default HowItWorks;
