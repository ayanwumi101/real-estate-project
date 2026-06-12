import { Box, Stack, Heading, Text } from '@chakra-ui/react';
import React from 'react';

interface OurServicesProps {
  activeService: string;
}

const OurServices = ({ activeService }: OurServicesProps) => {
  const servicesList = [
    { label: 'risk assessment', type: 'risk-assessment' },
    { label: 'due dilligence', type: 'due-dilligence' },
    { label: 'Title Search & Verification', type: 'title-verification' },
    { label: 'Documents Review', type: 'documents-review' },
  ];
  return (
    <Box
      w={['full', '40%']}
      px={['16px', 0]}
      position={['static', 'sticky']}
      top="150px"
    >
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
          {servicesList?.map((service) => {
            const isActive = activeService === service.type;
            return (
              <Box
                key={service.type}
                py="16px"
                borderBottom="1px solid"
                borderColor={isActive ? 'brand.300' : 'border.200'}
              >
                <Text
                  textTransform="capitalize"
                  color={isActive ? 'brand.400' : 'color.500'}
                  fontWeight={500}
                  p="0"
                  m="0"
                >
                  {service.label}
                </Text>
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
};

export default OurServices;
