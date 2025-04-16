export const FormatAmount = (amount: number) => { 
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
    }).format(amount);
}


export const formatCurrency = (value: string) => {
  const numericValue = value.replace(/[^\d]/g, ''); // remove non-digit characters
  if (!numericValue) return '';
  return '₦ ' + Number(numericValue).toLocaleString();
};