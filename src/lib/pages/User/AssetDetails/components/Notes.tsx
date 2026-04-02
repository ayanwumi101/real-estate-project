import {
  Box,
  Stack,
  Button,
  Text,
  Flex,
  Heading,
  Skeleton,
} from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { EditCommentIcon } from '~/lib/components/Icons/Icons';

const Notes = ({
  notes,
  editComment,
  loading,
}: {
  notes: string;
  editComment: () => void;
  loading: boolean;
}) => {
  return (
    <Fragment>
      {loading ? (
        <Skeleton rounded="8px" w={['100%', '35%']} minH="350px"></Skeleton>
      ) : (
        <Box
          w={['100%', '35%']}
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
              <Button bg="none" p="0" onClick={editComment}>
                <EditCommentIcon />
              </Button>
            </Flex>
            <Text color="brand.400" fontWeight={500}>
              {notes || 'No comment available'}
            </Text>
          </Stack>
        </Box>
      )}
    </Fragment>
  );
};

export default Notes;
