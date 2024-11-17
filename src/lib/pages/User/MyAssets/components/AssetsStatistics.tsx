import { Box, Flex, Heading, Button } from '@chakra-ui/react'
import React from 'react'
import { FiEye } from 'react-icons/fi'
import { StatCard, AssetStatCard } from '~/lib/components/Cards'



const AssetsStatistics = () => {
  return (
    <Box p="40px" borderY="1px solid #E4E4E4">
      <Flex alignItems="center" gap="16px">
        <AssetStatCard label="Total Number of Assets">
          <Heading fontWeight={500} fontSize={24} color="#222222">
            0
          </Heading>
        </AssetStatCard>
        <AssetStatCard label="Total Asset in Naira">
          <Flex alignItems="center" gap="16px">
            <Heading fontWeight={500} fontSize={24} color="#222222">
              ₦150,000
            </Heading>
            <Button bg="none" p="0" _hover={{ bg: 'none', p: 0 }}>
              <FiEye />
            </Button>
          </Flex>
        </AssetStatCard>
        <AssetStatCard label="Current Asset Value">
          <Heading fontWeight={500} fontSize={24} color="#222222">
            ₦150,000
          </Heading>
        </AssetStatCard>
        <AssetStatCard label="Total Remittance">
          <Heading fontWeight={500} fontSize={24} color="#222222">
            ₦2
            50,000
          </Heading>
        </AssetStatCard>
      </Flex>
    </Box>
  );
}

export default AssetsStatistics