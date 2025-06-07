'use client';

import React, { Fragment } from 'react';
import { Flex, Box, Stack, Text, useMediaQuery } from '@chakra-ui/react';
import {
  CashflowDetailsIcon,
  PropertyDetailsIcon,
  NextOfKinIcon,
  PersonalDetailsIcon,
  AddressDetailsIcon,
} from '~/lib/components/Icons/Icons';
import { HiOutlineChevronDoubleRight } from 'react-icons/hi';

const StepDivider = ({ isActive }: { isActive: boolean }) => {
  return <Box w={['30px',"70px"]} h="1.5px" bg={isActive ? '#000080' : 'border.200'} />;
};

const SingleStepItem = ({
  step,
  label,
  isActive,
}: {
  step: number;
  label: string;
  isActive: boolean;
}) => {
  return (
    <Box>
      <Stack alignItems="center" gap="12px" textAlign='center'>
        <Box
          w={['25px',"30px"]}
          h={['25px',"30px"]}
          borderRadius="50%"
          bg={isActive ? '#000080' : 'border.200'}
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="1px solid"
          fontWeight={600}
          color="#FFFFFF"
        >
          {step}
        </Box>
        <Text
          fontWeight={600}
          fontSize={[14,16]}
          color={isActive ? '#000080' : 'border.200'}
        >
          {label}
        </Text>
      </Stack>
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
    <Box as="section" w="auto">
      <Flex alignItems="center" justifyContent="cemter" gap={['7px', 0]} mx='auto' overflow='auto'>
        <SingleStepItem
          label="Personal Details"
          step={1}
          isActive={step > 0 ? true : false}
        />
        <StepDivider isActive={step > 0 ? true : false} />
        <SingleStepItem
          label="Address Details"
          step={2}
          isActive={step > 1 ? true : false}
        />
        <StepDivider isActive={step > 1 ? true : false} />
        <SingleStepItem
          label="Bank Details"
          step={3}
          isActive={step > 2 ? true : false}
        />
        <StepDivider isActive={step > 2 ? true : false} />
        <SingleStepItem
          label="Next of Kin"
          step={4}
          isActive={step > 3 ? true : false}
        />
      </Flex>
    </Box>
  );
};

export default FormStepper;
