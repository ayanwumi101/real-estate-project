'use client';

import React, { Fragment } from 'react';
import { Flex, Box, Stack, Text, useMediaQuery } from '@chakra-ui/react';
import {
  CashflowDetailsIcon,
  PaymentPlanIcon,
  DeliveryStatusIcon,
  PropertyDetailsIcon,
} from '~/lib/components/Icons/Icons';
import { HiOutlineChevronDoubleRight } from 'react-icons/hi';

const StepDivider = () => {
  return <Box borderRight="1.5px dashed #ABABFF" h="65px" mr="2"></Box>;
};

const SingleStepItem = ({
  Icon,
  label,
  isActive,
}: {
  Icon: any;
  label: string;
  isActive: boolean;
}) => {
  return (
    <Box>
      <Flex alignItems="center" gap="12px">
        <Text
          fontWeight={600}
          fontSize={16}
          color={isActive ? '#000080' : '#ABABFF'}
        >
          {label}
        </Text>
        <Box
          w="40px"
          h="40px"
          borderRadius="50%"
          bg={isActive ? '#000080' : 'none'}
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="1px solid"
          borderColor={isActive ? '#000080' : '#ABABFF'}
        >
          <Icon isActive={isActive} />
        </Box>
      </Flex>
    </Box>
  );
};

const MobileStepItem = ({
  label,
  isActive,
}: {
  label: string;
  isActive: boolean;
}) => {
  return (
    <Box>
      <Text
        fontWeight={isActive ? 600 : 500}
        fontSize={15}
        color={isActive ? '#000080' : '#ABABFF'}
      >
        {label}
      </Text>
    </Box>
  );
};

const FormStepper = ({ step }: { step: number }) => {
  const [isMobile] = useMediaQuery('(max-width: 830px)');
  return (
    <Fragment>
      {isMobile ? (
        <Box>
          <Stack
            alignItems="center"
            spacing="10px"
            direction="row"
            flexWrap="wrap"
          >
            <MobileStepItem
              label="Property Details"
              isActive={step > 0 ? true : false}
            />
            <HiOutlineChevronDoubleRight color="#000080" />
            <MobileStepItem
              label="Delivery Status"
              isActive={step > 1 ? true : false}
            />
            <HiOutlineChevronDoubleRight color="#000080" />
            <MobileStepItem
              label="Payment Plan"
              isActive={step > 2 ? true : false}
            />
            <HiOutlineChevronDoubleRight color="#000080" />
            <MobileStepItem
              label="Cashflow Details"
              isActive={step > 3 ? true : false}
            />
            <HiOutlineChevronDoubleRight color="#000080" />
            <MobileStepItem
              label="Asset Images"
              isActive={step > 4 ? true : false}
            />
          </Stack>
        </Box>
      ) : (
        <Box as="section" w="180px">
          <Stack alignItems="flex-end" justifyContent="flex-end">
            <SingleStepItem
              label="Property Details"
              Icon={PropertyDetailsIcon}
              isActive={step > 0 ? true : false}
            />
            <StepDivider />
            <SingleStepItem
              label="Delivery Status"
              Icon={DeliveryStatusIcon}
              isActive={step > 1 ? true : false}
            />
            <StepDivider />
            <SingleStepItem
              label="Payment Plan"
              Icon={PaymentPlanIcon}
              isActive={step > 2 ? true : false}
            />
            <StepDivider />
            <SingleStepItem
              label="Cashflow Details"
              Icon={CashflowDetailsIcon}
              isActive={step > 3 ? true : false}
            />
            <StepDivider />
            <SingleStepItem
              label="Asset Images"
              Icon={CashflowDetailsIcon}
              isActive={step > 4 ? true : false}
            />
          </Stack>
        </Box>
      )}
    </Fragment>
  );
};

export default FormStepper;
