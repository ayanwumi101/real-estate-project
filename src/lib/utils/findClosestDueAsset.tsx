export function getAssetWithEarliestPaymentDue(assets: any[]) {
  if (!assets || assets.length === 0) return null;

  return assets.reduce((earliest, current) => {
    const earliestDate = new Date(earliest.cashflow_payment_due).getTime();
    const currentDate = new Date(current.cashflow_payment_due).getTime();
    return currentDate < earliestDate ? current : earliest;
  });
}
