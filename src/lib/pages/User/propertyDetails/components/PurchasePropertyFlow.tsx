'use client';

import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Flex,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Select,
  InputLeftAddon,
} from '@chakra-ui/react';
import React, { createContext, useContext, useState } from 'react';
import { CopyIcon, TagIcon } from '~/lib/components/Icons/Icons';
import Loader from '~/lib/components/Loader/Loader';
import CustomModal from '~/lib/components/Modal';
import BuyPropertyFlow from './BuyPropertyFlow';
import SellPropertyFlow from './SellPropertyFlow';
export const PropertyContext = createContext({});



const BuyOrSellProperty = () => {
  const [activeTab, setActiveTab] = React.useState('buy');
  const { subStep, setSubStep, onClose, sellPropertyStep } = useContext<any>(PropertyContext);
  const tabs = ['buy', 'sell'];
  return (
    <Box overflow="auto">
      <Box mb="20px">
        {sellPropertyStep < 2 && subStep < 2 && (
          <Flex borderBottom="1px solid #D8D8FF">
            {tabs.map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                bg="none"
                color={activeTab === tab ? '#000080' : '#ABABFF'}
                fontWeight={500}
                fontSize={24}
                w="50%"
                borderBottom={activeTab === tab ? '1px solid #000080' : 'none'}
                borderRadius="0"
                textTransform="uppercase"
              >
                {tab}
              </Button>
            ))}
          </Flex>
        )}
      </Box>
      {activeTab === 'buy' ? (
        <BuyPropertyFlow />
      ) : (
        <SellPropertyFlow />
      )}
    </Box>
  );
};

const PropertyDetailsCard = ({
  step,
  setStep,
  onClose,
}: {
  step: number;
  setStep: (value: number) => void;
  onClose: () => void;
}) => {
  return (
    <Box>
      <Stack spacing="10px">
        <Box mb="20px">
          <Heading
            fontWeight={600}
            color="#4040A0"
            fontSize={24}
            borderBottom="1px solid #4040A0"
            pb="10px"
            mb="15px"
          >
            Mini Flat – ₦15M (150,000M/share)
          </Heading>
          <Text color="#222222" fontWeight={500} mb="10px">
            1 sitting room, 1 bedroom, one toilet and bathroom, kitchen
          </Text>
          <Text color="#222222" fontWeight={500} mb="10px">
            To invest now, enter the number or amount of shares you wish to buy{' '}
          </Text>
        </Box>
        <Flex alignItems="center" gap="8px" justifyContent="flex-end">
          <Button
            onClick={onClose}
            bg="#EDEDFF"
            w="110px"
            color="#4040A0"
            fontWeight={600}
          >
            Close
          </Button>
          <Button
            bg="#000080"
            color="#ffffff"
            fontWeight={600}
            w="160px"
            onClick={() => setStep(step + 1)}
          >
            Buy now
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};



const PurchasePropertyFlow = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = React.useState(1);
  const [subStep, setSubStep] = React.useState(1);
  const [sellPropertyStep, setSellPropertyStep] = useState<number>(1);
  return (
    <PropertyContext.Provider value={{ subStep, setSubStep, onClose, sellPropertyStep, setSellPropertyStep }}>
      <CustomModal isOpen={isOpen} onClose={onClose}>
        <Box>
          {step === 1 && (
            <PropertyDetailsCard
              onClose={onClose}
              setStep={setStep}
              step={step}
            />
          )}
          {step === 2 && (
            <BuyOrSellProperty
            />
          )}
        </Box>
      </CustomModal>
    </PropertyContext.Provider>
  );
};

export default PurchasePropertyFlow;
