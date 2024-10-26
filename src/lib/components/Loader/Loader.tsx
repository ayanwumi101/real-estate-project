import { Image, Box, Text, Heading } from '@chakra-ui/react'
import React from 'react'


const Loader = () => {
  return (
    <Box display='flex' py='12' flexDir='column' alignItems='center' justifyContent='center'>
      <Image src="/assets/gif/loader.gif" w='140px' h='140px' objectFit='cover' mb="12px" display='block' mx='auto' />
      <Heading color="#000080" fontWeight={600} fontSize={20} mb="5px">
        Please wait ...
      </Heading>
      <Text color="#8295AA" fontSize={14} fontWeight={500}>
        This may take a few minutes
      </Text>
    </Box>
  );
}

export default Loader