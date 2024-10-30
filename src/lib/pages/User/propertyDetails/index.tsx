import React from 'react'
import PropertyDetails from './components/PropertyDetails'
import Header from './components/Header'
import { Box } from '@chakra-ui/react'


const index = () => {
  return (
    <Box>
      <Header />
      <PropertyDetails />
    </Box>
  )
}

export default index