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
  Image,
} from '@chakra-ui/react';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { LocationIcon, ProfitIcon } from '~/lib/components/Icons/Icons';
import { FormatAmount } from '~/lib/utils/formatAmount';

const Installment = ({ assets }: { assets: any[] }) => {
  const router = useRouter();
  const totalAmountpaid = assets?.reduce((acc, asset) => {
    return acc + Number(asset?.amount_paid);
  }, 0);

  const totalAmountLeft = assets?.reduce((acc, asset) => {
    return acc + Number(asset?.amount_left);
  }, 0);
  return (
    <Box>
      {assets?.length < 1 ? (
        <Box maxW="465px" mx="auto" my="5">
          <Stack spacing="15px" alignItems="center" textAlign="center">
            {' '}
            <Image src="/assets/images/briefcase.png" />
            <Heading fontSize={18}>No Active Instalment Plans!</Heading>
            <Text color="#2E353F">
              Keep track of installment payments and property details in one
              place. Add your property to stay on top of due dates.
            </Text>
          </Stack>
        </Box>
      ) : (
        <TableContainer>
          <Table border="none" variant="unstyled">
            <Thead
              color="#222222"
              bg="#F5F5F5"
              py="22px"
              h="53px"
              border="none"
            >
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
                  Amount Paid
                </Th>
                <Th
                  color="#222222"
                  fontWeight={500}
                  fontSize={14}
                  textTransform="capitalize"
                >
                  Balance Left
                </Th>
                <Th
                  color="#222222"
                  fontWeight={500}
                  fontSize={14}
                  textTransform="capitalize"
                >
                  Next Payment
                </Th>
                {/* <Th
                  color="#222222"
                  fontWeight={500}
                  fontSize={14}
                  textTransform="capitalize"
                >
                  Realtor
                </Th> */}
                <Th
                  color="#222222"
                  fontWeight={500}
                  fontSize={14}
                  textTransform="capitalize"
                >
                  Delivery Status
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
                      {FormatAmount(Number(asset?.amount_paid))}
                    </Td>
                    <Td fontWeight={500} fontSize={14} color="#8295AA">
                      {FormatAmount(Number(asset?.amount_left))}
                    </Td>
                    <Td fontWeight={500} fontSize={14} color="#8295AA">
                      {asset?.due_date
                        ? moment(asset?.due_date).format('ddd, Do MMMM YYYY')
                        : 'N/A'}
                    </Td>
                    {/* <Td fontWeight={500} fontSize={14} color="#8295AA">
                      {asset?.realtor_name}
                    </Td> */}
                    <Td fontWeight={500} fontSize={14} color="#8295AA">
                      Ongoing
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
                  {FormatAmount(Number(totalAmountpaid))}
                </Td>
                <Td color="brand.400" fontWeight={500}>
                  {FormatAmount(
                  Number(totalAmountLeft) || 0.0
                  )}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Installment;
