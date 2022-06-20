export const initState = { valueEn: "", valueVi: "", checked: false };

export const formatDataExport = (data) => {
  return data?.map((item) => {
    return { valueEn: item?.valueEn, valueVi: item?.valueVi };
  });
};

export const myId = () => {
  const existingIDs = ["AA1111", "XY1234"];
  const getRandomLetters = (length = 1) =>
    Array(length)
      .fill()
      .map((e) => String.fromCharCode(Math.floor(Math.random() * 26) + 65))
      .join("");
  const getRandomDigits = (length = 1) =>
    Array(length)
      .fill()
      .map((e) => Math.floor(Math.random() * 10))
      .join("");
  const generateUniqueID = () => {
    let id = getRandomLetters(2) + getRandomDigits(4);
    while (existingIDs.includes(id))
      id = getRandomLetters(2) + getRandomDigits(4);
    return id;
  };
  return generateUniqueID();
};
