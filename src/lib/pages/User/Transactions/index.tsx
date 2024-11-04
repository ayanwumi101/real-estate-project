'use client'

import React, { useState } from 'react'
import Header from './components/Header'
import { Box } from '@chakra-ui/react'
import NavigationTab from './components/NavigationTab'
import Transactions from './components/Transactions'



const index = () => {
    const [activeTab, setActiveTab] = useState('All')
  return (
    <Box pb='40px'>
        <Header />
        <NavigationTab tabs={['All', 'Order History', 'Transaction History']} activeTab={activeTab} setActiveTab={setActiveTab} />
        <Transactions />
    </Box>
  )
}

export default index