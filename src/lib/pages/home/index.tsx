import { Flex, Box, Heading, Text, Image } from '@chakra-ui/react';
import Hero from './components/Hero';
import Discover from './components/Discover';
import Services from './components/Services';
import Properties from './components/Properties';
import HowItWorks from './components/HowItWorks';
import Faqs from './components/Faqs';
import HowWeHelp from './components/HowWeHelp';


export const Home = () => {
  return (
    <Box as='section' w='100%'>
      <Hero />
      <Services />
      <HowWeHelp />
      {/* <Properties /> */}
      <HowItWorks />
      <Faqs />
    </Box>
  );
};
