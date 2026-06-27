import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Stack,
  Badge,
} from '@chakra-ui/react';
import moment from 'moment';
import { useContext, useState } from 'react';
import {
  ValuationHistoryIcon,
  ValuationDecrementIcon,
  ValuationIncrementIcon,
} from '~/lib/components/Icons/Icons';
import { AppContext } from '~/lib/layout';
import { FormatAmount } from '~/lib/utils/formatAmount';
import ValuationHistoryModal from '../Modals/ValuationHistoryModal';

const ValuationHistory = ({
  valuationHistory,
  propertyCost,
  currentAssetValue,
  boughtDate,
}: {
  valuationHistory: any[];
  propertyCost: number;
  currentAssetValue: number;
  boughtDate: string | Date;
}) => {
  const { selectedCurrency } = useContext(AppContext);
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <Box w="full" border="1px solid" borderColor="border.100" rounded="5px">
      <Box p="25px">
        <Stack spacing="24px">
          <Heading fontSize={16} fontWeight={700}>
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
                  propertyCost > currentAssetValue ? 'color.600' : 'border.300'
                }
                bg={
                  propertyCost > currentAssetValue ? 'border.400' : 'border.500'
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
          {valuationHistory?.slice(0, 4)?.map((item) => {
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
                        propertyCost > badgeStatus ? 'color.600' : 'border.300'
                      }
                      bg={
                        propertyCost > badgeStatus ? 'border.400' : 'border.500'
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
                {/* <Badge
                    p="4px 14px"
                    rounded="20px"
                    border="1px solid"
                    borderColor={
                        propertyCost > badgeStatus ? 'color.600' : 'border.300'
                    }
                    bg={propertyCost > badgeStatus ? 'border.400' : 'border.500'}
                    w="fit-content"
                    fontWeight={500}
                    fontSize={12}
                    color={propertyCost > badgeStatus ? 'color.600' : 'color.700'}
                    >
                    <Flex gap="6px" alignItems="center">
                        {propertyCost > badgeStatus ? (
                        <ValuationDecrementIcon />
                        ) : (
                        <ValuationIncrementIcon />
                        )}
                        +
                        {FormatAmount(
                        badgeStatus - propertyCost,
                        selectedCurrency?.code
                        )}
                    </Flex>
                    </Badge> */}
              </Stack>
            </Flex>
          </Box>
        </Stack>
      </Box>
      <Button
        w="full"
        bg="bg.500"
        py="10px"
        rounded="0px"
        fontSize={14}
        fontWeight={600}
        onClick={() => setOpenModal(true)}
      >
        View All
      </Button>
      <ValuationHistoryModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        boughtDate={boughtDate}
        currentAssetValue={currentAssetValue}
        propertyCost={propertyCost}
        valuationHistory={valuationHistory}
      />
    </Box>
  );
};

export default ValuationHistory;
