import {
  Box,
  Stack,
  Text,
  Heading,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import moment from 'moment';
import React, { useContext } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FormatAmount } from '~/lib/utils/formatAmount';
import { AssetDetailsContext } from '..';

const AssetDetailsItem = ({
  label,
  labelValue,
}: {
  label: string;
  labelValue: string;
}) => {
  return (
    <Box w={['100%', '50%']}>
      <Stack spacing="6px">
        <Text fontWeight={600} color="brand.600">
          {label}
        </Text>
        <Text fontWeight={500} color="brand.400">
          {labelValue}
        </Text>
      </Stack>
    </Box>
  );
};

const AssetDetails = ({ propertyDetails }: { propertyDetails: any }) => {
  const {
    propertySize,
    setPropertySize,
    boughtDate,
    setBoughtDate,
    propertyCost,
    setPropertyCost,
    paymentStatus,
    setPaymentStatus,
    cashflowSource,
    setCashflowSource,
    isPropertyOccupied,
    setIsPropertyOccupied,
    remittanceAmount,
    setRemittanceAmount,
    cashflowDuration,
    setCashflowDuration,
    lastRemittanceDate,
    setLastRemittanceDate,
    equityOwnership,
    setEquityOwnership,
    realtorName,
    setRealtorName,
    realtorPhone,
    setRealtorPhone,
    allocationStatus,
    setAllocationStatus,
    documentationStatus,
    setDocumentationStatus,
    handoverStatus,
    setHandoverStatus,
  } = useContext(AssetDetailsContext);
  return (
    <Box>
      <Stack spacing="32px">
        {/* basic details section */}
        <Box
          border="1px solid"
          borderColor="border.100"
          p="32px"
          borderRadius="8px"
          w={['100%', '700px']}
        >
          <Heading
            pb="12px"
            borderBottom="1px solid"
            borderColor="border.100"
            fontSize={16}
            color="brand.400"
            mb="32px"
          >
            Basic Details
          </Heading>
          <Box>
            <Flex
              alignItems="center"
              gap="16px"
              flexWrap={['wrap', 'nowrap']}
              mb="16px"
            >
              <FormControl>
                <FormLabel fontWeight={600} fontSize={15} color="brand.300">
                  Property Size
                </FormLabel>
                <Input
                  type="text"
                  h="50px"
                  rounded="40px"
                  border="1px solid"
                  borderColor="border.200"
                  value={propertySize}
                  onChange={(e) => setPropertySize(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={600} fontSize={15} color="brand.300">
                  When was property bought
                </FormLabel>
                <Input
                  type="date"
                  h="50px"
                  rounded="40px"
                  border="1px solid"
                  borderColor="border.200"
                  value={boughtDate.split(' ')[0]}
                  onChange={(e) => setBoughtDate(e.target.value)}
                />
              </FormControl>
            </Flex>
            <Flex alignItems="center" gap="16px" flexWrap={['wrap', 'nowrap']}>
              <FormControl>
                <FormLabel fontWeight={600} fontSize={15} color="brand.300">
                  Amount Purchased
                </FormLabel>
                <Input
                  type="text"
                  h="50px"
                  rounded="40px"
                  border="1px solid"
                  borderColor="border.200"
                  value={propertyCost}
                  onChange={(e) => setPropertyCost(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={600} fontSize={15} color="brand.300">
                  Payment Status
                </FormLabel>
                <Select
                  h="50px"
                  rounded="40px"
                  border="1px solid"
                  borderColor="border.200"
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  placeholder='Select payment status'
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Ongoing">Ongoing</option>
                </Select>
              </FormControl>
            </Flex>
          </Box>
        </Box>

        {/* Cashflow details */}
        {propertyDetails?.asset_type === 'cashflow' && (
          <Box
            border="1px solid"
            borderColor="border.100"
            p="32px"
            borderRadius="8px"
            w={['100%', '700px']}
          >
            <Heading
              pb="12px"
              borderBottom="1px solid"
              borderColor="border.100"
              fontSize={16}
              color="brand.400"
              mb="32px"
            >
              Cashflow Details
            </Heading>

            <Box>
              <Flex
                alignItems="center"
                gap="16px"
                flexWrap={['wrap', 'nowrap']}
                mb="16px"
              >
                <FormControl>
                  <FormLabel fontWeight={600} fontSize={15} color="brand.300">
                    Cashflow Source
                  </FormLabel>
                  <Select
                    h="50px"
                    rounded="40px"
                    border="1px solid"
                    borderColor="border.200"
                    value={cashflowSource}
                    onChange={(e) => setCashflowSource(e.target.value)}
                  >
                    <option value="rent">Rent</option>
                    <option value="lease">Lease</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={600} fontSize={15} color="brand.300">
                    Property Currently Occupied?
                  </FormLabel>
                  <Select
                    h="50px"
                    rounded="40px"
                    border="1px solid"
                    borderColor="border.200"
                    value={isPropertyOccupied === true ? 'yes' : 'no'}
                    onChange={(e) => setIsPropertyOccupied(e.target.value)}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Select>
                </FormControl>
              </Flex>
              <Flex
                alignItems="center"
                gap="16px"
                flexWrap={['wrap', 'nowrap']}
                mb="16px"
              >
                <FormControl>
                  <FormLabel fontWeight={600} fontSize={15} color="brand.300">
                    Remittance Value
                  </FormLabel>
                  <Input
                    h="50px"
                    rounded="40px"
                    border="1px solid"
                    borderColor="border.200"
                    value={remittanceAmount}
                    onChange={(e) => setRemittanceAmount(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={600} fontSize={15} color="brand.300">
                    Duration of Yield
                  </FormLabel>
                  <Input
                    h="50px"
                    rounded="40px"
                    border="1px solid"
                    borderColor="border.200"
                    value={cashflowDuration}
                    onChange={(e) => setCashflowDuration(e.target.value)}
                  />
                </FormControl>
              </Flex>
              <Flex
                alignItems="center"
                gap="16px"
                flexWrap={['wrap', 'nowrap']}
                mb="16px"
              >
                <FormControl>
                  <FormLabel fontWeight={600} fontSize={15} color="brand.300">
                    Last Remittance Payment
                  </FormLabel>
                  <Input
                    type="date"
                    h="50px"
                    rounded="40px"
                    border="1px solid"
                    borderColor="border.200"
                    value={lastRemittanceDate?.split(' ')[0]}
                    onChange={(e) => setLastRemittanceDate(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={600} fontSize={15} color="brand.300">
                    Equity Ownership
                  </FormLabel>
                  <Input
                    type="text"
                    h="50px"
                    rounded="40px"
                    border="1px solid"
                    borderColor="border.200"
                    value={equityOwnership || 0}
                    onChange={(e) => setEquityOwnership(e.target.value)}
                  />
                </FormControl>
              </Flex>
            </Box>
          </Box>
        )}

        {/* Payment Details */}
        {/* {propertyDetails?.asset_type === 'instalment' && (
          <Box
            border="1px solid"
            borderColor="border.100"
            p="32px"
            borderRadius="8px"
            maxW="645px"
          >
            <Heading
              pb="12px"
              borderBottom="1px solid"
              borderColor="border.100"
              fontSize={16}
              color="brand.400"
              mb="32px"
            >
              Payment Details
            </Heading>
            <Box>
              <Flex alignItems="center" flexWrap="wrap" rowGap="16px">
                <AssetDetailsItem
                  label="Amount Paid"
                  labelValue={FormatAmount(
                    Number(propertyDetails?.amount_paid || 0.0)
                  )}
                />
                <AssetDetailsItem
                  label="Outstanding Balance"
                  labelValue={FormatAmount(
                    Number(propertyDetails?.amount_left || 0.0)
                  )}
                />
                <AssetDetailsItem
                  label="Payment plan"
                  labelValue={propertyDetails?.payment_plan || 'N/A'}
                />
                <AssetDetailsItem
                  label="Installment payment"
                  labelValue={FormatAmount(
                    Number(propertyDetails?.amount_paid) || 0.0
                  )}
                />
                <AssetDetailsItem
                  label="Last Payment Date"
                  labelValue={
                    propertyDetails?.payment_date
                      ? moment(propertyDetails?.payment_date).format(
                          'ddd, Do MMMM YYYY'
                        )
                      : 'N/A'
                  }
                />
                <AssetDetailsItem
                  label="Next Payment Date"
                  labelValue={
                    propertyDetails?.due_date
                      ? moment(propertyDetails?.due_date).format(
                          'ddd, Do MMMM YYYY'
                        )
                      : 'N/A'
                  }
                />
                <AssetDetailsItem
                  label="Duration of Payment"
                  labelValue={propertyDetails?.duration || 'N/A'}
                />
              </Flex>
            </Box>
          </Box>
        )} */}

        {/* Realtor Details */}
        <Box
          border="1px solid"
          borderColor="border.100"
          p="32px"
          borderRadius="8px"
          w={['100%', '700px']}
        >
          <Heading
            pb="12px"
            borderBottom="1px solid"
            borderColor="border.100"
            fontSize={16}
            color="brand.400"
            mb="32px"
          >
            Realtor Details
          </Heading>

          <Box>
            <Flex alignItems="center" gap="16px" flexWrap={['wrap', 'nowrap']}>
              <FormControl w={['100%', '50%']}>
                <FormLabel fontWeight={600} fontSize={15} color="brand.300">
                  Realtor Name
                </FormLabel>
                <Input
                  type="text"
                  h="50px"
                  rounded="40px"
                  border="1px solid"
                  borderColor="border.200"
                  value={realtorName}
                  onChange={(e) => setRealtorName(e.target.value)}
                />
              </FormControl>
              <FormControl w={['100%', '50%']}>
                <FormLabel fontWeight={600} fontSize={15} color="brand.300">
                  Phone Number
                </FormLabel>
                {/* {realtorPhone?.startsWith('234') ? ( */}
                <PhoneInput
                  value={realtorPhone}
                  onChange={(value: string) => setRealtorPhone(value)}
                  containerStyle={{
                    border: '1px solid #C0C0C0',
                    backgroundColor: '#FBFBFB',
                    padding: '5px 14px 5px 14px',
                    borderRadius: '24px',
                    height: '50px',
                    width: '100%',
                  }}
                  inputStyle={{
                    border: 'none',
                    paddingLeft: '50px',
                    paddingTop: '5px',
                    backgroundColor: '#FBFBFB',
                    width: '100%',
                  }}
                  buttonStyle={{
                    border: 'none',
                    background: 'transparent',
                  }}
                />
                {/* // ) : (
                //   <Input
                //     type="tel"
                //     value={realtorPhone}
                //     onChange={(e) => setRealtorPhone(e.target.value)}
                //   />
                // )} */}
              </FormControl>
            </Flex>
          </Box>
        </Box>

        {/* Delivery details */}
        <Box
          border="1px solid"
          borderColor="border.100"
          p="32px"
          borderRadius="8px"
          w={['100%', '700px']}
        >
          <Heading
            pb="12px"
            borderBottom="1px solid"
            borderColor="border.100"
            fontSize={16}
            color="brand.400"
            mb="32px"
          >
            Delivery Status
          </Heading>
          <Box>
            <Flex
              alignItems="center"
              gap="16px"
              flexWrap={['wrap', 'nowrap']}
              mb="16px"
            >
              <FormControl>
                <FormLabel fontWeight={600} fontSize={15} color="brand.300">
                  Payment Status
                </FormLabel>
                <Select
                  h="50px"
                  rounded="40px"
                  border="1px solid"
                  borderColor="border.200"
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  placeholder='Select payment status'
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Ongoing">Ongoing</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={600} fontSize={15} color="brand.300">
                  Allocation Status
                </FormLabel>
                <Select
                  h="50px"
                  rounded="40px"
                  border="1px solid"
                  borderColor="border.200"
                  value={allocationStatus}
                  onChange={(e) => setAllocationStatus(e.target.value)}
                  placeholder="Select allocation status"
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Ongoing">Ongoing</option>
                </Select>
              </FormControl>
            </Flex>
            <Flex alignItems="center" gap="16px" flexWrap={['wrap', 'nowrap']}>
              <FormControl>
                <FormLabel fontWeight={600} fontSize={15} color="brand.300">
                  Documentation Status
                </FormLabel>
                <Select
                  h="50px"
                  rounded="40px"
                  border="1px solid"
                  borderColor="border.200"
                  value={documentationStatus}
                  onChange={(e) => setDocumentationStatus(e.target.value)}
                  placeholder="Select documentation status"
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Ongoing">Ongoing</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={600} fontSize={15} color="brand.300">
                  Handover Status
                </FormLabel>
                <Select
                  h="50px"
                  rounded="40px"
                  border="1px solid"
                  borderColor="border.200"
                  value={handoverStatus}
                  onChange={(e) => setHandoverStatus(e.target.value)}
                  placeholder="Select handover status"
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Ongoing">Ongoing</option>
                </Select>
              </FormControl>
            </Flex>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default AssetDetails;
