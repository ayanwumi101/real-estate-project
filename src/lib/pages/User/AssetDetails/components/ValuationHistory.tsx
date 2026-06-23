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
import { useContext } from 'react';
import {
  ValuationHistoryIcon,
  ValuationDecrementIcon,
  ValuationIncrementIcon,
} from '~/lib/components/Icons/Icons';
import { AppContext } from '~/lib/layout';
import { FormatAmount } from '~/lib/utils/formatAmount';

const ValuationHistory = ({
  valuationHistory,
  propertyCost,
}: {
  valuationHistory: any[];
  propertyCost: number;
}) => {
  const { selectedCurrency } = useContext(AppContext);

  return (
    <Box w="full" border="1px solid" borderColor="border.100" rounded="5px">
      <Box p="25px">
        <Stack spacing="24px">
          <Heading fontSize={16} fontWeight={700}>
            Valuation History
          </Heading>
          {valuationHistory?.map((item) => {
            const badgeStatus =
              selectedCurrency?.code === 'NGN'
                ? Number(item?.value)
                : item?.value?.display_value;
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
                      borderColor={
                        propertyCost > badgeStatus ? 'color.600' : 'border.300'
                      }
                      bg={
                        propertyCost > badgeStatus ? 'border.400' : 'border.500'
                      }
                      w="fit-content"
                      fontWeight={500}
                      fontSize={12}
                      color={
                        propertyCost > badgeStatus ? 'color.600' : 'color.700'
                      }
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
                    </Badge>
                  </Stack>
                </Flex>
              </Box>
            );
          })}
        </Stack>
      </Box>
      <Button
        w="full"
        bg="bg.500"
        py="10px"
        rounded="0px"
        fontSize={14}
        fontWeight={600}
      >
        View All
      </Button>
    </Box>
  );
};

export default ValuationHistory;
