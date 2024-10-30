'use client'

import {
  Box,
  Heading,
  Text,
  Image,
  Stack,
  Flex,
  Button,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';
import React from 'react';
import { SingleApartmentCard } from '~/lib/components/Cards';
import { CautionIcon, InvestIcon } from '~/lib/components/Icons/Icons';
import PurchasePropertyFlow from './PurchasePropertyFlow';




const SingleDetail = ({
  label,
  description,
}: {
  label: string;
  description: string;
}) => {
  return (
    <Box>
      <Stack spacing="6px">
        <Text color="#ABABFF" fontWeight={600}>
          {label}
        </Text>
        <Text color="#222222" fontSize={18} fontWeight={500}>
          {description}
        </Text>
      </Stack>
    </Box>
  );
};



const OtherDetails = () => {
  return (
    <Box w="38%">
      <Stack spacing="30px">
        <SingleDetail
          label="Security Details:"
          description="First mortgage on the property."
        />
        <SingleDetail label="Payout Type:" description="Quarterly Dividends" />
        <SingleDetail label="Expected Returns:" description="8% in 4 months" />
        <SingleDetail label="Start Date:" description="1st of July 2024" />
        <SingleDetail
          label="Repayment Plan:"
          description="Equity-based, with expected capital appreciation upon sale or refinance."
        />
        <SingleDetail
          label="Investment Type:"
          description=" Fractional Ownership"
        />
        <Box bg="#EDEDFF" pt='12px' pb='10px' px='10px' borderRadius='50px'>
          <Flex gap="2px" alignItems="flex-start">
            {/* <CautionIcon /> */}
            <Image src='/assets/images/info.png' w='28px' h='28px' objectFit='cover' />
            <Text mt='1' color="#000080" fontWeight={600} fontSize={13}>
              Shares will be liquidated into portfolio balance
            </Text>
          </Flex>
        </Box>
        <Box border="1px solid #E4E4E4" p="32px" borderRadius="5px" w="100%">
          <Stack spacing="16px">
            <CircularProgress
              value={65}
              size="186px"
              capIsRound={true}
              color="#4040A0"
              mx="auto"
            >
              <CircularProgressLabel
                color="#4040A0"
                fontSize={24}
                fontWeight={500}
                // textAlign='center'
              >
                65%
              </CircularProgressLabel>
            </CircularProgress>
            <Text color="#8295AA" textAlign="center" fontSize={14}>
              65% of shares have been purchased
            </Text>
            <Heading
              textAlign="center"
              fontWeight={600}
              fontSize={18}
              color="#222222"
            >
              1,100 shares available
            </Heading>
            <Button
              bg="#000080"
              color="#ffffff"
              fontWeight={500}
              fontSize={15}
              w="165px"
              mx="auto"
            >
              <Flex alignItems="center" gap="8px">
                <Text>Invest now</Text>
                <InvestIcon />
              </Flex>
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};



const MainDetails = ({openPurchaseModal, setOpenPurchaseModal}: { openPurchaseModal: boolean, setOpenPurchaseModal: (value: boolean) => void; }) => {
  return (
    <Box w="62%">
      <Stack spacing="30px">
        <Text color="#222222" fontSize={18} fontWeight={500}>
          A modern high-rise located in the heart of Victoria Island, Lagos,
          offering luxurious amenities and stunning city views. Ideal for urban
          professionals.
        </Text>
        <Box>
          <Flex alignItems="center" justifyContent="space-between">
            <Image
              src="/assets/images/house-1.png"
              w="190px"
              h="160px"
              objectFit="cover"
            />
            <Image
              src="/assets/images/house-1.png"
              w="190px"
              h="160px"
              objectFit="cover"
            />
            <Image
              src="/assets/images/house-1.png"
              w="190px"
              h="160px"
              objectFit="cover"
            />
          </Flex>
        </Box>
        <Box>
          <Stack>
            <Box mb="16px">
              <Text fontWeight={600} color="#ABABFF" mb="10px">
                Units
              </Text>
              <Text color="#222222" fontWeight={500}>
                Contains 4 units
              </Text>
            </Box>
            <SingleApartmentCard
              title="Mini Flat – ₦15M (150,000M/share)"
              description="1 sitting room, 1 bedroom, one toilet and bathroom, kitchen"
              buyProperty={() => setOpenPurchaseModal(true)}
            />
            <SingleApartmentCard
              title="Mini Flat – ₦15M (150,000M/share)"
              description="1 sitting room, 1 bedroom, one toilet and bathroom, kitchen"
              buyProperty={() => setOpenPurchaseModal(true)}
            />
            <SingleApartmentCard
              title="Mini Flat – ₦15M (150,000M/share)"
              description="1 sitting room, 1 bedroom, one toilet and bathroom, kitchen"
              buyProperty={() => setOpenPurchaseModal(true)}
            />
            <SingleApartmentCard
              title="Mini Flat – ₦15M (150,000M/share)"
              description="1 sitting room, 1 bedroom, one toilet and bathroom, kitchen"
              buyProperty={() => setOpenPurchaseModal(true)}
            />
            <SingleApartmentCard
              title="Mini Flat – ₦15M (150,000M/share)"
              description="1 sitting room, 1 bedroom, one toilet and bathroom, kitchen"
              buyProperty={() => setOpenPurchaseModal(true)}
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

const PropertyDetails = () => {
  const [openPurchaseModal, setOpenPurchaseModal] = React.useState(false);
  return (
    <Box py="30px" px="40px" borderBottom="1px solid #E4E4E4">
      <Flex gap="40px">
        <MainDetails openPurchaseModal={openPurchaseModal} setOpenPurchaseModal={setOpenPurchaseModal} />
        <OtherDetails />
      </Flex>
      <PurchasePropertyFlow
        isOpen={openPurchaseModal}
        onClose={() => setOpenPurchaseModal(false)}
      />
    </Box>
  );
};

export default PropertyDetails;
