import React from 'react'
import {
  Box,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Heading,
  Text,
  Portal,
} from '@chakra-ui/react';
import {
  VerticalEllipsisIcon,
  PreviousPageIcon,
  NextPageIcon,
  ViewpropertyIcon,
 AddPaymentIcon, AssignPropertyIcon, DeletePropertyIcon
} from '~/lib/components/Icons/Icons';
import useNavigate from '~/lib/utils/useNavigate';
import { FormatAmount } from '~/lib/utils/formatAmount';

const ClientsList = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(8);
  const assets = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));
  return (
    <TableContainer border="1px solid #E4E4E4" borderRadius="10px">
      <Table>
        <Thead color="#222222" bg="#F5F5F5" py="22px" h="53px" border="none">
          <Tr border="none">
            <Th
              color="#222222"
              fontWeight={600}
              fontSize={14}
              textTransform="capitalize"
            >
              Client Name
            </Th>
            <Th
              color="#222222"
              fontWeight={600}
              fontSize={14}
              textTransform="capitalize"
            >
              Email
            </Th>
            <Th
              color="#222222"
              fontWeight={600}
              fontSize={14}
              textTransform="capitalize"
            >
              Phone
            </Th>
            <Th
              color="#222222"
              fontWeight={600}
              fontSize={14}
              textTransform="capitalize"
            >
              Address
            </Th>
            <Th
              color="#222222"
              fontWeight={600}
              fontSize={14}
              textTransform="capitalize"
            >
              Property
            </Th>
            <Th
              color="#222222"
              fontWeight={600}
              fontSize={14}
              textTransform="capitalize"
            >
              Client Manager
            </Th>
            <Th
              color="#222222"
              fontWeight={600}
              fontSize={14}
              textTransform="capitalize"
            ></Th>
          </Tr>
        </Thead>
        <Tbody color="#222222" maxH="450px" overflow="auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            ?.slice((page - 1) * limit, page * limit)
            ?.map((asset) => {
              return (
                <Tr key={asset} border="none" cursor="pointer">
                  <Td fontSize={15} color="#222222" fontWeight={600}>
                    Marx Hershey
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    thuhang.nute@gmail.com
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    0812767165464
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    3891 Ranchview Dr. Richardson, California 62639
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    4
                  </Td>
                  <Td fontWeight={500} fontSize={14} color="#8295AA">
                    Brooklyn Simmons
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton as={Button} rounded="5px" bg="bg.200">
                        <VerticalEllipsisIcon />
                      </MenuButton>
                      <MenuList py="0px">
                        <MenuItem
                          py="12px"
                          px="16px"
                          _hover={{ bg: 'border.100' }}
                          fontSize={14}
                          color="color.100"
                          fontWeight={500}
                          onClick={() =>
                            navigate(`/realtor/clients/hfjrhu4884`)
                          }
                          icon={<ViewpropertyIcon />}
                        >
                          View client
                        </MenuItem>
                        <MenuItem
                          py="12px"
                          px="16px"
                          _hover={{ bg: 'border.100' }}
                          fontSize={14}
                          color="color.100"
                          fontWeight={500}
                          icon={<AddPaymentIcon />}
                          onClick={() =>
                            navigate(
                              `/realtor/properties/57478493/register-sale`
                            )
                          }
                        >
                          Add to property
                        </MenuItem>
                        <MenuItem
                          py="12px"
                          px="16px"
                          _hover={{ bg: 'border.100' }}
                          fontSize={14}
                          color="color.100"
                          fontWeight={500}
                          icon={<AssignPropertyIcon />}
                          onClick={() =>
                            navigate(
                              `/realtor/properties/57478493/register-sale`
                            )
                          }
                        >
                          Assign Manager
                        </MenuItem>
                        <MenuItem
                          py="12px"
                          px="16px"
                          _hover={{ bg: 'border.100' }}
                          fontSize={14}
                          color="color.100"
                          fontWeight={500}
                          icon={<DeletePropertyIcon />}
                          onClick={() =>
                            navigate(
                              `/realtor/properties/57478493/register-sale`
                            )
                          }
                        >
                          Delete Client
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
      {[1, 2, 3, 4, 5, 6, 7, 8, 10]?.length > 0 && (
        <Box w="full" bg="white" py="10px">
          <Flex alignItems="center" justifyContent="center" gap="13px">
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              isDisabled={page === 1}
              border="1px solid #E4E4E4"
              rounded="6px"
              variant="outline"
              p="8px"
            >
              <PreviousPageIcon />
            </Button>
            <Text fontWeight={600} fontSize={17}>
              {page}
            </Text>
            <Button
              border="1px solid #E4E4E4"
              rounded="6px"
              variant="outline"
              p="8px"
              onClick={() =>
                setPage((prev) =>
                  prev < Math.ceil(assets.length / limit) ? prev + 1 : prev
                )
              }
              isDisabled={page >= Math.ceil(assets.length / limit)}
            >
              <NextPageIcon />
            </Button>
          </Flex>
        </Box>
      )}
    </TableContainer>
  );
}

export default ClientsList