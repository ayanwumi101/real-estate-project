import { Box, Stack, Button, Text, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { EditCommentIcon } from '~/lib/components/Icons/Icons';


const Notes = () => {
  return (
    <Box
      w={['100%',"335px"]}
      bg="brand.200"
      minH="350px"
      p="30px"
      border="1px solid"
      borderColor="border.100"
      borderRadius="5px"
    >
      <Stack spacing="24px">
        <Flex alignItems='center' justifyContent='space-between'>
            <Heading fontSize={16} color='brand.400'>Notes</Heading>
            <Button bg='none' p='0'><EditCommentIcon /></Button>
        </Flex>
        <Text color='brand.400' fontWeight={500}>
          This spacious single-family home is located in a family-friendly
          neighborhood, perfect for those looking for a blend of comfort and
          community. With modern amenities and a beautiful layout, this property
          is ideal for families or anyone looking for extra space.
        </Text>
      </Stack>
    </Box>
  );
};

export default Notes;
