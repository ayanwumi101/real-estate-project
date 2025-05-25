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
  CompleteProfileIcon,
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
          Change Account
        </Button>
      </Stack>
    </Box>
  );
};

const PersonalInformation = () => {
  const { userDetails } = useContext(AppContext);
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const isProfileComplete =
    userDetails?.personal_check;

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
            {isProfileComplete ? (
              <Badge
                rounded="50px"
                py="8px"
                px="22px"
                fontSize={14}
                fontWeight={600}
                textTransform="capitalize"
                color="#1BD155"
                bg="#E0FFEA"
              >
                <Flex alignItems="center" gap="10px">
                  <CompleteProfileIcon />
                  <Text>Completed</Text>
                </Flex>
              </Badge>
            ) : (
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
            )}
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
                    label="Gender"
                    labelValue={userDetails?.gender as string}
                  />
                </Box>
                <Box w={['100%', '50%']}>
                  <CustomerInformationItem
                    Icon={LocationIcon}
                    label="Address"
                    labelValue={
                      `${userDetails?.street_name}, ${userDetails?.street_name}`
                    }
                  />
                </Box>
              </Flex>
            </Stack>
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
