import {
  Box,
  Flex,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Heading,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { LocationIcon, ProfitIcon } from '~/lib/components/Icons/Icons';

const Cashflow = () => {
  const router = useRouter();
  return (
    <Box>
      <TableContainer>
        <Table border="none" variant="unstyled">
          <Thead color="#222222" bg="#F5F5F5" py="22px" h="53px" border="none">
            <Tr border="none">
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                Property
              </Th>
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                Property Type
              </Th>
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                Amount Purchased
              </Th>
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                Status
              </Th>
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                Remittance amount
              </Th>
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                Next Due Remittance
              </Th>
            </Tr>
          </Thead>
          <Tbody color="#222222">
            {[1, 2, 3].map(() => {
              return (
                <Tr
                  // as="a"
                  // passHref="/user/portfolio/property-details"
                  border="none"
                  _hover={{ bg: '#f5f5f5' }}
                  px="0"
                  cursor="pointer"
                  onClick={() =>
                    router.push('/user/portfolio/property-details')
                  }
                >
                  <Td fontSize={15} color="#222222" fontWeight={600} px="0">
                    <Stack>
                      <Heading color="#2E353F" fontSize={16} fontWeight={600}>
                        Harborview Towers
                      </Heading>
                      <Flex alignItems="center" gap="10px">
                        <LocationIcon />
                        <Text fontSize={12} color="#222222">
                          Lagos
                        </Text>
                      </Flex>
                    </Stack>
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    Building
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    ₦10,003,000
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    Annual
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    ₦10,003,000
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    <Flex alignItems="center" gap="20px">
                      <Text>Tue, 30 Oct 2025</Text>
                      <Text
                        bg="#EDEDFF"
                        color="#000080"
                        fontSize={12}
                        py="3px"
                        px="12px"
                        textAlign="center"
                        borderRadius="50px"
                      >
                        View Asset
                      </Text>
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Cashflow;
