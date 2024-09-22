import {
  Flex,
  Link,
  Text,
  Box,
  Image,
  Stack,
  Input,
  Heading, InputGroup, InputLeftElement, Button
} from '@chakra-ui/react';
import { UserIcon, EmailIcon } from '~/lib/components/Icons/Icons';




export const Footer = () => {
  return (
    <Box
      as="footer"
      w='100%'
      mx='auto'
      bg="#222222"
      color="#C0C0C0"
      pt="24px"
      px="24px"
      pb="70px"
    >
      <Stack mb="60px">
        <Box
          borderRadius="10px"
          bgImage="/assets/images/footer-bg.png"
          py="40px"
          px="94px"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Box maxW="530px" color="white">
              <Heading fontSize={40} fontWeight={700} mb="16px">
                Stay Updated
              </Heading>
              <Text color="white" mt="20px" fontWeight={500} lineHeight="24px">
                Regularly review analytics and updates to ensure your
                investments align with your financial goals and market
                conditions.
              </Text>
            </Box>
            <Box w="494px" bg="white" p="40px" borderRadius="5px">
              <Stack spacing="16px">
                <InputGroup w="100%">
                  <InputLeftElement pointerEvents="none" ml="2" mt="1">
                    <UserIcon />
                  </InputLeftElement>
                  <Input
                    pl="12"
                    py="12px"
                    border="1px solid #C0C0C0"
                    type="tel"
                    placeholder="Enter your phone number here"
                    borderRadius="50px"
                    bg="#FBFBFB"
                    color="#8295AA"
                    _placeholder={{ color: '#8295AA' }}
                    h="50px"
                  />
                </InputGroup>
                <InputGroup w="100%">
                  <InputLeftElement pointerEvents="none" ml="2" mt="1">
                    <EmailIcon />
                  </InputLeftElement>
                  <Input
                    pl="12"
                    py="12px"
                    border="1px solid #C0C0C0"
                    type="tel"
                    placeholder="Enter your email here"
                    borderRadius="50px"
                    bg="#FBFBFB"
                    color="#8295AA"
                    _placeholder={{ color: '#8295AA' }}
                    h="50px"
                  />
                </InputGroup>
                <Button
                  borderRadius="50px"
                  bg="#222222"
                  color="#EDEDFF"
                  fontWeight={600}
                  fontSize={14}
                  py="6"
                >
                  Subscribe
                </Button>
              </Stack>
            </Box>
          </Flex>
        </Box>
        <Box w="80%" mx="auto" pt="70px">
          <Flex justifyContent="space-between">
            <Box>
              <Stack spacing="24px">
                <Heading fontSize={25} fontWeight={700}>
                  Company Logo
                </Heading>
                <Text color="#C0C0C0" fontStyle="italic">
                  Invest wisely. Invest with confidence.
                </Text>
              </Stack>
            </Box>
            <Box>
              <Flex gap="50px">
                <Stack spacing="10px">
                  <Text>E-mail: app@company.com</Text>
                  <Text>Phone: 09123456789</Text>
                </Stack>
                <Stack spacing="10px">
                  <Text>Support</Text>
                  <Text>FAQs</Text>
                </Stack>
                <Stack spacing="10px">
                  <Text>Terms & Conditions</Text>
                  <Text>Privacy Policy</Text>
                </Stack>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Stack>
      <Text textAlign="center" fontSize={14}>
        Copyright © 2024 Company name
      </Text>
    </Box>
  );
};
