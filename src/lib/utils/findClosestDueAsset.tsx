export function findClosestDueAsset(assets: any[]) {
  const today = new Date();
  return (
    assets
      .filter((asset) => asset.cashflow_payment_due)
      .map((asset) => ({
        ...asset,
        dueDate: new Date(asset.cashflow_payment_due),
      }))
      .filter((asset) => !isNaN(asset.dueDate))
      .sort((a, b) => a.dueDate - b.dueDate)
      .find((asset) => asset.dueDate >= today) || null
  );
}