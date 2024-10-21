import { Box, Heading, Text, Image, Stack, Flex, Button, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import React from 'react'


const OtherDetails = () => {
    return (
        <Box w='40%'></Box>
    )
}


const MainDetails = () => {
    return (
        <Box w='605'></Box>
    )
}


const PropertyDetails = () => {
  return (
    <Box py="30px" px="40px" borderBottom="1px solid #E4E4E4">
      <Flex gap='40px'>
        <MainDetails />
        <OtherDetails />
      </Flex>
    </Box>
  );
}

export default PropertyDetails