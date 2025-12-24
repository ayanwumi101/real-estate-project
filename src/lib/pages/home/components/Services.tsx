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
import Wrapper from '~/lib/components/Wrapper';

const Services = () => {
  return (
    <Box bg="brand.700" w="100%">
      <Wrapper>
        <Box w="full" py="60px" mx="auto" px={['25px', 0]}>
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
            w="full"
            gap="60px"
            justifyContent="space-between"
            flexWrap={['wrap', 'nowrap']}
            h={['auto', '550px']}
          >
            <Image
              src="/assets/images/service-image.png"
              w={['400px', '40%']}
              h={['420px', '100%']}
              objectFit="cover"
            />
            <Box h="100%" w={['full', '60%']}>
              <Flex flexWrap="wrap" h="100%" rowGap="24px" w="full" gap="20px">
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
      </Wrapper>
    </Box>
  );
};

export default Services;
