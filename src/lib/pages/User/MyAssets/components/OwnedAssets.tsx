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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { LocationIcon, ProfitIcon } from '~/lib/components/Icons/Icons';


const OwnedAssets = ({assets}:{assets: any[]}) => {
  const router = useRouter();
  console.log(assets);
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
                Delivery Status
              </Th>
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody color="#222222">
            {assets?.map((asset) => {
              return (
                <Tr
                  key={asset?.id}
                  // as="a"
                  // passHref="/user/portfolio/property-details"
                  border="none"
                  _hover={{ bg: '#f5f5f5' }}
                  
                  cursor="pointer"
                  onClick={() =>
                    router.push('/user/portfolio/property-details')
                  }
                >
                  <Td fontSize={15} color="#222222" fontWeight={600} >
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
                    ₦{asset?.property_cost}
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    {asset?.allocation_status}
                  </Td>
                  <Td>
                    <Link href={`/user/portfolio/property-details`}>
                      <Button
                        bg="#EDEDFF"
                        fontSize={14}
                        color="brand.100"
                        fontWeight={500}
                        px='12px'
                        py='5px'
                      >
                        View Asset
                      </Button>
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

export default OwnedAssets;
