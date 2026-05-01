export const currencies: Currency[] = [
  {
    code: 'NGN',
    name: 'Nigerian Naira',
    flag: '/assets/images/nigeria-icon.svg',
  },
  {
    code: 'USD',
    name: 'United States Dollar',
    flag: '/assets/images/us-icon.svg',
  },
  {
    code: 'GBP',
    name: 'British Pound',
    flag: '/assets/images/british-icon.svg',
  },
  { code: 'EUR', name: 'Euro', flag: '/assets/images/euro-icon.svg' },
];

export interface Currency {
  code: 'NGN' | 'USD' | 'GBP' | 'EUR';
  name: string;
  flag: string;
}