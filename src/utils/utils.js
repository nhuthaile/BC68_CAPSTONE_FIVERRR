export const setLocalStorage = (key, value) => {
  let dataString = JSON.stringify(value);
  localStorage.setItem(key, dataString);
};

export const getLocalStorage = (key) => {
  const localData = localStorage.getItem(key);
  return localData ? JSON.parse(localData) : null;
};
