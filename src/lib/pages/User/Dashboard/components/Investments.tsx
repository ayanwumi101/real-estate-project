import { Box, Heading, Flex, Stack, Button, Text  } from '@chakra-ui/react'
import React from 'react'
import { GoArrowRight } from 'react-icons/go';
import { UserPropertyCard } from '~/lib/components/Cards';


const Investments = () => {
  return (
    <Box py="30px" px="40px" borderBottom="1px solid #E4E4E4">
      <Stack spacing="30px">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading fontSize={32} fontWeight={500} color="#222222">
            Top Investments
          </Heading>
          <Button>
            <Flex
              alignItems="center"
              gap="10px"
              bg="#EDEDFF"
              borderRadius="50px"
              py="12px"
              px="15px"
              color="#000080"
            >
              <Text fontWeight={700}>View more</Text>
              <GoArrowRight />
            </Flex>
          </Button>
        </Flex>
        <Box>
          <Flex flexWrap="wrap" justifyContent="space-between" rowGap="30px">
            <UserPropertyCard imageSource="/assets/images/house-1.png" />
            <UserPropertyCard imageSource="/assets/images/house-4.png" />
            <UserPropertyCard imageSource="/assets/images/house-3.png" />
            <UserPropertyCard imageSource="/assets/images/house-5.png" />
            <UserPropertyCard imageSource="/assets/images/house-2.png" />
            <UserPropertyCard imageSource="/assets/images/house-6.png" />
            <UserPropertyCard imageSource="/assets/images/house-5.png" />
            <UserPropertyCard imageSource="/assets/images/house-2.png" />
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
}

export default Investments