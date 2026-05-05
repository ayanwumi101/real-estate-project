export const FormatAmount = (amount: number, currency: string = 'NGN') => {
  // Handle Naira with custom symbol
  if (currency === 'NGN') {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
    return `₦${formatted}`;
  }

  // For other currencies, use locale formatting
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'NGN',
  }).format(amount);
};

export const formatCurrency = (value: string | number) => {
  if (value === null || value === undefined) return '';
  const numberValue = Math.floor(Number(value));
  if (isNaN(numberValue)) return '';
  return `₦ ${numberValue.toLocaleString()}`;
};
