import { Avatar, Heading, Text, Button, Input, InputGroup, InputRightElement, InputLeftElement, Box, Flex, Stack } from '@chakra-ui/react'
import React from 'react'


const BankAccountDetails = () => {
    return (
      <Box border="1px solid #E4E4E4" borderRadius="5px" px="24px" py="14px">
        Bank Account Details
      </Box>
    );
}


const CustomerInformation = () => {
    return (
      <Box border="1px solid #E4E4E4" borderRadius="5px" px="24px" py="14px">
        Customer Information
      </Box>
    );
}


const PersonalInformation = () => {
    return <Box border="1px solid #E4E4E4" borderRadius='5px' px='24px' py='14px'>Personal Information</Box>;
}


const ProfileHeader = () => {
    return (
      <Box p="25px" bgGradient="linear(to-r, #D8D8FF4D, #EDEDFF4D, #FFE6C44D)">
        <Flex gap="25px" alignItems="center">
          <Avatar
            name="James Brown"
            w="86px"
            bg="#E4E4E4"
            h="86px"
            color="#fff"
            fontWeight={700}
            fontSize={32}
          />
          <Box>
            <Stack justifyContent="space-between">
              <Heading fontSize={32} color="#2E353F" fontWeight={500}>
                James Brown
              </Heading>
              <Text fontSize={14} color="#2E353F" fontWeight={500}>
                Male
              </Text>
            </Stack>
          </Box>
        </Flex>
      </Box>
    );
}


const Profile = () => {
  return (
    <Box>
      <Stack spacing="40px">
        <ProfileHeader />
        <Box px="40px">
          <Stack spacing="26px">
            <PersonalInformation />
            <BankAccountDetails />
            <CustomerInformation />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default Profile