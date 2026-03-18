'use client';

import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  Flex,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import {
  LocationIcon,
  InvestIcon,
  AddIcon,
  NextDueRemittanceIcon,
} from '~/lib/components/Icons/Icons';
import { HiPlus } from 'react-icons/hi2';
import { PortfolioStatCard } from '~/lib/components/Cards';
import FundWalletFlow from '~/lib/components/FundWalletFlow';
import Link from 'next/link';
import { FormatAmount } from '~/lib/utils/formatAmount';
import next from 'next';
import moment from 'moment';
import { getAssetWithEarliestPaymentDue } from '~/lib/utils/findClosestDueAsset';



interface IProps { 
  totalCashflowAsset?: number;
  cashflowAssetsInNaira?: string;
  nextDueRemittance?: {
    date: string;
    property: string;
  };
}


const RemittanceStatCards = ({ totalCashflowAsset, cashflowAssetsInNaira, nextDueRemittance }: IProps) => {
  
  return (
    <Box py="40px" px="20px" overflow="auto">
      <Flex alignItems="center" gap="16px" pb="3" overflow="auto" w="100%">
        <PortfolioStatCard
          label="Total Cashflow Asset"
          balance={totalCashflowAsset || 0}
          showHideIcon={false}
        />
        <PortfolioStatCard
          label="Total Cashflow in Naira"
          balance={FormatAmount(Number(cashflowAssetsInNaira) || 0)}
          showHideIcon={true}
        />
        <Box
          minW={['300px', '350px']}
          borderRadius="5px"
          py="32px"
          px="20px"
          border="1px solid #E4E4E4"
          // boxShadow="md"
          h="130px"
        >
          <Stack spacing="16px">
            <Text color="#ABABFF" fontWeight={500}>
              Next Due Remittance
            </Text>
            <Flex alignItems="center" gap="16px">
              <NextDueRemittanceIcon />
              <Stack spacing="5px">
                <Heading fontSize={18} fontWeight={500} color="brand.300">
                  {nextDueRemittance?.date
                    ? moment(nextDueRemittance?.date).format(
                        'ddd, Do MMMM YYYY'
                      )
                    : 'N/A'}
                </Heading>
                <Text color="brand.300" fontSize={14} fontWeight={500}>
                  {nextDueRemittance?.property}
                </Text>
              </Stack>
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

const RemitttanceHeading = () => {
  return (
    <Box py="30px" px="20px" borderBottom="1px solid #E4E4E4">
      <Flex alignItems="center" justifyContent="space-between" rowGap={['20px', 0]} flexWrap={['wrap', 'nowrap']}>
        <Stack spacing="10px">
          <Heading fontSize={24} fontWeight={500} color="#222222">
            Remittance
          </Heading>
          <Text color="brand.300">
            All your cashflow properties with remittance
          </Text>
        </Stack>

        <Box>
          <Flex alignItems="center" gap="12px">
            <Link href="/user/my-assets/add-assets">
              <Button
                bg="#000080"
                fontSize={14}
                color="#ffffff"
                fontWeight={500}
                _hover={{ bg: 'brand.100' }}
                // onClick={() => setShowFundWalletModal(true)}
              >
                <Flex alignItems="center" gap="10px">
                  <Text>Add cashflow asset</Text>
                  <HiPlus color="white" fontSize={20} fontWeight={700} />
                </Flex>
              </Button>
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

const Header = ({assets}: {assets: any[]}) => {
  const [showFundWalletModal, setShowFundWalletModal] = React.useState(false);
  const totalAssetsInNaira = assets?.reduce((acc, asset) => acc + Number(asset?.cashflow_amount), 0);
  const closestDueAsset = getAssetWithEarliestPaymentDue(assets || []);

  const nextDueRemittance = {
    date: closestDueAsset?.cashflow_payment_due,
    property: closestDueAsset?.property_name
  }
  
  
  return (
    <Box borderY="1px solid #E4E4E4" overflow='auto' w='100%'>
      <RemitttanceHeading />
      <RemittanceStatCards totalCashflowAsset={assets?.length} cashflowAssetsInNaira={totalAssetsInNaira} nextDueRemittance={nextDueRemittance} />
    </Box>
  );
};

export default Header;
