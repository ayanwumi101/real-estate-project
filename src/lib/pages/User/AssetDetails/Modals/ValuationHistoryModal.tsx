import {
  Box,
  Stack,
  Heading,
  Text,
  Badge,
  Flex,
  Button,
} from '@chakra-ui/react';
import moment from 'moment';
import React, { useContext } from 'react';
import {
  ValuationHistoryIcon,
  ValuationDecrementIcon,
  ValuationIncrementIcon,
} from '~/lib/components/Icons/Icons';
import CustomModal from '~/lib/components/Modal';
import { AppContext } from '~/lib/layout';
import { FormatAmount } from '~/lib/utils/formatAmount';

const ValuationHistoryModal = ({
  isOpen,
  onClose,
  valuationHistory,
  propertyCost,
  currentAssetValue,
  boughtDate,
}: {
  isOpen: boolean;
  onClose: () => void;
  valuationHistory: any[];
  propertyCost: number;
  currentAssetValue: number;
  boughtDate: string | Date;
}) => {
  const { selectedCurrency } = useContext(AppContext);
  return (
    <CustomModal size="lg" isOpen={isOpen} onClose={onClose}>
      <Box w="full" border="1px solid" borderColor="border.100" rounded="5px">
        <Box p="25px">
          <Stack spacing="24px">
            <Heading fontSize={22} fontWeight={700}>
              Valuation History
            </Heading>
            <Box
              rounded="10px"
              border="1px solid"
              borderColor="border.100"
              p="20px"
              bg="brand.700"
            >
              <Stack spacing="8px">
                <Text fontWeight={600} color="brand.600">
                  Current Asset Value
                </Text>
                <Heading fontSize={32}>
                  {' '}
                  {FormatAmount(currentAssetValue || 0, selectedCurrency?.code)}
                </Heading>
                <Badge
                  p="4px 14px"
                  rounded="20px"
                  border="1px solid"
                  w="fit-content"
                  fontWeight={500}
                  fontSize={12}
                  color={
                    propertyCost > currentAssetValue ? 'color.600' : 'color.700'
                  }
                  borderColor={
                    propertyCost > currentAssetValue
                      ? 'color.600'
                      : 'border.300'
                  }
                  bg={
                    propertyCost > currentAssetValue
                      ? 'border.400'
                      : 'border.500'
                  }
                >
                  <Flex gap="6px" alignItems="center">
                    {propertyCost > currentAssetValue ? (
                      <ValuationDecrementIcon />
                    ) : (
                      <ValuationIncrementIcon />
                    )}
                    {currentAssetValue > propertyCost ? '+' : '-'}
                    {FormatAmount(
                      Math.abs(currentAssetValue - propertyCost || 0),
                      selectedCurrency?.code
                    )}
                  </Flex>
                </Badge>
              </Stack>
            </Box>

            {valuationHistory?.map((item) => {
              const badgeStatus =
                selectedCurrency?.code === 'NGN'
                  ? Number(item?.value || 0)
                  : item?.value?.display_value || 0;
              return (
                <Box key={item?.id}>
                  <Flex gap="10px">
                    <ValuationHistoryIcon />
                    <Stack spacing="8px">
                      <Text fontWeight={500} fontSize={15}>
                        Asset value as at{' '}
                        {moment(item?.value_date).format('MMMM D, YYYY')}
                      </Text>
                      <Heading fontWeight={700} fontSize={15.5}>
                        {FormatAmount(badgeStatus, selectedCurrency?.code)}
                      </Heading>
                      <Badge
                        p="4px 14px"
                        rounded="20px"
                        border="1px solid"
                        w="fit-content"
                        fontWeight={500}
                        fontSize={12}
                        color={
                          propertyCost > badgeStatus ? 'color.600' : 'color.700'
                        }
                        borderColor={
                          propertyCost > badgeStatus
                            ? 'color.600'
                            : 'border.300'
                        }
                        bg={
                          propertyCost > badgeStatus
                            ? 'border.400'
                            : 'border.500'
                        }
                      >
                        <Flex gap="6px" alignItems="center">
                          {propertyCost > badgeStatus ? (
                            <ValuationDecrementIcon />
                          ) : (
                            <ValuationIncrementIcon />
                          )}
                          {badgeStatus > propertyCost ? '+' : '-'}
                          {FormatAmount(
                            Math.abs(badgeStatus - propertyCost),
                            selectedCurrency?.code
                          )}
                        </Flex>
                      </Badge>
                    </Stack>
                  </Flex>
                </Box>
              );
            })}
            <Box>
              <Flex gap="10px">
                <ValuationHistoryIcon />
                <Stack spacing="8px">
                  <Text fontWeight={500} fontSize={15}>
                    Purchase value as at{' '}
                    {moment(boughtDate).format('MMMM D, YYYY')}
                  </Text>
                  <Heading fontWeight={700} fontSize={15.5}>
                    {FormatAmount(propertyCost || 0, selectedCurrency?.code)}
                  </Heading>
                </Stack>
              </Flex>
            </Box>
            <Button
              onClick={onClose}
              bg="brand.100"
              color="brand.200"
              _hover={{ bg: 'brand.100', color: 'brand.200' }}
            >
              Close
            </Button>
          </Stack>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default ValuationHistoryModal;
