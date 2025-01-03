import React from 'react'
import AccountBalance from './components/AccountBalance'
import Investments from './components/Investments'
import MarketUpdates from './components/MarketUpdates'
import { Box } from '@chakra-ui/react'


const index = () => {
  return (
    <Box pt={[3,0]}>
        <AccountBalance />
        <Investments />
        <MarketUpdates />
    </Box>
  )
}

export default index