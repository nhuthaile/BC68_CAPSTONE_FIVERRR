export const notiValidation = {
  empty: "Vui lòng không bỏ trống",
  email: "Vui lòng nhập đúng định dạng email",
  min: (min) => {
    return `ít nhất ${min} ký tự`;
  },
  max: (max) => {
    return `nhiều nhất ${max} ký tự`;
  },
};
