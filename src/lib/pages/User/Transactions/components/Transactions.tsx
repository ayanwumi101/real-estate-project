import { Button, Flex, Box, Stack, Text, Heading } from '@chakra-ui/react';
import React from 'react';
import { IoMdArrowForward } from 'react-icons/io';
import { OutwardTransactionIcon } from '~/lib/components/Icons/Icons';

const TransactionListItem = () => {
  return (
    <Box>
      <Flex alignItems="flex-start" justifyContent="space-between">
        <Box>
          <Flex alignItems='flex-start' gap='32px'>
            <Box
              w="48px"
              h="48px"
              bg="#F5F5F5"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
            >
              <OutwardTransactionIcon />
            </Box>
            <Box>
              <Stack spacing="6px">
                <Text fontWeight={500} fontSize={14} color="#222222">
                  Skyline Residences Remittance
                </Text>
                <Text color="#2E353F" fontSize={12}>
                  Aug 30,2024
                </Text>
              </Stack>
            </Box>
          </Flex>
        </Box>

        <Text fontWeight={500} fontSize={14} color="#4040A0">
          -₦ 50,000
        </Text>
      </Flex>
    </Box>
  );
};

const TransactionsList = () => {
  return (
    <Box>
      <Stack spacing="40px">
        <Box py="12px" px="40px" bg="#F5F5F5">
          <Text color="#2E353F" fontWeight={500}>Aug 6 2024</Text>
        </Box>
        <Box px='40px'>
          <Stack spacing="16px">
            <TransactionListItem />
            <TransactionListItem />
            <TransactionListItem />
            <TransactionListItem />
            <TransactionListItem />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

const Transactions = () => {
  return (
    <Box>
      <Stack spacing="40px">
        <TransactionsList />
        <TransactionsList />
      </Stack>
    </Box>
  );
};

export default Transactions;
