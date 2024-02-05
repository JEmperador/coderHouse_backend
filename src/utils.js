export const getLocaleTime = () => {
  const time = new Date().toLocaleTimeString();
  return time;
};
