import { Button, Flex, Heading, Text, Stack, Box } from '@chakra-ui/react';
import React from 'react';
import { CloseIcon, AiGeneratedIcon } from '~/lib/components/Icons/Icons';
import CustomModal from '~/lib/components/Modal';
import useNavigate from '~/lib/utils/useNavigate';

const SuccessModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <CustomModal size="xl" isOpen={isOpen} onClose={onClose}>
      <Stack spacing="16px" p="15px">
        <Flex justifyContent="space-between">
          <Heading fontSize={[17.5, 23]}>
            Success! Your service request has been received.
          </Heading>
          <Button variant="ghost" p="0" onClick={onClose}>
            <CloseIcon />
          </Button>
        </Flex>
        <Text letterSpacing="0.3px" fontSize={[14.5, 15]} mb="15px">
          An invoice will be generated and sent to your selected delivery
          channel within the next 24 hrs. Once payment is confirmed, our legal
          and verification team will begin work immediately.
        </Text>
        <Box bg="brand.500" p={['16px', '24px']} rounded="20px">
          <Stack spacing="20px">
            <Flex alignItems="center" gap="6px">
              <AiGeneratedIcon />{' '}
              <Text fontSize={[15, 16]} fontWeight={500}>
                While we work, why not unlock full access?
              </Text>
            </Flex>
            <Text fontWeight={500} fontSize={15}>
              Create a Vestier account to manage your properties, monitor
              installment payments, track asset performance, and collaborate
              with realtors or asset managers seamlessly.
            </Text>
            <Stack>
              {[
                'Track all your real estate assets in one place',
                'Monitor installment and cashflow payments',
                'Assign and manage realtors securely',
                'Access real-time portfolio insights',
                'Organize clients, transactions, and property records',
              ]?.map((item) => (
                <Stack spacing="16px" key={item}>
                  <Flex alignItems="center" gap="8px">
                    <Box w="10px" h="10px" rounded="full" bg="brand.600" />
                    <Text color="brand.300" fontWeight={400} fontSize={[14,15]}>
                      {item}
                    </Text>
                  </Flex>
                </Stack>
              ))}
            </Stack>
            <Button
              type="submit"
              h="48px"
              fontSize={15}
              fontWeight={700}
              bg="brand.100"
              color="brand.200"
              _hover={{ bg: 'brand.100' }}
              onClick={() => navigate('/signup')}
            >
              Register Free Now
            </Button>
          </Stack>
        </Box>
      </Stack>
    </CustomModal>
  );
};

export default SuccessModal;
