export const filterItems = items => items.filter(item => item.sku.length);
export const filterRates = rates => rates.filter(
  rate => ['Australia Post', 'Truck delivery'].includes(rate.service_name)
);
