export const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const addHours = (hours: number) => {
  return new Date(Date.now() + hours * 60 * 60 * 1000);
};
