import { Box, Stack, Button, Text, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { EditCommentIcon } from '~/lib/components/Icons/Icons';


const Notes = ({ notes, editComment }: { notes: string;  editComment?: () => void}) => {
  return (
    <Box
      w={['100%',"40%"]}
      bg="brand.200"
      minH="350px"
      p="30px"
      border="1px solid"
      borderColor="border.100"
      borderRadius="8px"
    >
      <Stack spacing="24px">
        <Flex alignItems='center' justifyContent='space-between'>
            <Heading fontSize={16} color='brand.400'>Notes</Heading>
            <Button bg='none' p='0' onClick={editComment}><EditCommentIcon /></Button>
        </Flex>
        <Text color='brand.400' fontWeight={500}>
          {notes || 'No comment available'}
        </Text>
      </Stack>
    </Box>
  );
};

export default Notes;
