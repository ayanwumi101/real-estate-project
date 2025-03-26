'use client'
import React from "react";
import { Box, Stack, Flex, Button, Text, Table, TableContainer, Thead, Tr, Th, Tbody, Heading, Td } from "@chakra-ui/react";
import { ArrowUpIcon, LocationIcon } from "~/lib/components/Icons/Icons";
import moment from "moment";
import Link from "next/link";



const PropertyListTable = ({ assets }: { assets: any[] }) => {
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
                Remittance Amount
              </Th>
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                <Flex alignItems="center" gap="5px">
                  <Text> Next Due Remittance</Text>
                  <ArrowUpIcon />
                </Flex>
              </Th>
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              ></Th>
            </Tr>
          </Thead>
          <Tbody color="#222222">
            {assets?.map((asset: any) => {
              return (
                <Tr
                  border="none"
                  _hover={{ bg: '#f5f5f5' }}
                  px="0"
                  cursor="pointer"
                >
                  <Td fontSize={18} fontWeight={700} px="0">
                    <Flex alignItems="center" gap="10px">
                      <Stack spacing="3px">
                        <Heading color="#2E353F" fontWeight={500} fontSize={16}>
                          {asset?.property_name}
                        </Heading>
                        <Flex alignItems="center" gap="3px">
                          <LocationIcon />
                          <Text color="#2E353F" fontWeight={400} fontSize={12}>
                            {asset?.city_name}
                          </Text>
                        </Flex>
                      </Stack>
                    </Flex>
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    {asset?.property_type}
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    {asset?.property_cost ? `₦ ${asset?.property_cost}` : 'N/A'}
                  </Td>
                  <Td fontWeight={500} fontSize={13} px="0">
                    {asset?.payment_plan}
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    {asset?.due_date ? `₦ ${asset?.due_date}` : 'N/A'}
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    {asset?.due_date
                      ? moment(asset?.due_date).format('ddd, Do MMMM YYYY')
                      : 'N/A'}
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    <Link href={`/user/portfolio/${asset?.id}`}>
                      <Button bg='#ededff' _hover={{ bg: '#EDEDFF' }}>View asset</Button>
                    </Link>
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


export default PropertyListTable