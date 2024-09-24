import { Box, Heading, HStack, Image, Flex, Text, Button } from '@chakra-ui/react';
import React from 'react';
import { ImageCard } from '~/lib/components/Cards';

const Properties = () => {
  return (
    <Box w="100%" bg="#FBFBFB" py="60px" px="24px">
      <Box maxW="1200px" mx="auto" mb="32px">
        <Heading
          textAlign="center"
          fontSize={40}
          color="#222222"
          letterSpacing={0.04}
          mb="40px"
        >
          Find properties in your city
        </Heading>
        <Box>
          <HStack w="100%" alignItems="flex-start" gap="32px">
            <Box w="35%" h="632px">
              <Box
                w="100%"
                h="100%"
                bgImage="/assets/images/house-1.png"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                backgroundPosition="center"
                display="flex"
                alignItems="flex-end"
                justifyContent="flex-end"
              >
                <Box
                  w="100%"
                  px="24px"
                  py="12px"
                  bg="rgba(0,0,0,0.35)"
                  backdropFilter="blur(8px)"
                >
                  <Text color="#ffffff" fontSize={18} fontWeight={700}>
                    Lagos
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box w="65%">
              <Flex
                flexWrap={['wrap']}
                rowGap="32px"
                justifyContent="space-between"
                w="100%"
              >
                <Box w="48%">
                  <ImageCard
                    location="Ibadan"
                    imageSource="/assets/images/house-4.png"
                  />
                </Box>
                <Box w="48%">
                  <ImageCard
                    location="Abuja"
                    imageSource="/assets/images/house-2.png"
                  />
                </Box>
                <Box w="48%">
                  <ImageCard
                    location="Ogun"
                    imageSource="/assets/images/house-5.png"
                  />
                </Box>
                <Box w="48%">
                  <ImageCard
                    location="Port-harcourt"
                    imageSource="/assets/images/house-3.png"
                  />
                </Box>
              </Flex>
            </Box>
          </HStack>
        </Box>
      </Box>
      <Box textAlign="center">
        <Button
          mx="auto"
          textAlign="center"
          bg="#EDEDFF"
          py="6"
          px="24px"
          borderRadius="50px"
          fontWeight={700}
          color="#000080"
        >
          Load More
        </Button>
      </Box>
    </Box>
  );
};

export default Properties;
