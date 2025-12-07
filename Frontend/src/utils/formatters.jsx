export const currency = (v) => {
  if (v == null) return '-';
  return '₹' + Number(v).toLocaleString();
};
