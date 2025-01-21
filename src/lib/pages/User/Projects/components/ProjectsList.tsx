'use client';

import {
  Box,
  Heading,
  Text,
  Flex,
  Stack,
  Button,
  Select,
} from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { PropertyCard, UserPropertyCard } from '~/lib/components/Cards';
import { FilterIcon, LocationIcon } from '~/lib/components/Icons/Icons';
import FilterDrawer from './FilterDrawer';

const ProjectsList = () => {
  const [openFilterDrawer, setOpenFilterDrawer] = React.useState(false);
  return (
    <Fragment>
      <Box w="100%" overflow="auto" pt={['25px', '25px', 0]}>
        <Box
          as="section"
          maxW="1200px"
          mx="auto"
          px={['20px', 0]}
          overflow="auto"
        >
          <Stack spacing="40px" pb="40px" overflow="auto">
            <Box
              overflow="auto"
              borderBottom="1px solid #E4E4E4"
              pb={['20px', '40px']}
              px={[0, 0, '40px']}
            >
              <Flex
                alignItems="center"
                justifyContent={['flex-start', 'space-between']}
                gap={['20px', 0]}
                overflow="auto"
              >
                <Box display="flex" alignItems="center" gap="16px">
                  <Box
                    borderRadius="50px"
                    border="1px solid #C0C0C0"
                    px="15px"
                    py="3px"
                    w={['180px', 'auto']}
                  >
                    <Flex alignItems="center" gap="0px">
                      <LocationIcon />
                      <Select
                        color="#2E353F"
                        fontWeight={700}
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
                    py="3px"
                    w={['200px', 'auto']}
                  >
                    <Flex alignItems="center" gap="0px">
                      <Box
                        w="100px"
                        as="span"
                        color="#2E353F"
                        fontWeight={700}
                        fontSize={14}
                      >
                        Sort by:
                      </Box>
                      <Select
                        color="#2E353F"
                        fontWeight={700}
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
                <Box w={['250px', 'auto']}>
                  <Button
                    borderRadius="50px"
                    border="1px solid #C0C0C0"
                    px="15px"
                    py="10px"
                    w='100%'
                    onClick={() => setOpenFilterDrawer(true)}
                    leftIcon={<FilterIcon />}
                    color="#2E353F"
                    fontWeight={500}
                  >
                    Filter
                  </Button>
                </Box>
              </Flex>
            </Box>
            <Box px={[0, 0, '40px']}>
              <Flex
                justifyContent={['center', 'space-between']}
                flexWrap="wrap"
                rowGap="35px"
              >
                <UserPropertyCard imageSource="/assets/images/house-1.png" />
                <UserPropertyCard imageSource="/assets/images/house-4.png" />
                <UserPropertyCard imageSource="/assets/images/house-3.png" />
                <UserPropertyCard imageSource="/assets/images/house-5.png" />
                <UserPropertyCard imageSource="/assets/images/house-2.png" />
                <UserPropertyCard imageSource="/assets/images/house-6.png" />
                <UserPropertyCard imageSource="/assets/images/house-4.png" />
                <UserPropertyCard imageSource="/assets/images/house-1.png" />
                <UserPropertyCard imageSource="/assets/images/house-3.png" />
                <UserPropertyCard imageSource="/assets/images/house-5.png" />
                <UserPropertyCard imageSource="/assets/images/house-2.png" />
                <UserPropertyCard imageSource="/assets/images/house-6.png" />
                <UserPropertyCard imageSource="/assets/images/house-5.png" />
                <UserPropertyCard imageSource="/assets/images/house-2.png" />
                <UserPropertyCard imageSource="/assets/images/house-6.png" />
                <UserPropertyCard imageSource="/assets/images/house-4.png" />
                <UserPropertyCard imageSource="/assets/images/house-1.png" />
              </Flex>
            </Box>
            {/* <Button
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
            </Button> */}
          </Stack>
        </Box>
      </Box>
      {openFilterDrawer && (
        <FilterDrawer setOpenFilterDrawer={setOpenFilterDrawer} />
      )}
    </Fragment>
  );
};

export default ProjectsList;
