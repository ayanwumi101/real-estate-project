import React from 'react'
import Notes from './components/Notes'
import AssetDetails from './components/AssetDetails'
import Header from './components/Header'
import { Box, Stack, Flex } from '@chakra-ui/react'


const index = () => {
  return (
    <Box>
      <Stack>
        <Header />
        <Box p={['20px','40px']}>
            <Flex alignItems='flex-start' flexWrap={['wrap', 'nowrap']} gap='40px'>
                <AssetDetails />
                <Notes /> 
            </Flex>
        </Box>
      </Stack>
    </Box>
  );
}

export default index