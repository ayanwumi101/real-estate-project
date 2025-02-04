'use client';

import { Box, Flex } from '@chakra-ui/react';
import React, { useContext, createContext } from 'react';
import FormStepper from './components/FormStepper';
import PropertyDetailsForm from './components/PropertyDetailsForm';
import PaymentPlan from './components/PaymentPlan';
import DeliveryStatusForm from './components/DeliveryStatusForm';
import CashflowDetails from './components/CashflowDetails';
import AssetImages from './components/AssetImages';
import AddNextOfKin from './components/AddNextOfKin';


export const CreateAssetContext = createContext<any>({});

const index = () => {
  const [step, setStep] = React.useState(1);
  const [assetData, setAssetData] = React.useState({});
  return (
    <Box borderTop="1px solid #E4E4E4" py="40px" px={['20px', '55px']}>
      <Flex
        alignItems="flex-start"
        gap="55px"
        flexDir={['column', 'column', 'row']}
      >
        <FormStepper step={step} />
        <CreateAssetContext.Provider value={{ assetData, setAssetData }}>
          <Box w={['100%', '80%', '80%']}>
            {step === 1 && (
              <PropertyDetailsForm step={step} setStep={setStep} />
            )}
            {step === 2 && <DeliveryStatusForm step={step} setStep={setStep} />}
            {step === 3 && <PaymentPlan step={step} setStep={setStep} />}
            {step === 4 && <CashflowDetails step={step} setStep={setStep} />}
            {step === 5 && <AssetImages step={step} setStep={setStep} />}
            {step === 6 && <AddNextOfKin step={step} setStep={setStep} />}
          </Box>
        </CreateAssetContext.Provider>
      </Flex>
    </Box>
  );
};

export default index;
