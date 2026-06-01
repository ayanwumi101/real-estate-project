import { Box, Stack, Heading, Text, Divider } from '@chakra-ui/react';
import React from 'react';

const OurServices = () => {
  const servicesList = [
    'risk assessment',
    'due dilligence',
    'Title Search & Verification',
    'Documents Review',
  ];
  return (
    <Box w={['full', '40%']} px={['16px', 0]}>
      <Stack spacing="16px">
        <Heading fontWeight={500} fontSize={30}>
          Our Services
        </Heading>
        <Text color="brand.400" fontWeight={500}>
          Get professional property verification and real estate intelligence
          services designed to help you make informed investment decisions with
          confidence.
        </Text>
        <Stack display={['none', 'block']}>
          {servicesList?.map((service) => (
            <Box py="16px" borderBottom="1px solid" borderColor="brand.300">
              <Text
                textTransform="capitalize"
                color="brand.300"
                fontWeight={500}
                p="0"
                m="0"
              >
                {service}
              </Text>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default OurServices;
