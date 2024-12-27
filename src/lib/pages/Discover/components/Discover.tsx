'use client'

import { Box, Heading, Text, Flex, Stack, Button, Select } from '@chakra-ui/react'
import React, { Fragment } from 'react'
import { PropertyCard } from '~/lib/components/Cards'
import { FilterIcon, LocationIcon } from '~/lib/components/Icons/Icons'
import FilterDrawer from './FilterDrawer'


const Discover = () => {
  const [openFilterDrawer, setOpenFilterDrawer] = React.useState(false);
  return (
    <Fragment>
      <Box w="100%" bg="#FBFBFB" overflow="auto">
        <Box
          as="section"
          py="60px"
          maxW="1200px"
          mx="auto"
          px={['24px', 0]}
          overflow="auto"
        >
          <Stack spacing="40px" overflow="auto">
            <Box>
              <Flex justifyContent="space-between" flexWrap="wrap">
                <Heading
                  fontSize={40}
                  color="#222222"
                  fontWeight={700}
                  mb={['32px', 0]}
                >
                  Discover
                </Heading>
                <Text
                  color="#222222"
                  fontWeight={500}
                  maxW="600px"
                  lineHeight="25px"
                >
                  Explore expertly curated listings tailored to your needs.
                  Enjoy seamless transactions with personalized guidance every
                  step of the way.
                </Text>
              </Flex>
            </Box>
            <Box 
              overflow="auto" 
              w='100%'
            >
              <Flex
                alignItems="center"
                justifyContent={['flex-start',"space-between"]}
                gap={['10px', 0]}
                // overflow="auto"
                w='100%'
                flexWrap='wrap'
                pb={[5, 0]}
              >
                <Box display="flex" alignItems="center" gap={['10px',"16px"]}>
                  <Box
                    borderRadius="50px"
                    border="1px solid #C0C0C0"
                    px="15px"
                    py="5px"
                    w={['50%', 'auto']}
                  >
                    <Flex alignItems="center" gap="0px">
                      <LocationIcon />
                      <Select
                        color="#2E353F"
                        fontWeight={[500,600]}
                        py="0"
                        border="none"
                        outline="none"
                      >
                        <option value="">All Locations </option>
                        <option value="">All Locations </option>
                        <option value="">All Locations </option>
                      </Select>
                    </Flex>
                  </Box>
                  <Box
                    borderRadius="50px"
                    border="1px solid #C0C0C0"
                    px="15px"
                    py="5px"
                    w={['50%', 'auto']}
                  >
                    <Flex alignItems="center" gap="0px">
                      <Box w="100px" as="span" color="#2E353F" fontWeight={[500,600]}>
                        Sort by:
                      </Box>
                      <Select
                        color="#2E353F"
                        fontWeight={[500,600]}
                        py="0"
                        bg="white"
                        border="none"
                        outline="none"
                      >
                        <option value="">Newest</option>
                        <option value="">Newest</option>
                        <option value="">Newest</option>
                        <option value="">Newest</option>
                      </Select>
                    </Flex>
                  </Box>
                </Box>
                <Button
                  borderRadius="50px"
                  border="1px solid #C0C0C0"
                  px="15px"
                  py="10px"
                  w={['100px', 'auto']}
                  onClick={() => setOpenFilterDrawer(true)}
                  bg='none'
                  mx='auto'
                >
                  <Flex alignItems="center" justifyContent={['space-between']} w='100%'>
                    <FilterIcon />
                    <Text fontWeight={700} color="#2E353F">
                      Filter
                    </Text>
                  </Flex>
                </Button>
              </Flex>
            </Box>
            <Box>
              <Flex
                justifyContent={['center', 'space-between']}
                flexWrap="wrap"
                rowGap="35px"
              >
                <PropertyCard imageSource="/assets/images/house-1.png" />
                <PropertyCard imageSource="/assets/images/house-4.png" />
                <PropertyCard imageSource="/assets/images/house-3.png" />
                <PropertyCard imageSource="/assets/images/house-5.png" />
                <PropertyCard imageSource="/assets/images/house-2.png" />
                <PropertyCard imageSource="/assets/images/house-6.png" />
                <PropertyCard imageSource="/assets/images/house-4.png" />
                <PropertyCard imageSource="/assets/images/house-1.png" />
                <PropertyCard imageSource="/assets/images/house-3.png" />
                <PropertyCard imageSource="/assets/images/house-5.png" />
                <PropertyCard imageSource="/assets/images/house-2.png" />
                <PropertyCard imageSource="/assets/images/house-6.png" />
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
              color="#EDEDFF"
            >
              Load More
            </Button>
          </Stack>
        </Box>
      </Box>
      {openFilterDrawer && <FilterDrawer setOpenFilterDrawer={setOpenFilterDrawer} />}
    </Fragment>
  );
}

export default Discover