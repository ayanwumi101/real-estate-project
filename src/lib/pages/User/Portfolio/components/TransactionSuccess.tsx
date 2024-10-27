import { Box, Heading, Text, Image, Button, Stack, Flex } from '@chakra-ui/react'
import Link from 'next/link';
import React from 'react'



const TransactionDetailsItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <Box>
      <Flex alignItems="center" justifyContent="flex-start" gap='120px'>
        <Text color="#8295AA" fontWeight={600} w='110px'>
          {label}
        </Text>
        <Text color="#222222" fontWeight={500}>
          {value}
        </Text>
      </Flex>
    </Box>
  );
};


const TransactionSuccess = () => {
  return (
    <Box mb="40px">
      <Box borderY="1px solid #E4E4E4" p="40px">
        <Box mb="40px">
          {' '}
          <Heading mb="20px" fontSize={35} fontWeight={700} color="#1BD155">
            Your transaction was successful!
          </Heading>
          <Text color="#222222" fontWeight={500}>
            Your order has been listed for sale
          </Text>
        </Box>
        <Box>
          <Image
            src="/assets/images/house-1.png"
            w="100px"
            h="100px"
            objectFit="cover"
            mb="15px"
          />
          <Heading fontSize={24} mb="15px" color="#222222" fontWeight={500}>
            Skyline Residences
          </Heading>
          <Stack mb="30px" w="380px" spacing="15px">
            <TransactionDetailsItem label="Unit:" value="2 bedroom flat" />
            <TransactionDetailsItem label="Shares:" value="100 Shares" />
            <TransactionDetailsItem
              label="Location:"
              value="Victoria Island, Lagos"
            />
            <TransactionDetailsItem label="Amount:" value="₦1,000,000" />
            <TransactionDetailsItem label="Charges:" value="₦0.00" />
            <TransactionDetailsItem label="Total Payment:" value="₦1,000,000" />
          </Stack>
          <Link href="/user/dashboard">
            <Button
              bg="#000080"
              color="#ffffff"
              borderRadius="50px"
              fontWeight={500}
            >
              Go to dashboard
            </Button>
          </Link>
        </Box>
      </Box>
      <Box
        fontWeight={500}
        color="#8295AA"
        py="40px"
        borderBottom="1px solid #E4E4E4"
        p="40px"
      >
        <Text>
          We’ve sent a notification email to{' '}
          <Box as="span" fontWeight={600} color="#222222">
            abcdef@gmail.com
          </Box>
        </Text>
      </Box>
    </Box>
  );
}

export default TransactionSuccess