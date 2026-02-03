export const FormatAmount = (amount: number) => { 
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
    }).format(amount);
}


export const formatCurrency = (value: string | number) => {
  if (value === null || value === undefined) return '';
  const numberValue = Math.floor(Number(value));
  if (isNaN(numberValue)) return '';
  return `₦ ${numberValue.toLocaleString()}`;
};
