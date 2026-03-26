export function getAssetWithEarliestPaymentDue(assets: any[]) {
  if (!assets || assets.length === 0) return null;

  // Step 1: Keep only assets with valid dates
  const validAssets = assets.filter((asset) => {
    if (!asset?.cashflow_payment_due) return false;

    const dueDate = new Date(asset.cashflow_payment_due).getTime();
    return !isNaN(dueDate); // ensure valid date
  });

  if (validAssets.length === 0) return null;

  // Step 2: If only one valid item, return it
  if (validAssets.length === 1) return validAssets[0];

  // Step 3: Find the earliest date (no restriction to future)
  return validAssets.reduce((closest, current) => {
    const closestDate = new Date(closest.cashflow_payment_due).getTime();
    const currentDate = new Date(current.cashflow_payment_due).getTime();
    return currentDate < closestDate ? current : closest;
  });
}

export function findClosestPaymentDueDate(data: any[]) {
  const now = new Date();

  // Filter out invalid or past dates if you only want upcoming ones
  const upcoming = data?.filter((item) => {
    const dueDate = new Date(item?.next_payment_due).getTime();
    return !isNaN(dueDate); // valid date
  });

  if (upcoming.length === 0) return null;

  // Reduce to the object with the smallest absolute difference from now
  return upcoming.reduce((closest: any, current: any) => {
    const closestDiff = Math.abs(
      new Date(closest.next_payment_due).getTime() - now.getTime()
    );
    const currentDiff = Math.abs(
      new Date(current.next_payment_due).getTime() - now.getTime()
    );
    return currentDiff < closestDiff ? current : closest;
  });
}

// export function getPropertyWithEarliestPaymentDue(assets: any[]) {
//   if (!assets || assets.length === 0) return null;

//   const now = new Date().getTime();

//   // Step 1 & 2: Filter out null and past dates
//   const validFutureAssets = assets.filter((asset) => {
//     if (!asset?.date) return false;
//     const dueDate = new Date(asset?.date).getTime();
//     return dueDate >= now;
//   });

//   if (validFutureAssets.length === 0) return null;

//   // Step 3: Reduce to the one with the closest upcoming due date
//   return validFutureAssets.reduce((closest, current) => {
//     const closestDate = new Date(closest.cashflow_payment_due).getTime();
//     const currentDate = new Date(current.cashflow_payment_due).getTime();
//     return currentDate < closestDate ? current : closest;
//   });
// }

export function getPropertyWithEarliestPaymentDue(assets: any[] = []) {
  if (!Array.isArray(assets) || assets.length === 0) return null;

  // If only one item exists, just return it
  if (assets.length === 1) return assets[0];

  const now = Date.now();

  // Helper to extract date field
  const getDueDate = (asset: any) =>
    asset?.cashflow_payment_due ?? asset?.date ?? null;

  // Filter out null / invalid / past dates
  const validFutureAssets = assets.filter((asset) => {
    const due = getDueDate(asset);
    if (!due) return false;

    const ts = new Date(due).getTime();
    return !isNaN(ts) && ts >= now;
  });

  if (validFutureAssets.length === 0) return null;

  // If only one valid future asset, return it
  if (validFutureAssets.length === 1) return validFutureAssets[0];

  // Find the earliest upcoming due date
  return validFutureAssets.reduce((closest, current) => {
    const closestDate = new Date(getDueDate(closest)!).getTime();
    const currentDate = new Date(getDueDate(current)!).getTime();
    return currentDate < closestDate ? current : closest;
  });
}
