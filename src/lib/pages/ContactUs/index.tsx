import {
  Box,
  Heading,
  Text,
  Input,
  FormLabel,
  FormControl,
  Flex,
  Stack,
  Textarea,
  Button,
} from '@chakra-ui/react';
import React from 'react';

const ContactForm = () => {
  return (
    <Box p={['20px',"40px"]} bg="brand.200" boxShadow="md" borderRadius="40px">
      <Stack spacing="40px">
        <Box>
          <Heading fontSize={32} mb="10px" fontWeight={500} color="brand.400">
            Get in touch{' '}
          </Heading>
          <Text fontSize={18} color="brand.400">
            Let us know how we can help
          </Text>
        </Box>
        <Box>
          <Stack spacing="16px">
            <Box>
              <Flex alignItems="center" gap="16px" flexWrap="wrap">
                <FormControl isRequired>
                  <FormLabel fontSize={16} fontWeight={600} color="brand.400">
                    First Name
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    borderRadius="50px"
                    border="1px solid"
                    borderColor="border.200"
                    color="brand.300"
                    _placeholder={{ color: 'brand.800' }}
                    h="50px"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize={16} fontWeight={600} color="brand.400">
                    Last Name
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    borderRadius="50px"
                    border="1px solid"
                    borderColor="border.200"
                    color="brand.300"
                    _placeholder={{ color: 'brand.800' }}
                    h="50px"
                  />
                </FormControl>
              </Flex>
            </Box>
            <FormControl isRequired>
              <FormLabel fontSize={16} fontWeight={600} color="brand.400">
                Email
              </FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                borderRadius="50px"
                border="1px solid"
                borderColor="border.200"
                color="brand.300"
                _placeholder={{ color: 'brand.800' }}
                h="50px"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={16} fontWeight={600} color="brand.400">
                Message
              </FormLabel>
              <Textarea
                placeholder="Enter your message"
                borderRadius="10px"
                border="1px solid"
                borderColor="border.200"
                color="brand.300"
                _placeholder={{ color: 'brand.800' }}
                resize="none"
                h="100px"
              />
            </FormControl>
            <Button fontWeight={600} color='brand.200' w='full' h='55px' bg='brand.100' _hover={{bg: 'brand.100'}}>Send Message</Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

const ContactDetails = () => {
  return (
    <Box>
      <Stack spacing="12px">
        <Heading fontWeight={500} fontSize={32}>
          Contact Us
        </Heading>
        <Text fontSize={[16,18]} color="brand.300">
          Email, call, or complete the form to learn how Vestier can solve your
          real estate management problem.
        </Text>
        <Text fontSize={[16,18]} color="brand.300">
          info@vestier.com
        </Text>
        <Box>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            gap="20px"
            flexWrap={['wrap', 'nowrap']}
          >
            <Box
              p="20px"
              borderRadius="10px"
              border="1px solid"
              borderColor="brand.600"
              w={['100%', '330px']}
              h="182px"
            >
              <Stack spacing="15px">
                {' '}
                <Heading fontSize={18} color="brand.400">
                  Customer Support
                </Heading>
                <Text color="brand.300">
                  Our support team is available around the clock to address any
                  concerns or queries you may have
                </Text>
              </Stack>
            </Box>
            <Box
              p="20px"
              borderRadius="10px"
              border="1px solid"
              borderColor="brand.600"
              w={['100%', '330px']}
              h="182px"
            >
              <Stack spacing="15px">
                {' '}
                <Heading fontSize={18} color="brand.400">
                  Feedback and Suggestions
                </Heading>
                <Text color="brand.300">
                  We value your feedback and are continuously working to improve
                  Vestier. Your input is crucial in shaping the future of
                  Vestier.
                </Text>
              </Stack>
            </Box>
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
};

const index = () => {
  return (
    <Box bg="bg.200" py="40px" mt="-116px" pt={['185px', '200px']}>
      <Box maxW="1300px" mx="auto">
        <Flex
          alignItems="center"
          justifyContent="space-between"
                  flexWrap="wrap"
                  rowGap={['35px', '0']}
        >
          <Box w={['100%', '50%']} px="24px">
            <ContactDetails />
          </Box>
          <Box w={['100%', '50%']} px="24px">
            <ContactForm />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default index;
