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
    700: '',
    800: '',
    900: '',
  },
  border: {
    100: '#E4E4E4',
  },
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme['colors']> = {};

export const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};
