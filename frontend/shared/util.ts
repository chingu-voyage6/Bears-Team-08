export const uuidv4 = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, char => {
    const n = (Math.random() * 16) | 0;
    const v = char == "x" ? n : (n & 0x3) | 0x8;
    return v.toString(16);
  });
};
