export const formatNumber = (num) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'B';
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M';
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K';
  }
  return num;
};

export const formattedDate = (date) => {
  const utc = new Date(date);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  const formattedDate = utc.toLocaleDateString('ID-id', options);
  return formattedDate;
}