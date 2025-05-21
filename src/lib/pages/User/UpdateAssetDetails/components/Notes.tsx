import { Box, Stack, Button, Text, Flex, Heading, Textarea } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { EditCommentIcon } from '~/lib/components/Icons/Icons';
import { AssetDetailsContext } from '..';


const Notes = () => {
  const { setComment, comment } = useContext(AssetDetailsContext);
  return (
    <Box
      w={['100%', '335px']}
      bg="brand.200"
      minH="350px"
      p="30px"
      border="1px solid"
      borderColor="border.100"
      borderRadius="8px"
    >
      <Stack spacing="24px">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading fontSize={16} color="brand.400">
            Notes
          </Heading>
          <Button bg="none" p="0">
            <EditCommentIcon />
          </Button>
        </Flex>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          resize="none"
          minH="250px"
          color="brand.400"
          fontWeight={500}
          border='none'
        />
      </Stack>
    </Box>
  );
};

export default Notes;
