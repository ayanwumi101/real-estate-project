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


export function findClosestPaymentDueDate(data: any[]) {
  const now = new Date();

  // Filter out invalid or past dates if you only want upcoming ones
  const upcoming = data.filter((item) => {
    const dueDate = new Date(item?.next_payment_due).getTime();
    return !isNaN(dueDate); // valid date
  });

  if (upcoming.length === 0) return null;

  // Reduce to the object with the smallest absolute difference from now
  return upcoming.reduce((closest: any, current: any) => {
    const closestDiff = Math.abs(new Date(closest.next_payment_due).getTime() - now.getTime());
    const currentDiff = Math.abs(new Date(current.next_payment_due).getTime() - now.getTime());
    return currentDiff < closestDiff ? current : closest;
  });
}


// export function findClosestPaymentDueDate(data: any[]) {
//   const now = new Date();

//   // Only include items where next_payment_due is truthy AND a valid date
//   const upcoming = data.filter((item) => {
//     if (!item?.next_payment_due) return false; // null or undefined
//     const dueDate = new Date(item.next_payment_due);
//     return !isNaN(dueDate.getTime()); // valid date
//   });

//   if (upcoming.length === 0) return null;

//   return upcoming.reduce((closest: any, current: any) => {
//     const closestDiff = Math.abs(
//       new Date(closest.next_payment_due).getTime() - now.getTime()
//     );
//     const currentDiff = Math.abs(
//       new Date(current.next_payment_due).getTime() - now.getTime()
//     );
//     return currentDiff < closestDiff ? current : closest;
//   });
// }
