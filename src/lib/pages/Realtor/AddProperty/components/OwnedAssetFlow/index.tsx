import React from 'react';
import FormStepHeader from '../FormStepHeader';
import { Box, Stack } from '@chakra-ui/react';
import DeliveryStatusForm from './components/DeliveryStatusForm';
import PropertyDetailsForm from './components/PropertyDetailsForm';


const index = () => {
  const [step, setStep] = React.useState(2);
  const stepTitles = [
    {
      title: 'Property Details',
      description: 'Get started with adding your property to asset by filling the forms',
    },
    { title: 'Delivery Status' },
    { title: 'Next of Kin' },
  ];
  return (
    <Box>
      <Stack spacing="30px">
        <FormStepHeader
          stepTitle={stepTitles[step - 1].title}
          description={stepTitles[step - 1].description ?? ''}
          currentStep={step}
          stepsLength={stepTitles?.length}
        />
        <Box>
          {step === 1 && (
            <PropertyDetailsForm step={step} setStep={setStep} />
          )}
          {step === 2 && <DeliveryStatusForm step={step} setStep={setStep} />}
        </Box>
      </Stack>
    </Box>
  );
};

export default index;
