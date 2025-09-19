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
  RegisterSaleIcon,
} from '~/lib/components/Icons/Icons';
import useNavigate from '~/lib/utils/useNavigate';
import { FormatAmount } from '~/lib/utils/formatAmount';
import EmptyState from '../../EmptyState';

const AvailableProperties = ({ properties }: { properties: any[] }) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(8);
  return (
    <Fragment>
      {properties?.length === 0 ? (
        <Box
          h="60vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <EmptyState
            title="No Available Properties Yet"
            description="You haven’t added any properties or assets for this client. To start tracking sales or payments, assign an asset to them."
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
                  fontWeight={500}
                  fontSize={14}
                  textTransform="capitalize"
                >
                  Property Name
                </Th>
                <Th
                  color="#222222"
                  fontWeight={500}
                  fontSize={14}
                  textTransform="capitalize"
                >
                  Property Address
                </Th>
                <Th
                  color="#222222"
                  fontWeight={500}
                  fontSize={14}
                  textTransform="capitalize"
                >
                  property Type
                </Th>
                <Th
                  color="#222222"
                  fontWeight={500}
                  fontSize={14}
                  textTransform="capitalize"
                >
                  Price
                </Th>
                <Th
                  color="#222222"
                  fontWeight={500}
                  fontSize={14}
                  textTransform="capitalize"
                ></Th>
              </Tr>
            </Thead>
            <Tbody color="#222222" maxH="450px" overflow="auto">
              {properties
                ?.slice((page - 1) * limit, page * limit)
                ?.map((property) => {
                  return (
                    <Tr key={property.id} border="none" cursor="pointer">
                      <Td fontSize={15} color="#222222" fontWeight={600}>
                        {property.property_name}
                      </Td>
                      <Td fontWeight={500} fontSize={14} color="#8295AA">
                        {`${property.house_number}, ${property.street_name}, ${property.city_name}`}
                      </Td>
                      <Td fontWeight={500} fontSize={14} color="#8295AA">
                        {property?.property_type}
                      </Td>
                      <Td fontWeight={500} fontSize={14} color="#8295AA">
                        {FormatAmount(Number(property?.property_cost))}
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
                                navigate(`/realtor/properties/${property.id}`)
                              }
                              icon={<ViewpropertyIcon />}
                            >
                              View property
                            </MenuItem>
                            <MenuItem
                              py="12px"
                              px="16px"
                              _hover={{ bg: 'border.100' }}
                              fontSize={14}
                              color="color.100"
                              fontWeight={500}
                              icon={<RegisterSaleIcon />}
                              onClick={() =>
                                navigate(
                                  `/realtor/properties/${property.id}/register-sale?type=fully_sold`
                                )
                              }
                            >
                              Register sale as Fully Sold
                            </MenuItem>
                            <MenuItem
                              py="12px"
                              px="16px"
                              _hover={{ bg: 'border.100' }}
                              fontSize={14}
                              color="color.100"
                              fontWeight={500}
                              icon={<RegisterSaleIcon />}
                              onClick={() =>
                                navigate(
                                  `/realtor/properties/${property.id}/register-sale?type=instalment`
                                )
                              }
                            >
                              Register sale as instalment payment
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
          {properties?.length > 0 && (
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
                      prev < Math.ceil(properties.length / limit)
                        ? prev + 1
                        : prev
                    )
                  }
                  isDisabled={page >= Math.ceil(properties.length / limit)}
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

export default AvailableProperties;
