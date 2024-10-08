'use client'

import { Box, Stack, Heading, Text, Flex, Button, Select, FormLabel, CheckboxGroup, Checkbox } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React from 'react'
import { IoChevronDown, IoCloseOutline } from 'react-icons/io5'
import { FilterIcon } from '~/lib/components/Icons/Icons'


const MotionBox = motion(Box)

const FilterDrawer = ({setOpenFilterDrawer}: { setOpenFilterDrawer: (value: boolean) => void}) => {
  return (
    <MotionBox
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3 }}
      bg="rgba(0,0,0,0.3)"
      w="100%"
      h="100%"
      position="fixed"
      top="0"
      right="0"
      zIndex="10"
      overflow="auto"
      backdropFilter="blur(8px)"
    >
      <MotionBox
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.5 }}
        bg="#FFFFFF"
        w={['85%', '28%']}
        h="100%"
        position="absolute"
        top="0"
        right="0"
        zIndex="15"
        px="24px"
        overflow="auto"
        py="30px"
      >
        <Stack spacing="20px">
          <Box pb="20px" borderBottom="1px solid #E4E4E4">
            <Stack spacing="20px">
              <Box>
                <Flex alignItems="center" gap="20px">
                  <Button p="0" onClick={() => setOpenFilterDrawer(false)}>
                    <IoCloseOutline color="#8295AA" size={25} />
                  </Button>
                  <Box
                    borderRadius="50px"
                    border="none"
                    px="15px"
                    py="8px"
                    w={['150px', 'auto']}
                    bg="#D8D8FF"
                  >
                    <Flex alignItems="center" gap="8px">
                      <FilterIcon />
                      <Text fontWeight={700} color="#000080">
                        Filter
                      </Text>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
              <Box color="#2E353F">
                <FormLabel mb="16px">
                  <Flex alignItems="center" justifyContent="space-between">
                    <Heading fontWeight={700} fontSize={16}>
                      Category
                    </Heading>
                    <IoChevronDown />
                  </Flex>
                </FormLabel>
                <Select border="1px solid #C0C0C0" borderRadius="50px" h="52px">
                  <option value="">Newest</option>
                  <option value="">Newest</option>
                  <option value="">Newest</option>
                  <option value="">Newest</option>
                </Select>
              </Box>
            </Stack>
          </Box>
          <Box pb="20px" borderBottom="1px solid #E4E4E4">
            <Stack spacing="20px">
              <Box color="#2E353F">
                <FormLabel mb="16px">
                  <Flex alignItems="center" justifyContent="space-between">
                    <Heading fontWeight={700} fontSize={16}>
                      Equity Price
                    </Heading>
                    <IoChevronDown />
                  </Flex>
                </FormLabel>
                <Flex gap="12px">
                  <Select
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                    h="35px"
                  >
                    <option value="">Newest</option>
                    <option value="">Newest</option>
                    <option value="">Newest</option>
                    <option value="">Newest</option>
                  </Select>
                  <Select
                    border="1px solid #C0C0C0"
                    borderRadius="50px"
                    h="35px"
                  >
                    <option value="">Newest</option>
                    <option value="">Newest</option>
                    <option value="">Newest</option>
                    <option value="">Newest</option>
                  </Select>
                </Flex>
              </Box>
              <CheckboxGroup colorScheme="black">
                <Stack spacing="10px" color="#222222">
                  <Checkbox
                    borderColor="#C0C0C0"
                    fontWeight={600}
                    size="md"
                    value="naruto"
                  >
                    less than 10,000
                  </Checkbox>
                  <Checkbox
                    borderColor="#C0C0C0"
                    fontWeight={600}
                    size="md"
                    value="naruto"
                  >
                    less than 10,000
                  </Checkbox>
                  <Checkbox
                    borderColor="#C0C0C0"
                    fontWeight={600}
                    size="md"
                    value="naruto"
                  >
                    less than 10,000
                  </Checkbox>
                  <Checkbox
                    borderColor="#C0C0C0"
                    fontWeight={600}
                    size="md"
                    value="naruto"
                  >
                    less than 10,000
                  </Checkbox>
                  <Checkbox
                    borderColor="#C0C0C0"
                    fontWeight={600}
                    size="md"
                    value="naruto"
                  >
                    less than 10,000
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </Stack>
          </Box>
          <Box pb="20px" borderBottom="1px solid #E4E4E4">
            <Stack spacing="10px">
              <Box color="#2E353F">
                <FormLabel>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Heading fontWeight={700} fontSize={16}>
                      Appreciation Rate
                    </Heading>
                    <IoChevronDown />
                  </Flex>
                </FormLabel>
              </Box>
              <CheckboxGroup colorScheme="black">
                <Stack spacing="10px" color="#222222">
                  <Checkbox
                    borderColor="#C0C0C0"
                    fontWeight={600}
                    size="md"
                    value="naruto"
                  >
                    less than 10,000
                  </Checkbox>
                  <Checkbox
                    borderColor="#C0C0C0"
                    fontWeight={600}
                    size="md"
                    value="naruto"
                  >
                    less than 10,000
                  </Checkbox>
                  <Checkbox
                    borderColor="#C0C0C0"
                    fontWeight={600}
                    size="md"
                    value="naruto"
                  >
                    less than 10,000
                  </Checkbox>
                  <Checkbox
                    borderColor="#C0C0C0"
                    fontWeight={600}
                    size="md"
                    value="naruto"
                  >
                    less than 10,000
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </Stack>
          </Box>
          <Button
            bg="#222222"
            color="#ffffff"
            borderRadius="50px"
            px="24px"
            py="12px"
          >
            Apply
          </Button>
        </Stack>
      </MotionBox>
    </MotionBox>
  );
};

export default FilterDrawer