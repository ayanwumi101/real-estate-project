'use client';

import React from 'react';
import { Flex, Box, Heading, Text, Image, Button } from '@chakra-ui/react';
import { PurpleCheckIcon } from '~/lib/components/Icons/Icons';
import useNavigate from '~/lib/utils/useNavigate';


const Hero = () => {
  const features = [
    'Regular updates',
    'automated tracking',
    'smarter decisions',
  ];
  const navigate = useNavigate();
  return (
    <Box bg="bg.200">
      <Box
        mt='-116px'
        as="section"
        maxW="1200px"
        pt={['175px', '180px']}
        mx="auto"
        px={['24px', 0]}
        pb='32px'
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Box maxW="570px" mb={['40px', 0]}>
            <Box>
              <Flex alignItems="center" gap="20px" mb="25px" flexWrap="wrap">
                {features.map((feature, index) => (
                  <Flex key={index} alignItems="center" gap="8px">
                    <PurpleCheckIcon />
                    <Text
                      fontSize={14}
                      lineHeight="24px"
                      color="brand.300"
                      textTransform={'uppercase'}
                      fontWeight={600}
                    >
                      {feature}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </Box>
            <Box mb="24px">
              <Heading
                as="h1"
                fontSize={[38, 60]}
                fontWeight="700"
                color="#222222"
              >
                Transform the Way You Manage Real Estate Assets
              </Heading>
            </Box>
            <Text
              fontSize={18}
              lineHeight="27px"
              color="brand.300"
              fontWeight={400}
              mb="24px"
            >
              Gain real-time insights into your properties, monitor financial
              performance, and maximize returns with data-driven strategies.
            </Text>
            <Button
              bg="brand.100"
              fontWeight={500}
              color="brand.200"
              py="12px"
              h="48px"
              px="24px"
              onClick={() => navigate('/signup')}
            >
              Get Started Today
            </Button>
          </Box>
          <Box maxW="560px">
            <Image src="/assets/svgs/hero-image.svg" alt="Chakra UI Logo" />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Hero;
