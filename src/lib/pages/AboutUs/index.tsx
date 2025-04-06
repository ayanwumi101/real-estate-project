import { Box, Heading, Text, Image, Stack, Flex } from '@chakra-ui/react';
import React from 'react';
import Faqs from '../home/components/Faqs';
import { OfferCard } from '~/lib/components/Cards';

const Hero = () => {
  return (
    <Box bg="bg.200">
      <Box
        mt="-116px"
        as="section"
        maxW="1200px"
        pt={['190px', '210px']}
        mx="auto"
        px={['24px', 0]}
        pb="32px"
      >
        <Stack alignItems="center" textAlign="center" spacing="12px">
          <Heading as="h1" fontSize={[32, 48]} fontWeight="700" color="#222222">
            Smarter Real Estate Management, Simplified
          </Heading>
          <Text fontSize={[16, 18]} color="brand.300" letterSpacing="0.5px">
            At Vestier, we’re redefining real estate asset management with
            technology-driven solutions that help property owners, investors,
            and managers stay in control of their portfolios.
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

const Mission = () => {
  return (
    <Box bg="brand.700">
      <Box maxW="1300px" mx="auto" py="60px" px={['24px', 0]}>
        <Flex
          alignItems={'center'}
          justifyContent="space-between"
                  flexWrap="wrap"
                  rowGap={['20px', '0']}
        >
          <Box maxW="700px">
            <Stack spacing="20px">
              <Text fontSize={[16, 18]} color="brand.300" fontWeight={600}>
                OUR MISSION
              </Text>
              <Heading
                fontWeight={500}
                fontSize={[25, 30]}
                color="brand.300"
                lineHeight="45px"
              >
                We’re on a mission to make real estate <br /> management
                effortless.
              </Heading>
              <Text color="brand.300" fontSize={[16, 18]}>
                By combining smart technology with data-driven insights, we help
                you optimize property value, improve cash flow, and make better
                investment decisions, all in one place.
              </Text>
            </Stack>
          </Box>
          <Image
            src="/assets/images/service-image.png"
            w="400px"
            h="100%"
            objectFit="cover"
          />
        </Flex>
      </Box>
    </Box>
  );
};

const WhatWeOffer = () => {
  return (
    <Box>
      <Stack spacing="60px" py="60px">
        {/* First Row */}
        <Box maxW="1300px" mx="auto" px={['24px', 0]}> 
          <Flex
            alignItems="center"
            justifyContent="space-between"
            flexWrap={['wrap', 'nowrap']}
            w="100%"
            gap="25px"
          >
            <Box maxW="300px">
              <Text
                mb="25px"
                fontWeight={600}
                fontSize={[16, 17]}
                color="brand.300"
                textTransform="uppercase"
              >
                what we offer
              </Text>
              <Heading fontSize={[25, 30]} mb="20px" fontWeight={500}>
                Vestier simplifies every aspect of real estate asset management.
              </Heading>
            </Box>
            <Box>
              <Flex
                alignItems="center"
                gap="20px"
                flexWrap={['wrap', 'nowrap']}
              >
                <OfferCard
                  image="/assets/images/bulb.png"
                  title="Tech-driven Management"
                  description="Real-time insights and automation for seamless property tracking."
                />
                <OfferCard
                  image="/assets/images/conference.png"
                  title="Smart Financial Decisions"
                  description=" Data-backed analytics to optimize asset performance."
                />
                <OfferCard
                  image="/assets/images/trends.png"
                  title="Flexible & Scalable"
                  description="Tailored solutions for investors, property managers, and owners."
                />
              </Flex>
            </Box>
          </Flex>
        </Box>
        {/* Second row */}
        <Box bg="bg.200" borderRadius="20px" py={['60px', '100px']} px="24px">
          <Stack spacing="25px" maxW="1200px" mx="auto">
            <Text
              fontSize={[16, 18]}
              color="brand.300"
              fontWeight={600}
              textTransform="uppercase"
            >
              Managing properties shouldn’t be complicated.
            </Text>
            <Heading
              fontWeight={500}
              fontSize={[25, 30]}
              color="brand.300"
              lineHeight={['35px', '45px']}
            >
              To redefine real estate asset management by making it simpler,
              more transparent, and more profitable for everyone either as a
              first-time investor or a seasoned property manager.
            </Heading>
          </Stack>
        </Box>
        {/* Third row */}
        <Box maxW="1200px" mx="auto" px={['24px', 0]}>
          <Heading fontSize={[25, 32]} mb="30px" fontWeight={500}>
            Connect deeply
          </Heading>
          <Flex
            alignItems="center"
            justifyContent="space-between"
                      flexWrap={['wrap', 'nowrap']}
            rowGap={['20px', '0']}
          >
            <Box
              py="10px"
              px="20px"
              borderLeft="1px solid"
              borderRight="1px solid"
              borderColor="brand.600"
            >
              <Heading
                textTransform="capitalize"
                fontSize={18}
                color="brand.400"
                mb="10px"
              >
                read our blogs
              </Heading>
              <Text color="brand.300" letterSpacing="0.5px">
                Gain full visibility into your investments, make data-driven
                decisions, and maximize returns using our advanced analytics.
              </Text>
            </Box>
            <Box
              py="10px"
              px="20px"
              borderRight="1px solid"
              borderColor="brand.600"
            >
              <Heading
                textTransform="capitalize"
                fontSize={18}
                color="brand.400"
                mb="10px"
              >
                How Vestier Empowers Property Owners and Investors
              </Heading>
              <Text color="brand.300" letterSpacing="0.5px">
                Streamline operations, track key metrics, and reduce maintenance
                costs with our automated solutions.
              </Text>
            </Box>
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
};

const index = () => {
  return (
    <Box>
      <Hero />
      <Mission />
      <WhatWeOffer />
      <Faqs />
    </Box>
  );
};

export default index;
