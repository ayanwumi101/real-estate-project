import React, { Fragment } from 'react';
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
  AddPaymentIcon,
  AssignPropertyIcon,
  DeletePropertyIcon,
} from '~/lib/components/Icons/Icons';
import useNavigate from '~/lib/utils/useNavigate';
import { FormatAmount } from '~/lib/utils/formatAmount';
import EmptyState from '../../EmptyState';
import { AssignPropertyToClientIcon } from '~/lib/components/Icons/Icon-Images';

const ClientsList = ({ clients }: { clients: any[] }) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(8);

  return (
    <Fragment>
      {clients?.length === 0 ? (
        <Box
          h="60vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <EmptyState
            title="No Available Clients Yet"
            description="You haven’t added any clients yet. To start tracking sales or payments, assign an asset to them."
          />
        </Box>
      ) : (
        <TableContainer border="1px solid #E4E4E4" borderRadius="10px">
          <Table>
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
              {clients
                ?.slice((page - 1) * limit, page * limit)
                ?.map((client) => {
                  return (
                    <Tr key={client.id} border="none" cursor="pointer">
                      <Td fontSize={15} color="#222222" fontWeight={600}>
                        {`${client?.firstname} ${client.lastname}`}
                      </Td>
                      <Td fontWeight={500} fontSize={14} color="#8295AA">
                        {client?.email}
                      </Td>
                      <Td fontWeight={500} fontSize={14} color="#8295AA">
                        {client?.phone?.startsWith('234')
                          ? `+${client.phone}`
                          : 'N/A'}
                      </Td>
                      <Td fontWeight={500} fontSize={14} color="#8295AA">
                        {client.address}
                      </Td>
                      <Td fontWeight={500} fontSize={14} color="#8295AA">
                        {client?.properties_count}
                      </Td>
                      <Td fontWeight={500} fontSize={14} color="#8295AA">
                        {client?.manager || 'N/A'}
                      </Td>
                      <Td>
                        <Menu>
                          <MenuButton as={Button} rounded="5px" bg="bg.200">
                            <VerticalEllipsisIcon />
                          </MenuButton>
                          <Portal>
                            <MenuList py="0px">
                              <MenuItem
                                py="12px"
                                px="16px"
                                _hover={{ bg: 'border.100' }}
                                fontSize={14}
                                color="color.100"
                                fontWeight={500}
                                onClick={() =>
                                  navigate(`/realtor/clients/${client.id}`)
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
                                icon={<AssignPropertyToClientIcon />}
                                // onClick={() =>
                                //   navigate(
                                //     `/realtor/properties/57478493/register-sale`
                                //   )
                                // }
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
                          </Portal>
                        </Menu>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
          {clients?.length > 0 && (
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
                      prev < Math.ceil(clients.length / limit) ? prev + 1 : prev
                    )
                  }
                  isDisabled={page >= Math.ceil(clients.length / limit)}
                >
                  <NextPageIcon />
                </Button>
              </Flex>
            </Box>
          )}
        </TableContainer>
      )}
    </Fragment>
  );
};

export default ClientsList;
