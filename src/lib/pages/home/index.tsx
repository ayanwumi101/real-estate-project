import { Flex, Box, Heading, Text, Image } from '@chakra-ui/react';
import Hero from './components/Hero';
import Discover from './components/Discover';
import Features from './components/Features';
import Properties from './components/Properties';
import HowItWorks from './components/HowItWorks';
import Faqs from './components/Faqs';


export const Home = () => {
  return (
    <Box as='section' w='100%'>
      <Hero />
      <Discover />
      <Features />
      <Properties />
      <HowItWorks />
      <Faqs />
    </Box>
  );
};
