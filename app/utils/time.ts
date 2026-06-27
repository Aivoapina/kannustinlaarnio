export const calculateClosed = (endtime: string) => {
  const now = new Date().getTime();
  const end = new Date(endtime).getTime();
  const diff = end - now;
  return diff < 0;
}