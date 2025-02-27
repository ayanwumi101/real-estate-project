import React from 'react';
import FormStepHeader from '../FormStepHeader';
import { Box, Stack } from '@chakra-ui/react';
import AddNextOfKin from './components/AddNextOfKin';
import DeliveryStatusForm from './components/DeliveryStatusForm';

const index = () => {
  const [step, setStep] = React.useState(1);
  const stepTitles = ['Delivery Status', 'Next of Kin'];
  return (
    <Box>
      <Stack spacing="24px">
        <FormStepHeader
          stepTitle={stepTitles[step - 1]}
          currentStep={step}
          stepsLength={stepTitles?.length}
        />
        <Box>
          {step === 1 && <DeliveryStatusForm step={step} setStep={setStep} />}
          {step === 2 && <AddNextOfKin step={step} setStep={setStep} />}
        </Box>
      </Stack>
    </Box>
  );
};

export default index;
