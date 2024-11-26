import { Box, FormLabel, FormControl, Input, Stack, RadioGroup, Radio, Select, Button, Textarea, Flex,  } from '@chakra-ui/react'
import React from 'react'


const PropertyDetailsForm = ({step, setStep}:{step: number, setStep: (value: number) => void,}) => {
  return (
    <Box w="600px">
      <Stack spacing="24px">
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            What would you like to name your property?
          </FormLabel>
          <Input
            border="1px solid #C0C0C0"
            bg="#FBFBFB"
            h="50px"
            borderRadius="40px"
            placeholder="Name your property"
            _placeholder={{ color: '#8295AA', fontWeight: 500 }}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            What kind of property are you listing?
          </FormLabel>
          <RadioGroup defaultValue="1">
            <Stack>
              <Radio size="lg" name="1" value="1" colorScheme="blue">
                Land
              </Radio>
              <Radio size="lg" name="2" value="2" colorScheme="blue">
                Building
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            What is the size of this property?
          </FormLabel>
          <Input
            border="1px solid #C0C0C0"
            bg="#FBFBFB"
            h="50px"
            borderRadius="40px"
            placeholder="Name your property"
            _placeholder={{ color: '#8295AA', fontWeight: 500 }}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            Where is the property located?
          </FormLabel>
          <Flex alignItems="center" justifyContent="space-between" mb="22px">
            <Input
              border="1px solid #C0C0C0"
              bg="#FBFBFB"
              h="50px"
              borderRadius="40px"
              placeholder="Name your property"
              _placeholder={{ color: '#8295AA', fontWeight: 500 }}
              w="32%"
            />
            <Input
              border="1px solid #C0C0C0"
              bg="#FBFBFB"
              h="50px"
              borderRadius="40px"
              placeholder="Name your property"
              _placeholder={{ color: '#8295AA', fontWeight: 500 }}
              w="32%"
            />
            <Input
              border="1px solid #C0C0C0"
              bg="#FBFBFB"
              h="50px"
              borderRadius="40px"
              placeholder="Name your property"
              _placeholder={{ color: '#8295AA', fontWeight: 500 }}
              w="32%"
            />
          </Flex>
          <Flex alignItems="center" justifyContent="space-between" mb="15px">
            <Select
              border="1px solid #C0C0C0"
              bg="#FBFBFB"
              h="50px"
              borderRadius="40px"
              placeholder="Name your property"
              _placeholder={{ color: '#8295AA', fontWeight: 500 }}
              w="49%"
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <Select
              border="1px solid #C0C0C0"
              bg="#FBFBFB"
              h="50px"
              borderRadius="40px"
              placeholder="Name your property"
              _placeholder={{ color: '#8295AA', fontWeight: 500 }}
              w="49%"
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            Enter your realtor details
          </FormLabel>
          <Input
            border="1px solid #C0C0C0"
            bg="#FBFBFB"
            h="50px"
            borderRadius="40px"
            placeholder="Name your property"
            _placeholder={{ color: '#8295AA', fontWeight: 500 }}
            mb="22px"
          />
          <Input
            border="1px solid #C0C0C0"
            bg="#FBFBFB"
            h="50px"
            borderRadius="40px"
            placeholder="Name your property"
            _placeholder={{ color: '#8295AA', fontWeight: 500 }}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            Office address of realtor
          </FormLabel>
          <Flex alignItems="center" justifyContent="space-between" mb="22px">
            <Input
              border="1px solid #C0C0C0"
              bg="#FBFBFB"
              h="50px"
              borderRadius="40px"
              placeholder="Name your property"
              _placeholder={{ color: '#8295AA', fontWeight: 500 }}
              w="32%"
            />
            <Input
              border="1px solid #C0C0C0"
              bg="#FBFBFB"
              h="50px"
              borderRadius="40px"
              placeholder="Name your property"
              _placeholder={{ color: '#8295AA', fontWeight: 500 }}
              w="32%"
            />
            <Input
              border="1px solid #C0C0C0"
              bg="#FBFBFB"
              h="50px"
              borderRadius="40px"
              placeholder="Name your property"
              _placeholder={{ color: '#8295AA', fontWeight: 500 }}
              w="32%"
            />
          </Flex>
          <Flex alignItems="center" justifyContent="space-between" mb="15px">
            <Select
              border="1px solid #C0C0C0"
              bg="#FBFBFB"
              h="50px"
              borderRadius="40px"
              placeholder="Name your property"
              _placeholder={{ color: '#8295AA', fontWeight: 500 }}
              w="49%"
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <Select
              border="1px solid #C0C0C0"
              bg="#FBFBFB"
              h="50px"
              borderRadius="40px"
              placeholder="Name your property"
              _placeholder={{ color: '#8295AA', fontWeight: 500 }}
              w="49%"
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            Enter Realtor’s Phone number
          </FormLabel>
          <Flex border="1px solid #C0C0C0" borderRadius="50px">
            <Select
              w="115px"
              bg="#F5F5F5"
              borderTopLeftRadius="50px"
              borderBottomLeftRadius="50px"
              border="none"
              h="50px"
            >
              <option value="">+234</option>
              <option value="">+235</option>
              <option value="">+236</option>
            </Select>
            <Input
              borderTopRightRadius="50px"
              borderBottomRightRadius="50px"
              border="none"
              bg="#FBFBFB"
              h="50px"
              placeholder="Enter your phone number"
              _placeholder={{ color: '#8295AA', fontWeight: 500 }}
              type="tel"
            />
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={600} fontSize={16} color="#222222">
            Add any additional comment
          </FormLabel>
          <Textarea
            border="1px solid #C0C0C0"
            bg="#FBFBFB"
            h="85px"
            borderRadius="20px"
            placeholder="Enter any additional comments you want to remember"
            _placeholder={{ color: '#8295AA', fontWeight: 500 }}
            resize="none"
            px="25px"
            py="15px"
          />
        </FormControl>
        <Flex justifyContent='flex-end'>
          <Button
            bg="#000080"
            color="white"
            h="48px"
            borderRadius="30px"
            fontWeight={600}
            fontSize={16}
            _hover={{ bg: '#000080' }}
            onClick={() => setStep(step + 1)}
          >
            Continue
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}

export default PropertyDetailsForm