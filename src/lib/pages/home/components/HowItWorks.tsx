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
import { ArrowForward, BlueArrowUpIcon } from '~/lib/components/Icons/Icons';
import { IoIosArrowRoundForward } from 'react-icons/io';

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
        <Text fontSize={16} color="#222222" fontWeight={600}>
          {label}
        </Text>
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
    <Box borderBottom="1px solid #C0C0C0" py="10px">
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
    <Box w="100%" id="howItWorks">
      <VStack maxW="1300px" mx="auto" spacing="60px" py="60px" px={['24px', 0]}>
        <Box textAlign="center" maxW="740px" mx="auto">
          <Heading mb="24px" fontWeight={500} fontSize={40} color="#222222">
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
            justifyContent={['center', 'space-between']}
            alignItems={['center', 'flex-end']}
            spacing={[3, 0]}
            flexDir={['column', 'row']}
          >
            <SingleCard
              image="/assets/icons/google.png"
              label="Sign Up & Get Started"
            />
            <ArrowForward />
            <SingleCard
              image="/assets/icons/cursor.png"
              label="Add your properties"
            />
            <ArrowForward />
            <SingleCard
              image="/assets/icons/card.png"
              label="Key property details"
            />
            <ArrowForward />
            <SingleCard
              image="/assets/icons/dashboard.png"
              label="Stay Updated on Payments"
            />
            <ArrowForward />
            <SingleCard
              image="/assets/icons/stock.png"
              label="Manage your assets"
            />
          </HStack>
        </Box>
        <Box textAlign="center">
          <Button
            mx="auto"
            textAlign="center"
            bg="brand.400"
            _hover={{ bg: 'brand.400' }}
            py="6"
            px="24px"
            borderRadius="50px"
            fontWeight={700}
            color="#ffffff"
          >
            Learn More
          </Button>
        </Box>
      </VStack>
      <Box
        w="100%"
        h={['auto', '500px']}
        bgImage="/assets/images/house-6.jpeg"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          w="100%"
          mx="auto"
          px={['24px', 0]}
          h="100%"
          bg="rgba(0, 0, 0, 0.7)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          py={['100px', 0]}
        >
          <Box maxW="1300px" mx="auto">
            <Stack spacing="24px">
              <Text
                fontSize={[16, 18]}
                fontWeight={600}
                textTransform="uppercase"
                color="#FBFBFB"
              >
                The Future of Asset Management is Here
              </Text>
              <Heading color="brand.200" fontWeight={500} fontSize={[30, 32]}>
                We are pioneering the future of real estate asset management. By
                combining real-time data, machine learning, and cutting-edge
                analytics, we are transforming the way real estate investments
                are managed and grown.
              </Heading>
              <Button
                _hover={{ bg: 'none' }}
                borderRadius="50px"
                fontWeight={500}
                color="#fbfbfb"
                rightIcon={<IoIosArrowRoundForward />}
                variant="ghost"
                w="145px"
                textDecoration="underline"
              >
                More About Us
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
      {/* <Box py="70px" maxW="1200px" mx="auto" px={['24px', 0]} id="features">
        <Flex
          alignItems="flex-start"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={[7, 0]}
        >
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
            <Text
              fontSize={[20, 32]}
              lineHeight={['30px', '45px']}
              fontWeight={500}
            >
              Our innovative platform allows you to invest in specific units
              across various projects with fractional ownership, making property
              investment accessible to everyone.
            </Text>
          </Box>
        </Flex>
      </Box> */}
    </Box>
  );
};

export default HowItWorks;
