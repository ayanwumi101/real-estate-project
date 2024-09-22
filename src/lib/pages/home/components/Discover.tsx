import { Box, Heading, Text, Flex, Stack, Button } from '@chakra-ui/react'
import React from 'react'
import { PropertyCard } from '~/lib/components/Cards'


const Discover = () => {
  return (
    <Box w="100%" bg="#FBFBFB">
      <Box as="section" py="60px" maxW="1200px" mx="auto">
        <Stack spacing="40px">
          <Box>
            <Flex justifyContent="space-between">
              <Heading fontSize={40} color="#222222" fontWeight={700}>
                Discover
              </Heading>
              <Text
                color="#222222"
                fontWeight={500}
                maxW="600px"
                lineHeight="25px"
              >
                Explore expertly curated listings tailored to your needs. Enjoy
                seamless transactions with personalized guidance every step of
                the way.
              </Text>
            </Flex>
          </Box>
          <Box>
            <Flex justifyContent="space-between" flexWrap="wrap" rowGap="35px">
              <PropertyCard imageSource="/assets/images/house-1.png" />
              <PropertyCard imageSource="/assets/images/house-4.png" />
              <PropertyCard imageSource="/assets/images/house-3.png" />
              <PropertyCard imageSource="/assets/images/house-5.png" />
              <PropertyCard imageSource="/assets/images/house-2.png" />
              <PropertyCard imageSource="/assets/images/house-6.png" />
              <PropertyCard imageSource="/assets/images/house-4.png" />
              <PropertyCard imageSource="/assets/images/house-1.png" />
            </Flex>
          </Box>
          <Button
            mx="auto"
            textAlign="center"
            bg="#222222"
            py="6"
            px="24px"
            borderRadius="50px"
            fontWeight={600}
          >
            Explore all projects available
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default Discover