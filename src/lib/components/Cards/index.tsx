import { Box, Image, Text, Stack, Heading, Flex } from "@chakra-ui/react"
import { LocationIcon } from '~/lib/components/Icons/Icons';

export const PropertyCard = ({imageSource}: {imageSource: string}) => {
    return (
      <Box w={['100%',"270px"]} h="auto">
        <Box
          w="100%"
          h="300px"
          borderRadius="10px"
          bgImage={imageSource}
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition="center"
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-end"
        >
          <Box
            w="100%"
            py="12px"
            bg="rgba(0,0,0,0.35)"
            backdropFilter="blur(8px)"
          >
            <Text textAlign="center" color="#ffffff">
              ₦40,500 - 50,000 / Share
            </Text>
          </Box>
        </Box>
        <Box pt="24px" pb="12px" borderBottom="1px solid #ABABFF">
          <Stack spacing="12px">
            <Heading fontSize={18} fontWeight={600} color="#222222">
              Skyline Residences
            </Heading>
            <Text fontSize={14} fontWeight={500} color="#2E353F">
              8% p.a expected returns
            </Text>
            <Flex alignItems="center" gap="14px">
              <LocationIcon />
              <Text fontSize={14} fontWeight={500} color="#2E353F">
                Lekki, Lagos
              </Text>
            </Flex>
          </Stack>
        </Box>
      </Box>
    );
}