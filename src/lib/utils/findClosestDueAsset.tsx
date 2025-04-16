export function getAssetWithEarliestPaymentDue(assets: any[]) {
  if (!assets || assets.length === 0) return null;

  const now = new Date().getTime();

  // Step 1 & 2: Filter out null and past dates
  const validFutureAssets = assets.filter((asset) => {
    if (!asset.cashflow_payment_due) return false;
    const dueDate = new Date(asset.cashflow_payment_due).getTime();
    return dueDate >= now;
  });

  if (validFutureAssets.length === 0) return null;

  // Step 3: Reduce to the one with the closest upcoming due date
  return validFutureAssets.reduce((closest, current) => {
    const closestDate = new Date(closest.cashflow_payment_due).getTime();
    const currentDate = new Date(current.cashflow_payment_due).getTime();
    return currentDate < closestDate ? current : closest;
  });
}
