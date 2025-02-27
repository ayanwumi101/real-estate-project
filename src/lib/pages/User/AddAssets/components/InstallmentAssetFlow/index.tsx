import React from 'react';
import FormStepHeader from '../FormStepHeader';
import { Box, Stack } from '@chakra-ui/react';
import AddNextOfKin from './components/AddNextOfKin';
import DeliveryStatusForm from './components/DeliveryStatusForm';
import PaymentPlan from './components/PaymentPlan';

const index = () => {
  const [step, setStep] = React.useState(1);
  const stepTitles = ['Delivery Status', 'Payment Plan', 'Next of Kin'];
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
          {step === 2 && <PaymentPlan step={step} setStep={setStep} />}
          {step === 3 && <AddNextOfKin step={step} setStep={setStep} />}
        </Box>
      </Stack>
    </Box>
  );
};

export default index;
