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

export const formatDate = (inputDate) => {
  if (inputDate !== '') {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Date(inputDate).toLocaleDateString('id-ID', options);
    return formattedDate;
  } else {
    return '-'
  }
}
export const formatDateWithTime = (inputDate) => {
  if (inputDate !== '') {
    const options = { year: 'numeric', month: 'short', day: 'numeric',hour: 'numeric', minute: 'numeric', second: 'numeric'};
    const formattedDate = new Date(inputDate).toLocaleDateString('id-ID', options).replace(/\./g, ':');
    return formattedDate;
  } else {
    return '-'
  }
}
