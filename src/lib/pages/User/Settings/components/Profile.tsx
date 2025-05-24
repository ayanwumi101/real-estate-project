'use client';

import {
  Avatar,
  Heading,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Box,
  Flex,
  Stack,
  Badge,
} from '@chakra-ui/react';
import React, { Fragment, useContext } from 'react';
import { FiEdit } from 'react-icons/fi';
import {
  CustomerInformationItem,
  SingleNextOfKinCard,
} from '~/lib/components/Cards';
import {
  BankIcon,
  TelephoneIcon,
  LocationIcon,
  EmailIcon,
  IncompleteProfileIcon,
} from '~/lib/components/Icons/Icons';
import { AppContext } from '~/lib/layout';
import AddNextOfKinModal from '../../AddNextOfKin';
import EditPersonalInfoModal from '../../EditProfile/EditPersonalInfo';
import EditProfileModal from '../../EditProfile/EditProfile';

// const CustomerInformation = () => {
//   return (
//     <Box border="1px solid #E4E4E4" borderRadius="5px" px="24px" py="14px">
//       <Stack spacing="20px">
//         <Box>
//           <Heading fontSize={14} mb="12px" fontWeight={700} color="#2E353F">
//             Customer Information
//           </Heading>
//           <Text color="#2E353F" fontSize={14} fontWeight={500}>
//             We collect your information to protect you from fraud as well as to
//             comply with local laws and regulations.
//           </Text>
//         </Box>

//         <Box border="1px solid #E4E4E4" borderRadius="6px" py="12px" px="24px">
//           <Text mb="12px" fontWeight={500} color="#2E353F">
//             Personal Information
//           </Text>
//           <Button
//             bg="#EDEDFF"
//             color="#4040A0"
//             fontSize={14}
//             fontWeight={600}
//             w="125px"
//           >
//             Update Now
//           </Button>
//         </Box>
//         <Box border="1px solid #E4E4E4" borderRadius="6px" py="12px" px="24px">
//           <Text mb="12px" fontWeight={500} color="#2E353F">
//             Address Details
//           </Text>
//           <Button
//             bg="#EDEDFF"
//             fontSize={14}
//             color="#4040A0"
//             fontWeight={600}
//             w="125px"
//           >
//             Update Now
//           </Button>
//         </Box>
//       </Stack>
//     </Box>
//   );
// };

const BankAccountDetails = () => {
  return (
    <Box border="1px solid #E4E4E4" borderRadius="5px" px="24px" py="14px">
      <Stack spacing="20px">
        <Heading fontSize={14} fontWeight={700} color="#2E353F">
          Bank Account
        </Heading>
        <Box>
          <Flex alignItems="center" gap="20px">
            <BankIcon />
            <Text>First City Monument Bank | *** ***1234</Text>
            <FiEdit />
          </Flex>
        </Box>
        <Button bg="#EDEDFF" color="#4040A0" fontWeight={500} w="160px">
          Add new Account
        </Button>
      </Stack>
    </Box>
  );
};

