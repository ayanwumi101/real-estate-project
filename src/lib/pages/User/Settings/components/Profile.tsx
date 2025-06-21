'use client';

import {
  Avatar,
  Heading,
  Text,
  Button,
  Input,
  Box,
  Flex,
  Stack,
  Badge,
  FormLabel,
  Spinner,
  Select,
  useToast,
} from '@chakra-ui/react';
import React, { Fragment, useContext, useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import { CustomerInformationItem } from '~/lib/components/Cards';
import {
  BankIcon,
  TelephoneIcon,
  LocationIcon,
  EmailIcon,
  IncompleteProfileIcon,
  CompleteProfileIcon,
  ContactSupportIcon,
} from '~/lib/components/Icons/Icons';
import { AppContext } from '~/lib/layout';
import EditPersonalInfoModal from '../../EditProfile/EditPersonalInfo';
import EditProfileModal from '../../EditProfile/EditProfile';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Link from 'next/link';
import {
  GetUserProfileDetails,
  UpdateProfile,
} from '~/lib/api/services/profileService';
import useNavigate from '~/lib/utils/useNavigate';



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

  const isProfileComplete = userDetails?.personal_check;

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
                    labelValue={`${userDetails?.street_no}, ${userDetails?.street_name}, ${userDetails?.city?.name}.`}
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

const ProfileHeader = ({
  updateProfile,
  setUpdateProfile,
}: {
  updateProfile: boolean;
  setUpdateProfile: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
          {!updateProfile && (
            <Link href="/user/settings">
              <Button
                bg="brand.100"
                onClick={() => setUpdateProfile(true)}
                color="brand.200"
                fontWeight={500}
                px="24px"
              >
                Update Profile
              </Button>
            </Link>
          )}
        </Flex>
      </Box>
    </Fragment>
  );
};

const Profile = () => {
  const [updateProfile, setUpdateProfile] = React.useState<boolean>(false);
  const { userDetails, setUserDetails } = useContext(AppContext);
  const isProfileComplete = userDetails?.personal_check;
  const [loading, setLoading] = React.useState<boolean>(false);

  const toast = useToast();
  const navigate = useNavigate();
  const [phone, setPhone] = React.useState<string>('');
  const [address, setAddress] = React.useState<string>('');
  const [gender, setGender] = React.useState<string>('');

  useEffect(() => {
    if (userDetails?.phone) {
      setPhone(userDetails.phone);
    }
    if (userDetails?.address) {
      setAddress(userDetails.address);
    }
    if (userDetails?.gender) {
      setGender(userDetails.gender);
    }
  }, [userDetails]);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const response = await UpdateProfile({
        phone,
        address,
        gender,
      });
      const res = await GetUserProfileDetails();
      const data = await res.data;
      setUserDetails(data);
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      navigate('/user/settings');
      setUpdateProfile(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box pb="50px">
      <Stack spacing="30px">
        <Box px={['20px', '40px']}>
          <ProfileHeader
            updateProfile={updateProfile}
            setUpdateProfile={setUpdateProfile}
          />
        </Box>
        {updateProfile ? (
          <Box px={['20px', '40px']}>
            <Stack spacing="26px">
              <Box border="1px solid #E4E4E4" rounded="5px" p="15px">
                <Stack spacing="15px">
                  {/* heading and badge section */}
                  <Box>
                    <Stack spacing="15px">
                      <Heading fontSize={15}>Customer Information</Heading>
                      <Text fontSize={14} fontWeight={500} color="brand.300">
                        We collect your information to protect you from fraud as
                        well as to comply with local laws and regulations.
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
                          w="fit-content"
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
                          w="fit-content"
                        >
                          <Flex alignItems="center" gap="10px">
                            <IncompleteProfileIcon />
                            <Text>Not Completed</Text>
                          </Flex>
                        </Badge>
                      )}
                    </Stack>
                  </Box>
                  {/* personal information section */}
                  <Box
                    border="1px solid"
                    borderColor="border.100"
                    rounded="5px"
                    py="15px"
                    px="24px"
                  >
                    <Flex alignItems="center" gap="25px" mb="20px">
                      <Box w="full">
                        <FormLabel fontWeight={600} fontSize={15}>
                          Email
                        </FormLabel>
                        <Input
                          type="email"
                          w="full"
                          readOnly={true}
                          value={userDetails?.email}
                          border="1px solid"
                          borderColor="border.200"
                          rounded="50px"
                          h="48px"
                          color="brand.300"
                        />
                      </Box>
                      <Box w="full">
                        <FormLabel fontWeight={600} fontSize={15}>
                          Phone Number
                        </FormLabel>
                        {userDetails?.phone?.startsWith('+234') ? (
                          <PhoneInput
                            country={'ng'}
                            value={phone}
                            onChange={(value) => setPhone(value)}
                            inputStyle={{
                              width: '100%',
                              height: '48px',
                              borderRadius: '50px',
                              border: '1px solid #E4E4E4',
                              color: '#2E353F',
                            }}
                          />
                        ) : (
                          <Input
                            type="tel"
                            w="full"
                            value={phone}
                            border="1px solid"
                            borderColor="border.200"
                            rounded="50px"
                            h="48px"
                            color="brand.300"
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        )}
                      </Box>
                    </Flex>
                    <Flex alignItems="center" gap="25px">
                      <Box w="full">
                        <FormLabel fontWeight={600} fontSize={15}>
                          Gender
                        </FormLabel>
                        <Select
                          placeholder="Select Gender"
                          w="full"
                          value={gender?.toLowerCase()}
                          border="1px solid"
                          borderColor="border.200"
                          rounded="50px"
                          h="48px"
                          color="brand.300"
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </Select>
                      </Box>
                      <Box w="full">
                        <FormLabel fontWeight={600} fontSize={15}>
                          Address
                        </FormLabel>
                        <Input
                          type="text"
                          w="full"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          border="1px solid"
                          borderColor="border.200"
                          rounded="50px"
                          h="48px"
                          color="brand.300"
                          placeholder="No 102, Street Name, City, State"
                        />
                      </Box>
                    </Flex>
                  </Box>
                  {/* bank Account section */}
                  <Box
                    border="1px solid"
                    borderColor="border.100"
                    rounded="5px"
                    py="15px"
                    px="24px"
                  >
                    <Stack spacing="20px">
                      <Heading fontSize={15}>Bank Account</Heading>
                      <Flex alignItems="center" gap="20px">
                        <BankIcon />
                        <Text>First City Monument Bank | *** ***1234</Text>
                        <FiEdit />
                      </Flex>
                      <Button
                        bg="#EDEDFF"
                        color="#4040A0"
                        fontWeight={500}
                        w="160px"
                      >
                        Change Account
                      </Button>
                    </Stack>
                  </Box>
                  {/* bottom badge section */}
                  <Badge
                    rounded="26px"
                    padding="10px 15px"
                    bg="bg.500"
                    textTransform="none"
                    w="fit-content"
                  >
                    <Flex alignItems="center" gap="12px">
                      <ContactSupportIcon />
                      <Text fontSize={14} fontWeight={500}>
                        Kindly contact support to update your email
                      </Text>
                    </Flex>
                  </Badge>
                </Stack>
              </Box>
              <Flex alignItems="center" gap="18px">
                <Link href="/user/settings">
                  <Button
                    bg="#EDEDFF"
                    color="#4040A0"
                    fontWeight={500}
                    w="fit-content"
                    px="25px"
                    py="12px"
                    _hover={{ bg: '#EDEDFF' }}
                    onClick={() => setUpdateProfile(false)}
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  bg="brand.100"
                  color="brand.200"
                  fontWeight={500}
                  w="fit-content"
                  px="25px"
                  py="12px"
                  _hover={{ bg: 'brand.100' }}
                  onClick={handleUpdateProfile}
                >
                  {loading ? <Spinner /> : 'Save Changes'}
                </Button>
              </Flex>
            </Stack>
          </Box>
        ) : (
          <Box px={['20px', '40px']}>
            <Stack spacing="26px">
              <PersonalInformation />
              <BankAccountDetails />
            </Stack>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default Profile;
