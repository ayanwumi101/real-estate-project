'use client'

import React from 'react';
import {
 Flex,
  Box,
  Stack, Text
} from '@chakra-ui/react';
import { CashflowDetailsIcon, PropertyDetailsIcon, NextOfKinIcon, PersonalDetailsIcon, AddressDetailsIcon } from '~/lib/components/Icons/Icons';


const StepDivider = () => {
  return <Box borderRight="1.5px dashed #ABABFF" h="65px" mr='2'></Box>;
}



const SingleStepItem = ({Icon, label, isActive}:{Icon: any, label: string, isActive: boolean}) => {
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
          bg={isActive ? "#000080" : 'none'}
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
}


const FormStepper = ({step}:{step: number}) => {
  return (
    <Box as="section" w="180px">
      <Stack alignItems='flex-end' justifyContent='flex-end'>
        <SingleStepItem label='Personal Details' Icon={PersonalDetailsIcon} isActive={step > 0 ? true : false} />
        <StepDivider />
        <SingleStepItem label='Address Details' Icon={AddressDetailsIcon} isActive={step > 1 ? true : false} />
        <StepDivider />
        <SingleStepItem label='Bank Details' Icon={CashflowDetailsIcon} isActive={step > 2 ? true : false} />
        <StepDivider />
        <SingleStepItem label='Next of Kin' Icon={NextOfKinIcon} isActive={step > 3 ? true : false} />
      </Stack>
    </Box>
  );
};

export default FormStepper;
