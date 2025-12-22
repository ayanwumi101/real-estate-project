import React from 'react';
import { Stack, Heading, Text, Box, Flex } from '@chakra-ui/react';
import { BsHouseLockFill } from 'react-icons/bs';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: [1, 1.2, 1],
    rotate: 0,
    transition: {
      scale: {
        repeat: 2,
        repeatType: 'reverse',
        duration: 1,
        ease: 'easeInOut',
      },
      rotate: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  },
  hover: {
    scale: 1.1,
    rotate: 10,
    transition: { duration: 0.3 },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const ComingSoon = () => {
  return (
    <Box w="full" h={['65vh', '75vh']} px='4'>
      <Flex w="full" h="full" alignItems="center" justifyContent="center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Stack spacing="23px" alignItems="center">
            <motion.div variants={iconVariants} whileHover="hover">
              <BsHouseLockFill size={40} color="#4040A0" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Box textAlign="center">
                <motion.div variants={textVariants}>
                  <Heading
                    fontSize={28}
                    mb="2"
                    fontWeight={600}
                    color="#4040A0"
                  >
                    Coming Soon!
                  </Heading>
                </motion.div>
                <motion.div variants={textVariants}>
                  <Text fontSize={18} letterSpacing="0.7px" color="#2E353F">
                    This feature is currently under development and will be
                    available soon.
                  </Text>
                </motion.div>
              </Box>
            </motion.div>
          </Stack>
        </motion.div>
      </Flex>
    </Box>
  );
};

export default ComingSoon;
