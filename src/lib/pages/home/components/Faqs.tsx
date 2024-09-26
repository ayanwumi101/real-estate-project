import {
  Box,
  Heading,
  Text,
  Flex,
  Stack,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import React from 'react';
import { IoChevronForward, IoArrowForward } from 'react-icons/io5';

const Faqs = () => {
  return (
    <Box maxW="1200px" mx="auto" py="60px" px={['24px', 0]}>
      <Flex alignItems="flex-start" justifyContent="space-between" flexWrap='wrap'>
        <Box w="560px" mb={['40px', 0]}>
          <Stack spacing="24px">
            <Heading color="#222222" fontSize={40} fontWeight={700}>
              Frequently Asked Questions
            </Heading>
            <Box>
              <Text color="#222222" fontWeight={500} mb="16px">
                Can’t find what you’re looking for?
              </Text>
              <Button
                w="175px"
                bg="#000080"
                py="6"
                px="24px"
                borderRadius="50px"
                fontWeight={600}
                color="#FFFFFF"
              >
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  gap="8px"
                >
                  <Text>Help Center</Text>
                  <IoChevronForward />
                </Flex>
              </Button>
            </Box>
          </Stack>
        </Box>
        <Box w="560px">
          <Accordion allowToggle={true} allowMultiple={true} mb="16px">
            {[1, 2, 3, 4].map(() => {
              return (
                <AccordionItem mb="24px">
                  <h2>
                    <AccordionButton
                      border="1px solid #3232470F"
                      borderRadius="5px"
                    >
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        color="#2E353F"
                        fontWeight={600}
                      >
                        What types of projects are listed on the platform?
                      </Box>
                      <AccordionIcon color="#2E353F" />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    pb={4}
                    color="#2E353F"
                    fontWeight={500}
                    borderBottom="1px solid #E4E4E4"
                  >
                    Yes, you can access your personalized dashboard to view and
                    manage your investments. You’ll see detailed information
                    about ownership percentages, returns, and maturity status.
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
          <Button
            w="185px"
            bg="#EDEDFF"
            py="6"
            px="24px"
            borderRadius="50px"
            fontWeight={600}
            color="#000080"
          >
            <Flex alignItems="center" justifyContent="space-between" gap="12px">
              <Text>View All FAQs</Text>
              <IoArrowForward />
            </Flex>
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Faqs;
