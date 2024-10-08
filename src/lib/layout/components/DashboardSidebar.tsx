import { Box } from '@chakra-ui/react'
import React from 'react'


const DashboardSidebar = () => {
  return (
    <Box as="nav" color="black" pl="16px" w="100%" h="100vh">
      <Box
        borderX="1px solid #E4E4E4"
        w="100%"
        h="100%"
        borderBottom="1px solid #E4E4E4"
      >
        <Box
          textAlign="center"
          w="100%"
          h="96px"
          borderBottom="1px solid #E4E4E4"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
          Logo
        </Box>
        DashboardSidebar
      </Box>
    </Box>
  );
}

export default DashboardSidebar