const PersonalInformation = () => {
  const { userDetails } = useContext(AppContext);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  return (
    <Fragment>
      <Box border="1px solid #E4E4E4" borderRadius="5px" px="24px" py="20px">
        <Stack spacing="20px">
          <Stack alignItems="flex-start" spacing="12px">
            <Heading fontSize={15} color="brand.300">
              Customer Information
            </Heading>
            <Text>
              We collect your information to protect you from fraud as well as
              to comply with local laws and regulations.
            </Text>
            <Badge
              rounded="50px"
              py="8px"
              px="22px"
              fontSize={14}
              fontWeight={600}
              textTransform="capitalize"
              color="color.200"
              bg="color.300"
            >
              <Flex alignItems="center" gap="10px">
                <IncompleteProfileIcon />
                <Text>Not Completed</Text>
              </Flex>
            </Badge>
          </Stack>
          <Box py="14px">
            <Stack spacing="25px">
              <Flex
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
                gap={['20px', '0']}
              >
                <Box w={['100%', '50%']}>
                  <CustomerInformationItem
                    Icon={TelephoneIcon}
                    label="Phone"
                    labelValue={userDetails?.phone as string}
                  />
                </Box>
                <Box w={['100%', '50%']}>
                  <CustomerInformationItem
                    Icon={EmailIcon}
                    label="Email"
                    labelValue={userDetails?.email as string}
                  />
                </Box>
              </Flex>
              <Flex
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
                gap={['20px', '0']}
              >
                <Box w={['100%', '50%']}>
                  <CustomerInformationItem
                    Icon={LocationIcon}
                    label="Address"
                    labelValue={userDetails?.street_name as string}
                  />
                </Box>
                <Box w={['100%', '50%']}>
                  <CustomerInformationItem
                    Icon={BankIcon}
                    label="Bank Account"
                    labelValue={
                      `${userDetails?.account_name} | ${userDetails?.bank_name}` ||
                      ('No Account Registered' as string)
                    }
                  />
                </Box>
              </Flex>
            </Stack>
            {/* <Box>
            <Flex alignItems="center" gap="15px" flexWrap={['wrap', 'nowrap']}>
              <Box w={['100%', '50%']}>
                <FormLabel
                  mb="13px"
                  color="#222222"
                  fontWeight={600}
                  fontSize={15}
                >
                  Email
                </FormLabel>
                <InputGroup>
                  <Input
                    border="1px solid #C0C0C0"
                    type="email"
                    // placeholder="jayforeal@gmail.com"
                    value={userDetails?.email}
                    borderRadius="50px"
                    height="50px"
                    px="20px"
                    color="#2E353F"
                    fontWeight={500}
                    readOnly={true}
                  />
                  <InputRightElement pointerEvents="none" mt="1" mr="2">
                    <VerifiedIcon />
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Box w={['100%', '50%']}>
                <FormLabel
                  mb="13px"
                  color="#222222"
                  fontWeight={600}
                  fontSize={15}
                >
                  Phone Number
                </FormLabel>
                <InputGroup>
                  <Input
                    border="1px solid #C0C0C0"
                    type="email"
                    // placeholder="+49 17687934521"
                    value={userDetails?.phone}
                    borderRadius="50px"
                    height="50px"
                    px="20px"
                    color="#2E353F"
                    fontWeight={500}
                    readOnly={true}
                  />
                  <InputRightElement pointerEvents="none" mt="1" mr="2">
                    <VerifiedIcon />
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Flex>
          </Box>
          <Box>
            <Flex alignItems="center" gap="15px" flexWrap={['wrap', 'nowrap']}>
              <Box w={['100%', '50%']}>
                <FormLabel
                  mb="13px"
                  color="#222222"
                  fontWeight={600}
                  fontSize={15}
                >
                  Gender
                </FormLabel>
                <InputGroup>
                  <Input
                    border="1px solid #C0C0C0"
                    type="email"
                    // placeholder="Male"
                    value={userDetails?.gender}
                    borderRadius="50px"
                    height="50px"
                    px="20px"
                    color="#2E353F"
                    fontWeight={500}
                    readOnly={true}
                  />
                  <InputRightElement pointerEvents="none" mt="1" mr="2">
                    <VerifiedIcon />
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Box w={['100%', '50%']}>
                <FormLabel
                  mb="13px"
                  color="#222222"
                  fontWeight={600}
                  fontSize={15}
                >
                  Address
                </FormLabel>
                <InputGroup>
                  <Input
                    border="1px solid #C0C0C0"
                    type="email"
                    // placeholder="64 Royal Ln. Mesa, New Jersey 45463"
                    value={userDetails?.street_name}
                    borderRadius="50px"
                    height="50px"
                    px="20px"
                    color="#2E353F"
                    fontWeight={500}
                    readOnly={true}
                  />
                  <InputRightElement pointerEvents="none" mt="1" mr="2">
                    <VerifiedIcon />
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Flex>
          </Box> */}
          </Box>
        </Stack>
      </Box>
      <EditProfileModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </Fragment>
  );
};

const ProfileHeader = () => {
  const { userDetails } = useContext(AppContext);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  return (
    <Fragment>
      <Box p="25px" bgGradient="linear(to-r, #D8D8FF4D, #EDEDFF4D, #FFE6C44D)">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={['25px', '0']}
        >
          <Box>
            <Flex gap={['20px', '25px']} alignItems="center">
              <Avatar
                name={userDetails?.fullname}
                w={['56px', '86px']}
                bg="#E4E4E4"
                h={['56px', '86px']}
                color="#fff"
                fontWeight={700}
                fontSize={32}
                src={userDetails?.profile_image}
              />
              <Box>
                <Stack justifyContent="space-between">
                  <Heading fontSize={[20, 32]} color="#2E353F" fontWeight={500}>
                    {userDetails?.fullname}
                  </Heading>
                  <Text fontSize={14} color="#2E353F" fontWeight={500}>
                    {userDetails?.gender}
                  </Text>
                </Stack>
              </Box>
            </Flex>
          </Box>
          <Button
            bg="brand.100"
            onClick={() => setOpenModal(true)}
            color="brand.200"
            fontWeight={500}
            px="24px"
          >
            Update Profile
          </Button>
        </Flex>
      </Box>
      <EditPersonalInfoModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </Fragment>
  );
};

const Profile = () => {
  return (
    <Box pb="50px">
      <Stack spacing="30px">
        <Box px={['20px', '40px']}>
          <ProfileHeader />
        </Box>
        <Box px={['20px', '40px']}>
          <Stack spacing="26px">
            <PersonalInformation />
            <BankAccountDetails />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Profile;
