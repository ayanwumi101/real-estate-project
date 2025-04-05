'use client';

import { Box, Image, Heading, Text, Flex, Stack } from '@chakra-ui/react';
import React from 'react';
import { FeatureCard } from '~/lib/components/Cards';
import {
  PortfolioManagementIcon,
  PropertyOverisightIcon,
  RecordKeepingIcon,
  ComplianceMonitoringIcon,
} from '~/lib/components/Icons/Icons';

const Services = () => {
  return (
    <Box bg="brand.700" w='100%'>
      <Box maxW="1200px" py="60px" mx="auto" px={['25px', 0]}>
        <Heading
          textAlign="center"
          mb="40px"
          fontSize={32}
          color="brand.400"
          fontWeight={500}
        >
          Our Services
        </Heading>
        <Flex
          w="100%"
          gap="60px"
          justifyContent="center"
          flexWrap={['wrap', 'nowrap']}
        >
          <Image
            src="/assets/images/service-image.png"
            w="400px"
            h="100%"
            objectFit="cover"
          />
          <Box h="100%">
            <Flex flexWrap="wrap" rowGap="24px" gap="20px">
              <FeatureCard
                Icon={PortfolioManagementIcon}
                heading="Portfolio Management"
                description="Gain real-time insights into your properties, monitor financial performance, and maximize returns with data-driven strategies."
              />
              <FeatureCard
                Icon={PropertyOverisightIcon}
                heading="Seamless Property Oversight"
                description="Keep track of property details, installment payments, and cash flow with an intuitive dashboard that streamlines asset management."
              />
              <FeatureCard
                Icon={RecordKeepingIcon}
                heading="Automated Record-Keeping"
                description="Eliminate manual tracking with automated updates on payments, lease agreements, and financial transactions."
              />
              <FeatureCard
                Icon={ComplianceMonitoringIcon}
                heading="Risk & Compliance Monitoring"
                description="Ensure regulatory compliance and mitigate risks with built-in reporting tools that keep your portfolio secure."
              />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Services;
