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
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { LocationIcon, ProfitIcon } from '~/lib/components/Icons/Icons';

const Cashflow = ({ assets }: { assets: any[] }) => {
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
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              ></Th>
            </Tr>
          </Thead>
          <Tbody color="#222222" maxH="250px" overflow="auto">
            {assets?.map((asset: any) => {
              return (
                <Tr border="none" _hover={{ bg: '#f5f5f5' }} cursor="pointer">
                  <Td fontSize={15} color="#222222" fontWeight={600}>
                    <Stack>
                      <Heading color="#2E353F" fontSize={16} fontWeight={600}>
                        {asset?.property_name}
                      </Heading>
                      <Flex alignItems="center" gap="10px">
                        <LocationIcon />
                        <Text fontSize={12} color="#222222">
                          {asset?.city_name}
                        </Text>
                      </Flex>
                    </Stack>
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    {asset?.property_type}
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    {asset?.property_cost ? `₦ ${asset?.property_cost}` : 'N/A'}
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    {asset?.allocation_status ||
                      asset?.payment_status ||
                      asset?.documentation_status ||
                      asset?.handover_status ||
                      'N/A'}
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    {asset?.cashflow_amount
                      ? `₦ ${asset?.cashflow_amount}`
                      : 'N/A'}
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    {asset?.cashflow_payment_due
                      ? moment(asset?.cashflow_payment_due).format(
                          'ddd, Do MMMM YYYY'
                        )
                      : 'N/A'}
                  </Td>
                  <Td>
                    <Link href={`/user/my-assets/${asset?.id}`}>
                      <Button
                        bg="#EDEDFF"
                        color="#000080"
                        fontSize={12}
                        py="3px"
                        px="12px"
                        textAlign="center"
                        borderRadius="50px"
                        _hover={{ bg: '#EDEDFF' }}
                      >
                        {' '}
                        View Asset
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              );
            })}
            <Tr borderBlock="1px solid #C0C0C0">
              <Td color="brand.300" fontWeight={600}>
                Total Valuation
              </Td>
              <Td></Td>
              <Td color="brand.400" fontWeight={500}>
                ₦25,005,900
              </Td>
              <Td></Td>
              <Td color="brand.400" fontWeight={500}>
                ₦25,005,900
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Cashflow;
