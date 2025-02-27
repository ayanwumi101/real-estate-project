'use client';

import React, { Fragment } from 'react';
import { Flex, Box, Stack, Text, Heading } from '@chakra-ui/react';



// const StepDivider = () => {
//   return <Box borderRight="1.5px dashed #ABABFF" h="65px" mr="2"></Box>;
// };

// const SingleStepItem = ({
//   Icon,
//   label,
//   isActive,
// }: {
//   Icon: any;
//   label: string;
//   isActive: boolean;
// }) => {
//   return (
//     <Box>
//       <Flex alignItems="center" gap="12px">
//         <Text
//           fontWeight={600}
//           fontSize={16}
//           color={isActive ? '#000080' : '#ABABFF'}
//         >
//           {label}
//         </Text>
//         <Box
//           w="40px"
//           h="40px"
//           borderRadius="50%"
//           bg={isActive ? '#000080' : 'none'}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           border="1px solid"
//           borderColor={isActive ? '#000080' : '#ABABFF'}
//         >
//           <Icon isActive={isActive} />
//         </Box>
//       </Flex>
//     </Box>
//   );
// };




const FormStepHeader = ({ currentStep, stepsLength, stepTitle }: { currentStep: number, stepsLength: number, stepTitle: string }) => {
  return (
    <Stack spacing='6px'>
      <Text color='brand.900' fontWeight={600}>Step {currentStep}/{stepsLength}</Text>
      <Heading color='brand.100' fontSize={24}>{stepTitle}</Heading>
    </Stack>
  );
};

export default FormStepHeader;
