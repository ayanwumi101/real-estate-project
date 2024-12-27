'use client'

import { Box, Flex } from '@chakra-ui/react'
import React, { createContext, useEffect, useState } from 'react'
import FormStepper from './components/FormStepper'
import PersonalDetails from './components/PersonalDetails'
import BankDetails from './components/BankDetails'
import AddressDetails from './components/AddressDetails'
import NextOfKinDetails from './components/NextOfKinDetails'
import { GetNigerianBanks } from '~/lib/api/services/profileService'
import { GetAllCountries } from '~/lib/api/services/locationService'


export const ProfileSetupContext = createContext<any>(null);


const index = () => {
  const [step, setStep] = React.useState(3);
  const [banks, setbanks] = useState<[]>([]);
  const [countries, setCountries] = useState<[]>([]);

  useEffect(() => {
    const GetBanks = async () => {
      try {
        const res = await GetNigerianBanks();
        setbanks(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    const GetCountries = async () => {
      try {
        const res = await GetAllCountries();
        setCountries(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    GetBanks();
    GetCountries();
  }, []);



  return (
    <ProfileSetupContext.Provider value={{banks, countries}}>
      <Box borderTop="1px solid #E4E4E4" py="40px" px="55px">
        <Flex alignItems="flex-start" gap="55px">
          <FormStepper step={step} />
          <Box>
            {step === 1 && <PersonalDetails step={step} setStep={setStep} />}
            {step === 2 && <AddressDetails step={step} setStep={setStep} />}
            {step === 3 && <BankDetails step={step} setStep={setStep} />}
            {step === 4 && <NextOfKinDetails step={step} setStep={setStep} />}
          </Box>
        </Flex>
      </Box>
    </ProfileSetupContext.Provider>
  );
}

export default index