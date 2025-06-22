'use client';

import { Box, Stack, Button, Divider } from '@chakra-ui/react';
import React, { createContext, useEffect, useState } from 'react';
import FormStepper from './components/FormStepper';
import PersonalDetails from './components/PersonalDetails';
import BankDetails from './components/BankDetails';
import AddressDetails from './components/AddressDetails';
import NextOfKinDetails from './components/NextOfKinDetails';
import { GetNigerianBanks } from '~/lib/api/services/profileService';
import { GetAllCountries } from '~/lib/api/services/locationService';
import Link from 'next/link';

export const ProfileSetupContext = createContext<any>(null);

const index = () => {
  const [step, setStep] = React.useState(1);
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
    };

    const GetCountries = async () => {
      try {
        const res = await GetAllCountries();
        setCountries(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    GetBanks();
    GetCountries();
  }, []);

  return (
    <ProfileSetupContext.Provider value={{ banks, countries }}>
      <Box py="40px" px={['16px', '0px']} maxW="750px" mx="auto">
        <Stack alignItems="center" spacing="40px">
          <FormStepper step={step} />
          <Divider />
          <Box w={['100%', '80%', '80%']}>
            {step === 1 && <PersonalDetails step={step} setStep={setStep} />}
            {step === 2 && <AddressDetails step={step} setStep={setStep} />}
            {/* {step === 3 && <BankDetails step={step} setStep={setStep} />} */}
            {step === 3 && <NextOfKinDetails step={step} setStep={setStep} />}
          </Box>
        </Stack>
      </Box>
    </ProfileSetupContext.Provider>
  );
};

export default index;
