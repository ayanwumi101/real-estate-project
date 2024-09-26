import { Box, Image, Heading, Text, Flex, Stack } from '@chakra-ui/react';
import React from 'react';
import { FeatureCard } from '~/lib/components/Cards';

const Features = () => {
  return (
    <Box maxW="1200px" py="60px" mx="auto" px={['25px', 0]}>
      <Flex
        w="100%"
        gap="60px"
        justifyContent="center"
        // alignItems="center"
        // h="496px"
        flexWrap={['wrap', 'nowrap']}
      >
        {/* <Box w="400px" h="100%"> */}
        <Image
          src="/assets/svgs/Column.svg"
          w="400px"
          h="100%"
          objectFit="cover"
        />
        {/* </Box> */}
        <Box h="100%">
          <Flex flexWrap="wrap" rowGap="24px" gap="20px">
            <FeatureCard
              image="/assets/icons/1.png"
              heading="Invest in Multiple Projects"
              description="Access a diverse range of real estate projects and units, each with detailed descriptions and transparent investment details."
            />
            <FeatureCard
              image="/assets/icons/2.png"
              heading="Project and Unit Management"
              description="Explore detailed project listings with information on location, unit availability, pricing, and more."
            />
            <FeatureCard
              image="/assets/icons/3.png"
              heading="Reporting and Analytics"
              description="Get timely alerts about new project listings, status updates, and important changes to your investments. Stay informed and make proactive investment decisions."
            />
            <FeatureCard
              image="/assets/icons/4.png"
              heading="Portfolio Management"
              description="View detailed reports on ownership percentages, returns, and progress towards maturity."
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Features;
