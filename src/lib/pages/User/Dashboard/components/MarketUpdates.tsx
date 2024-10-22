'use client';

import {
  Box,
  Stack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';


const MarketUpdates = () => {
  return (
    <Box py="30px" px="40px" borderBottom="1px solid #E4E4E4">
      <Stack spacing="32px">
        <Heading fontSize={32} fontWeight={500} color="#222222">
          Market Updates
        </Heading>
        <TableContainer>
          <Table border='none' variant='unstyled'>
            <Thead
              color="#222222"
              bg="#F5F5F5"
              py="22px"
              h="70px"
              border="none"
            >
              <Tr border="none">
                <Th
                  color="#222222"
                  fontWeight={500}
                  fontSize={17}
                  textTransform="capitalize"
                >
                  Asset
                </Th>
                <Th
                  color="#222222"
                  fontWeight={500}
                  fontSize={17}
                  textTransform="capitalize"
                >
                  Current Price
                </Th>
                <Th
                  color="#222222"
                  fontWeight={500}
                  fontSize={17}
                  textTransform="capitalize"
                >
                  Change
                </Th>
                <Th
                  color="#222222"
                  fontWeight={500}
                  fontSize={17}
                  textTransform="capitalize"
                >
                  %Change
                </Th>
                <Th
                  color="#222222"
                  fontWeight={500}
                  fontSize={17}
                  textTransform="capitalize"
                >
                  Status
                </Th>
              </Tr>
            </Thead>
            <Tbody color="#222222">
              {[1, 2, 3, 4, 5, 6, 7].map(() => {
                return (
                  <Tr
                    border="none"
                    borderBottom="1px solid #E4E4E4"
                    _hover={{ bg: '#f5f5f5' }}
                  >
                    <Td fontSize={18} fontWeight={700}>
                      Skyline Residences
                    </Td>
                    <Td fontWeight={500} fontSize={18}>
                      ₦375,000
                    </Td>
                    <Td fontWeight={500} fontSize={18}>
                      ₦3
                    </Td>
                    <Td fontWeight={500} fontSize={18}>
                      0.1
                    </Td>
                    <Td>
                      <Sparklines
                        data={[5, 10, 5, 20, 8, 15, 10, 25, 9, 5]}
                        width={100}
                        height={30}
                        margin={5}
                      >
                        <SparklinesLine color="#1BD155" />
                      </Sparklines>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
};

export default MarketUpdates;
