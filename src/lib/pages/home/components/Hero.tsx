import React from 'react'
import { Flex, Box, Heading, Text, Image } from '@chakra-ui/react';

const Hero = () => {
  return (
    <Box as="section" maxW="1200px" pt={['70px', 0]} mx="auto" px={['24px', 0]}>
      <Flex alignItems="center" justifyContent="space-between" flexWrap='wrap'>
        <Box maxW="550px" mb={['40px', 0]}>
          <Box mb="24px">
            <Heading as="h1" fontSize={[38,60]} fontWeight="700" color="#222222">
              Discover a New Era
            </Heading>
            <Heading as="h1" fontSize={[38,60]} fontWeight="700" color="#222222">
              <Box as="span" color="#FFAE42">
                -
              </Box>{' '}
              of{' '}
              <Box as="span" fontStyle="italic">
                Investment
              </Box>
            </Heading>
          </Box>
          <Text
            fontSize={18}
            lineHeight="27px"
            color="#2E353F"
            fontWeight={500}
          >
            Our platform is designed to democratize real estate investing by
            allowing you to invest in specific units across various building
            projects. Get Started
          </Text>
        </Box>
        <Box maxW="580px">
          <Image src="/assets/svgs/hero-image.svg" alt="Chakra UI Logo" />
        </Box>
      </Flex>
    </Box>
  );
}

export default Hero