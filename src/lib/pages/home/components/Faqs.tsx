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
  const faqs = [
    {
      question: 'What is Vestiers about?',
      answer:
        'We are a digital real estate ecosystem, that brings together investors, agents, developers, financiers, property managers all on a single platform, with the sole aim of each party tracking and monitoring their assets.',
    },
    {
      question: 'What do I benefit as an Investor?',
      answer:
        'We provide a dashboard that allows you monitor, manage and track your assets anywhere in Nigeria. You can track the appreciation of your property, cashflow, valuation and maturity if it is right time to sell.',
    },
    {
      question: 'How do you update my property details?',
      answer:
        'Our ecosystem includes agents and property managers, so you can set roles and permission. If you permit an agent, he/she can update or upload your payments and remittance, which will automatically reflect on your dashboard. Your manager after collecting rent or shortlet, can also update your remittance record from their dashboard, and it will reflect in yours.',
    },
  ];
  return (
    <Box maxW="1200px" mx="auto" py="60px" px={['24px', 0]} id="faqs">
      <Flex
        alignItems="flex-start"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Box w="560px" mb={['40px', 0]}>
          <Stack spacing="24px">
            <Heading color="#222222" fontSize={32} fontWeight={500}>
              Frequently Asked Questions
            </Heading>
            <Box>
              <Text color="#222222" fontWeight={500} mb="16px">
                Get in touch with us today to learn how our technology-driven
                solutions can unlock new potential for your assets.
              </Text>
              {/* <Button
                w="175px"
                bg="#000080"
                _hover={{ bg: '#000080' }}
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
              </Button> */}
            </Box>
          </Stack>
        </Box>
        <Box w="560px">
          <Accordion
            allowToggle={true}
            allowMultiple={true}
            display="flex"
            flexDir="column"
            gap="20px"
          >
            {faqs.map(({ question, answer }, idx) => {
              return (
                <AccordionItem key={idx} border="1px solid #3232470F" borderRadius="5px">
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        color="#2E353F"
                        fontWeight={600}
                        letterSpacing="0.5px"
                      >
                        {question}
                      </Box>
                      <AccordionIcon color="#2E353F" />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} fontSize={15}  letterSpacing="0.5px" color="#2E353F" fontWeight={500}>
                    {answer}
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
          {/* <Button
            w="185px"
            bg="#EDEDFF"
            py="6"
            px="24px"
            borderRadius="50px"
            fontWeight={600}
            color="#000080"
            mt="15px"
          >
            <Flex alignItems="center" justifyContent="space-between" gap="12px">
              <Text>View All FAQs</Text>
              <IoArrowForward />
            </Flex>
          </Button> */}
        </Box>
      </Flex>
    </Box>
  );
};

export default Faqs;
