import {
  Flex,
  Link,
  Text,
  Box,
  Image,
  Stack,
  Input,
  Heading,
  InputGroup,
  InputLeftElement,
  Button,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { UserIcon, EmailIcon } from '~/lib/components/Icons/Icons';
import { scrollToSection } from '~/lib/utils/scrollToSection';



export const Footer = () => {
  const pathname = usePathname();
  const hiddenRoutes = [
    '/signin',
    '/signup',
    '/forgot-password',
    '/reset-password',
  ];
  return (
    <Box
      as="footer"
      w="100%"
      mx="auto"
      bg="#222222"
      color="#C0C0C0"
      pt="24px"
      px="24px"
      pb="70px"
    >
      <Stack mb="60px">
        <Fragment>
          {!hiddenRoutes.some(
            (route) => pathname === route || pathname.includes(route)
          ) && (
            <Box
              borderRadius="10px"
              bgImage="/assets/images/footer-bg.png"
              pt="40px"
              pb={[0, '40px']}
              px={[0, '94px']}
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
            >
              <Flex
                alignItems="center"
                justifyContent={['center', 'space-between']}
                flexWrap="wrap"
              >
                <Box w={['100%', '530px']} color="white" mb={['40px', 0]}>
                  <Heading fontSize={40} fontWeight={700} mb="16px">
                    Stay Updated
                  </Heading>
                  <Text
                    color="white"
                    mt="20px"
                    fontWeight={500}
                    lineHeight="24px"
                  >
                    Regularly review analytics and updates to ensure your
                    investments align with your financial goals and market
                    conditions.
                  </Text>
                </Box>
                <Box
                  w={['100%', '494px']}
                  bg="white"
                  py="40px"
                  px={['16px', '40px']}
                  borderRadius="5px"
                >
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
          )}
        </Fragment>
        <Box w={['100%', '80%']} mx="auto" pt="70px">
          <Flex justifyContent="space-between" flexWrap="wrap">
            <Box mb={['32px', 0]}>
              <Stack spacing="24px">
                <Image src="/assets/svgs/vestier-logo.svg" w="135px" h="40px" />
                <Text color="#C0C0C0" fontStyle="italic">
                  Invest wisely. Invest with confidence.
                </Text>
              </Stack>
            </Box>
            <Box>
              <Flex gap="50px" flexDir={['column', 'row']}>
                <Stack spacing="10px">
                  <Text>E-mail: app@company.com</Text>
                  <Text>Phone: 09123456789</Text>
                </Stack>
                <Stack spacing="10px">
                  <Text>Support</Text>
                  <Text
                    cursor="pointer"
                    onClick={() => scrollToSection('faqs')}
                  >
                    FAQs
                  </Text>
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
      <Text textAlign={['left', 'center']} fontSize={14}>
        Copyright © {new Date().getFullYear()} Vestier
      </Text>
    </Box>
  );
};
