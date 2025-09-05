export const maskValue = (value) => {
  const data = String(value);
  if (data.length > 5) {
    return `${data?.slice(0, 4)}...${data?.slice(
      data?.length - 4,
      data?.length - 1
    )}`;
  }
};
