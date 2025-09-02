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
  Badge,
} from '@chakra-ui/react';
import {
  VerticalEllipsisIcon,
  PreviousPageIcon,
  NextPageIcon,
  RegisterSaleIcon,
  ViewPaymentIcon,
} from '~/lib/components/Icons/Icons';
import useNavigate from '~/lib/utils/useNavigate';
import { FormatAmount } from '~/lib/utils/formatAmount';
import PaymentDetailsModal from '../Modals/PaymentDetailsModal';


const TransactionsList = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(8);
  const assets = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  return (
    <Fragment>
      <TableContainer border="1px solid #E4E4E4" borderRadius="10px">
        <Table>
          <Thead color="#222222" bg="#F5F5F5" py="22px" h="53px" border="none">
            <Tr border="none">
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                Type
              </Th>
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                Related Asset
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
                Date
              </Th>
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                Amount
              </Th>
              <Th
                color="#222222"
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                Commission
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
                      Instalment
                    </Td>
                    <Td fontWeight={500} fontSize={14} color="#8295AA">
                      Green Valley Estate
                    </Td>
                    <Td fontWeight={500} fontSize={14} color="#8295AA">
                      Building
                    </Td>
                    <Td fontWeight={500} fontSize={14} color="#8295AA">
                      17/03/2025
                    </Td>
                    <Td fontWeight={500} fontSize={14} color="#8295AA">
                      {FormatAmount(Number(500000))}
                    </Td>
                    <Td fontWeight={500} fontSize={14} color="#8295AA">
                      {FormatAmount(Number(500000))}
                    </Td>
                    <Td>
                      <Badge
                        bg="bg.700"
                        px="12px"
                        py="4px"
                        fontSize={12}
                        fontWeight={500}
                        color="color.400"
                        textTransform="capitalize"
                        rounded="50px"
                      >
                        Completed
                      </Badge>
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
                              setOpenModal(true)
                            }
                            icon={<ViewPaymentIcon />}
                          >
                            View payment
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
                                `/realtor/properties/57478493/register-sale`
                              )
                            }
                          >
                            Update payment status
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
      <PaymentDetailsModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </Fragment>
  );
};

export default TransactionsList;
