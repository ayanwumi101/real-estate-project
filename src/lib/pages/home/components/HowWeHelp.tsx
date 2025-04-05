import {
  Box,
  Heading,
  Text,
  Flex,
  Stack,
  Image,
  Button,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { BlackArrowRightIcon } from '~/lib/components/Icons/Icons';

const HowWeHelp = () => {
  const features = [
    {
      title: 'for investors',
      description:
        'Gain full visibility into your investments, make data-driven decisions, and maximize returns using our advanced analytics.',
    },
    {
      title: 'for property managers',
      description:
        'Streamline operations, track key metrics, and reduce maintenance costs with our automated solutions.',
    },
    {
      title: 'for real estate owners',
      description:
        'Take control of your portfolio with intuitive tools that optimize asset performance and reveal new opportunities.',
    },
  ];
  return (
    <Box px={['24px', 0]}>
      {/* First row */}
      <Box maxW="1200px" mx="auto" py="60px">
        <Stack spacing="40px">
          <Heading
            textTransform="capitalize"
            fontWeight={500}
            fontSize={32}
            color="brand.300"
          >
            How we can help
          </Heading>
          <Image
            src="/assets/images/help-image.png"
            alt="properties image"
            w="100%"
            h="246px"
            objectFit="cover"
          />
          <Flex
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            rowGap={['20px', '0']}
          >
            <Box
              px="20px"
              py="10px"
              borderLeft="1px solid"
              borderRight="1px solid"
              borderColor="brand.600"
              w={['100%', '400px']}
            >
              <Stack spacing="16px">
                {' '}
                <Heading
                  textTransform="capitalize"
                  fontSize={18}
                  color="brand.400"
                >
                  {features[0]?.title}
                </Heading>
                <Text color="brand.300">{features[0]?.description}</Text>
              </Stack>
            </Box>
            <Box
              px="20px"
              py="10px"
              w={['100%', '400px']}
              borderLeft="1px solid"
              borderRight="1px solid"
              borderColor="brand.600"
            >
              <Stack spacing="16px">
                {' '}
                <Heading
                  textTransform="capitalize"
                  fontSize={18}
                  color="brand.400"
                >
                  {features[1]?.title}
                </Heading>
                <Text color="brand.300">{features[1]?.description}</Text>
              </Stack>
            </Box>
            <Box
              px="20px"
              py="10px"
              w={['100%', '400px']}
              borderLeft="1px solid"
              borderRight="1px solid"
              borderColor="brand.600"
            >
              <Stack spacing="16px">
                {' '}
                <Heading
                  textTransform="capitalize"
                  fontSize={18}
                  color="brand.400"
                >
                  {features[2]?.title}
                </Heading>
                <Text color="brand.300">{features[2]?.description}</Text>
              </Stack>
            </Box>
          </Flex>
        </Stack>
      </Box>
      {/* Second row */}
      <Box bg="bg.200" borderRadius="20px" py={['60px', '100px']} px="24px">
        <Stack spacing="25px" maxW="1200px" mx="auto">
          <Text fontSize={[16,18]} color="brand.300" fontWeight={600}>
            START KEEPING TRACK OF YOUR REAL ESTATES
          </Text>
          <Heading
            fontWeight={500}
            fontSize={[25,30]}
            color="brand.300"
            lineHeight="45px"
          >
            Take the next step in real estate asset management with Vestier.{' '}
            <br />
            Discover how our solutions can help you maximize your portfolio’s
            potential.
          </Heading>
          <Link href="/signup">
            <Button
              textDecor="underline"
              _hover={{ bg: 'none' }}
              variant="ghost"
              color="brand.400"
              w="85px"
              rightIcon={<BlackArrowRightIcon />}
            >
              Sign Up
            </Button>
          </Link>
        </Stack>
      </Box>
    </Box>
  );
};

export default HowWeHelp;
