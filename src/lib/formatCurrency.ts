/**
 * Format price in CAD ($)
 */
export function formatCurrency(amount: number, options?: { showUnit?: string }): string {
  const formatted = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  }).format(amount);

  if (options?.showUnit) {
    return `${formatted} / ${options.showUnit}`;
  }
  return formatted;
}
