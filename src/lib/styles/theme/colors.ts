import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional color here */
const extendedColors: DeepPartial<
  Record<string, Theme['colors']['blackAlpha']>
> = {
  brand: {
    100: '#000080',
    200: '#ffffff',
    300: '#2E353F',
    400: '#222222',
    500: '#EDEDFF',
    600: '#ABABFF',
    700: '#FBFBFB',
    800: '#8295AA',
    900: '#4040A0',
  },
  bg: {
    100: '#D8D8FF66',
    200: '#EDEDFF',
    300: '#D8D8FF66',
    400: '#1D2739',
    500: '#F5F5F5',
    600: '#FFEDE9',
    700: '#E7F5EC',
    800: '#F6EDDF',
    900: '#E1A101'
  },
  border: {
    100: '#E4E4E4',
    200: '#C0C0C0',
  },
  color: {
    100: '#1A1C1D',
    200: '#FE3839',
    300: '#FFEDE9',
    400: '#1BD155',
500: '#8295AA'
  }
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme['colors']> = {};

export const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};
