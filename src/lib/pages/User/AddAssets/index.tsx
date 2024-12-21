'use client'

import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import FormStepper from './components/FormStepper'
import PropertyDetailsForm from './components/PropertyDetailsForm'
import PaymentPlan from './components/PaymentPlan'
import DeliveryStatusForm from './components/DeliveryStatusForm'
import CashflowDetails from './components/CashflowDetails'




const index = () => {
  const [step, setStep] = React.useState(3);
  return (
    <Box borderTop="1px solid #E4E4E4" py="40px" px="55px">
      <Flex alignItems="flex-start" gap="55px">
        <FormStepper step={step} />
        <Box>
          {step === 1 && <PropertyDetailsForm step={step} setStep={setStep} />}
          {step === 2 && <DeliveryStatusForm step={step} setStep={setStep} />}
          {step === 3 && <PaymentPlan step={step} setStep={setStep} />}
          {step === 4 && <CashflowDetails step={step} setStep={setStep} />}
        </Box>
      </Flex>
    </Box>
  );
}

export default index