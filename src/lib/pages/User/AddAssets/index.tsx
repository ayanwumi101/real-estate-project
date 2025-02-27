'use client';

import { Box, Flex, Stack } from '@chakra-ui/react';
import React, { useContext, createContext } from 'react';
import FormStepper from './components/FormStepHeader';
import PropertyDetailsForm from './components/PropertyDetailsForm';
import CashflowAssetFlow from './components/CashflowAssetFlow';
import InstallmentAssetFlow from './components/InstallmentAssetFlow';
import OwnedAssetFlow from './components/OwnedAssetFlow';

export const CreateAssetContext = createContext<any>({});

const index = () => {
  const [step, setStep] = React.useState(1);
  const [assetData, setAssetData] = React.useState({
    propertyName: '',
    propertyType: '',
    propertySize: '',
    propertyAddress: {
      houseNumber: '',
      streetName: '',
      city: '',
      state: '',
      lga: '',
    },
    realtorDetails: {
      name: '',
    },
    phoneNumber: '',
    assetType: '',
  });
  return (
    <Box borderTop="1px solid #E4E4E4" py="40px" px={['20px', '55px']}>
      <Stack spacing="24px">
        <CreateAssetContext.Provider value={{ assetData, setAssetData, step, setStep }}>
          <Box w={['100%', '65%', '65%']} mx="auto">
            {step === 1 && (
              <PropertyDetailsForm step={step} setStep={setStep} />
            )}
            {step === 2 && (
              <Box>
                {assetData?.assetType === 'cashflow' && <CashflowAssetFlow />}
                {assetData?.assetType === 'owned' && <OwnedAssetFlow />}
                {assetData?.assetType === 'instalment' && (
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

export default index;
