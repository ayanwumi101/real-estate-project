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
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FormatAmount } from '~/lib/utils/formatAmount';

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

const AssetDetails = ({
  propertyDetails,
  updateAssetDetails,
  setUpdateAssetDetails,
}: {
  propertyDetails: any;
  updateAssetDetails: boolean;
  setUpdateAssetDetails: (value: boolean) => void;
}) => {
  return (
    <Box>
      <Stack spacing="32px">
        {/* basic details section */}
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
            Basic Details
          </Heading>
          {updateAssetDetails ? (
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
                  />
                </FormControl>
              </Flex>
              <Flex
                alignItems="center"
                gap="16px"
                flexWrap={['wrap', 'nowrap']}
              >
                <FormControl>
                  <FormLabel fontWeight={600} fontSize={15} color="brand.300">
                    Amount Purchased
                  </FormLabel>
                  <Input
                    type="number"
                    h="50px"
                    rounded="40px"
                    border="1px solid"
                    borderColor="border.200"
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
                  >
                    <option value="completed">Completed</option>
                    <option value="completed">Pending</option>
                    <option value="completed">Ongoing</option>
                    <option value="completed">Completed</option>
                  </Select>
                </FormControl>
              </Flex>
            </Box>
          ) : (
            <Box>
              <Flex alignItems="center" flexWrap="wrap" rowGap="16px">
                <AssetDetailsItem
                  label="Amount Purchased"
                  labelValue={FormatAmount(
                    propertyDetails?.property_cost || 0.0
                  )}
                />
                <AssetDetailsItem
                  label="When was property bought?"
                  labelValue={
                    propertyDetails?.bought_date
                      ? moment(propertyDetails?.bought_date).format(
                          'ddd, Do MMMM YYYY'
                        )
                      : 'N/A'
                  }
                />
                <AssetDetailsItem
                  label="Payment Status:"
                  labelValue={
                    propertyDetails?.asset_type === 'instalment'
                      ? 'Ongoing'
                      : propertyDetails?.asset_type === 'owned'
                        ? 'Completed'
                        : 'Completed'
                  }
                />
              </Flex>
            </Box>
          )}
        </Box>

        {/* Cashflow details */}
        {propertyDetails?.asset_type === 'cashflow' && (
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
              Cashflow Details
            </Heading>
            {updateAssetDetails ? (
              <Box></Box>
            ) : (
              <Box>
                <Flex alignItems="center" flexWrap="wrap" rowGap="16px">
                  <AssetDetailsItem
                    label="Cashflow Source"
                    labelValue={propertyDetails?.cashflow_source || 'N/A'}
                  />
                  <AssetDetailsItem
                    label="Property Currently Occupied?"
                    labelValue={propertyDetails?.is_occupied ? 'Yes' : 'No'}
                  />
                  <AssetDetailsItem
                    label="Last Cashflow Payment"
                    labelValue={
                      propertyDetails?.last_cashflow_date
                        ? moment(propertyDetails?.last_cashflow_date).format(
                            'ddd, Do MMMM YYYY'
                          )
                        : 'Never Collected'
                    }
                  />
                  <AssetDetailsItem
                    label="Cashflow Duration"
                    labelValue={propertyDetails?.cashflow_duration || 'N/A'}
                  />
                  <AssetDetailsItem
                    label="Cashflow Amount"
                    labelValue={FormatAmount(
                      propertyDetails?.cashflow_amount || 0.0
                    )}
                  />
                  <AssetDetailsItem
                    label="Equity Ownership"
                    labelValue={`${propertyDetails?.equity_ownership || 0}%`}
                  />
                </Flex>
              </Box>
            )}
          </Box>
        )}

        {/* Payment Details */}
        {propertyDetails?.asset_type === 'instalment' && (
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
        )}

        {/* Realtor Details */}
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
            Realtor Details
          </Heading>
          {updateAssetDetails ? (
            <Box>
              <Flex
                alignItems="center"
                gap="16px"
                flexWrap={['wrap', 'nowrap']}
              >
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
                  />
                </FormControl>
                <FormControl w={['100%', '50%']}>
                  <FormLabel fontWeight={600} fontSize={15} color="brand.300">
                    Phone Number
                  </FormLabel>
                  <PhoneInput
                    // value={formik.values.phone}
                    // onChange={(value: string) =>
                    //   formik.setFieldValue('phone', value)
                    // }
                    // onBlur={() => formik.setFieldTouched('phone', true)}
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
                </FormControl>
              </Flex>
            </Box>
          ) : (
            <Box>
              <Flex alignItems="center" flexWrap="wrap" rowGap="16px">
                <AssetDetailsItem
                  label="Realtor Name"
                  labelValue="Mr Samson Ajangbadi"
                />
                <AssetDetailsItem
                  label="Phone Number"
                  labelValue="08127671686"
                />
              </Flex>
            </Box>
          )}
        </Box>

        {/* Delivery details */}
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
            Delivery Status
          </Heading>
          {updateAssetDetails ? (
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
                  >
                    <option value="completed">Completed</option>
                    <option value="completed">Pending</option>
                    <option value="completed">Ongoing</option>
                    <option value="completed">Completed</option>
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
                  >
                    <option value="completed">Completed</option>
                    <option value="completed">Pending</option>
                    <option value="completed">Ongoing</option>
                    <option value="completed">Completed</option>
                  </Select>
                </FormControl>
              </Flex>
              <Flex
                alignItems="center"
                gap="16px"
                flexWrap={['wrap', 'nowrap']}
              >
                <FormControl>
                  <FormLabel fontWeight={600} fontSize={15} color="brand.300">
                    Documentation Status
                  </FormLabel>
                  <Select
                    h="50px"
                    rounded="40px"
                    border="1px solid"
                    borderColor="border.200"
                  >
                    <option value="completed">Completed</option>
                    <option value="completed">Pending</option>
                    <option value="completed">Ongoing</option>
                    <option value="completed">Completed</option>
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
                  >
                    <option value="completed">Completed</option>
                    <option value="completed">Pending</option>
                    <option value="completed">Ongoing</option>
                    <option value="completed">Completed</option>
                  </Select>
                </FormControl>
              </Flex>
            </Box>
          ) : (
            <Box>
              <Flex alignItems="center" flexWrap="wrap" rowGap="16px">
                <AssetDetailsItem
                  label="Payment Status"
                  labelValue={
                    propertyDetails?.asset_type === 'instalment'
                      ? 'Ongoing'
                      : propertyDetails?.asset_type === 'owned'
                        ? 'Completed'
                        : 'Completed'
                  }
                />
                <AssetDetailsItem
                  label="Allocation Status"
                  labelValue={
                    propertyDetails?.allocation_status
                      ? propertyDetails?.allocation_status
                      : propertyDetails?.asset_type === 'cashflow'
                        ? 'Completed'
                        : 'N/A'
                  }
                />
                <AssetDetailsItem
                  label="Documentation Status"
                  labelValue={
                    propertyDetails?.documentation_status
                      ? propertyDetails?.documentation_status
                      : propertyDetails?.asset_type === 'cashflow'
                        ? 'Completed'
                        : 'N/A'
                  }
                />
                <AssetDetailsItem
                  label="Handover Status"
                  labelValue={
                    propertyDetails?.handover_status
                      ? propertyDetails?.handover_status
                      : propertyDetails?.asset_type === 'cashflow'
                        ? 'Completed'
                        : 'N/A'
                  }
                />
              </Flex>
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default AssetDetails;
