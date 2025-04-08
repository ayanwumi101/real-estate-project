'use client';

import { Box, Flex, Stack } from '@chakra-ui/react';
import React, { useContext, createContext } from 'react';
import FormStepper from './components/FormStepHeader';
import PropertyDetailsForm from './components/PropertyDetailsForm';
import CashflowAssetFlow from './components/CashflowAssetFlow';
import InstallmentAssetFlow from './components/InstallmentAssetFlow';
import OwnedAssetFlow from './components/OwnedAssetFlow';

export const CreateAssetContext = createContext<any>({});

const Index = () => {
  const [step, setStep] = React.useState(1);
  const [assetType, setAssetType] = React.useState('');
  const [assetData, setAssetData] = React.useState<any>({});
  return (
    <Box borderTop="1px solid #E4E4E4" py="40px" px={['20px', '55px']}>
      <Stack spacing="24px">
        <CreateAssetContext.Provider value={{ assetType, setAssetType, step, setStep, assetData, setAssetData }}>
          <Box w={['100%', '65%', '65%']} mx="auto">
            {step === 1 && (
              <PropertyDetailsForm step={step} setStep={setStep} />
            )}
            {step === 2 && (
              <Box>
                {assetType === 'cashflow' && <CashflowAssetFlow />}
                {assetType === 'owned' && <OwnedAssetFlow />}
                {assetType === 'instalment' && (
                  <InstallmentAssetFlow />
                )}
              </Box>
            )}
          </Box>
        </CreateAssetContext.Provider>
      </Stack>
    </Box>
  );
};

export default Index;
