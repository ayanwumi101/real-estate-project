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
  border: {
    100: '#E4E4E4',
    200: '#C0C0C0',
  },
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme['colors']> = {};

export const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};
