import { Box, Heading, Text, Image, Flex, HStack, VStack, } from '@chakra-ui/react'
import React from 'react'
import { ArrowForward } from '~/lib/components/Icons/Icons'


export const SingleCard = ({image, label}:{image: string, label: string}) => {
  return (
    <Box w="220px">
      <VStack spacing="24px">
        <Image src={image} />
        <Flex justifyContent='center' fontWeight={600} alignItems="center" gap="8px">
          <Text fontSize={14} color="#222222">
            {label}
          </Text>
          <ArrowForward />
        </Flex>
      </VStack>
    </Box>
  );
}


const HowItWorks = () => {
  return (
    <Box maxW="1200px" mx="auto" py="60px">
      <VStack spacing="60px">
        <Box textAlign="center" maxW="740px" mx="auto">
          <Heading mb="24px" fontSize={40} color="#222222">
            How it works
          </Heading>
          <Text textAlign="center" color="#2E353F">
            Ready to explore the world of fractional real estate ownership?
            Become part of a thriving community of investors by selecting a
            project and start investing
          </Text>
        </Box>
        <Box>
          <HStack flexWrap='wrap' justifyContent='space-between' alignItems='flex-end'>
            <SingleCard
              image="/assets/icons/google.png"
              label="Explore Available Projects"
            />
            <SingleCard
              image="/assets/icons/cursor.png"
              label="Select project of interest"
            />
            <SingleCard
              image="/assets/icons/card.png"
              label="Make first payment"
            />
            <SingleCard
              image="/assets/icons/dashboard.png"
              label="Track your portfolio"
            />
            <SingleCard
              image="/assets/icons/stock.png"
              label="Engage The Marketplace"
            />
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}

export default HowItWorks