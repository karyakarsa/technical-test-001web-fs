export const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  let date;
  try {
    date = new Date(dateString);
    if (isNaN(date.getTime())) throw new Error('Invalid date');
  } catch (error) {
    return 'Unknown';
  }
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
