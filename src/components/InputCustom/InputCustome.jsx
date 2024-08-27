import React from "react";

const InputCustome = ({
  contentLabel,
  placeHolder,
  onChange,
  value,
  name,
  type = "text",
  classText,
  onBlur,
  error,
  touched,
}) => {
  return (
    <div className={`mb-5 ${classText}`}>
      <label className="block mb-2 text-sm font-medium text-gray-900 ">
        {contentLabel}
      </label>
      <input
        type={type}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
          error && touched ? "border-red-500" : "border-blue-500"
        }`}
        placeholder={placeHolder}
        name={name}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />
      {/* Viết toán tử điều kiện để kiểm tra nếu input có truyền error và touched vào thì mới có xuất hiện thẻ P */}
      {error && touched && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default InputCustome;
