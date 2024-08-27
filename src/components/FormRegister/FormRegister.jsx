import React, { useContext } from "react";
import InputCustome from "../InputCustom/InputCustome";
import { DatePicker, Space } from "antd";
import { useFormik, Formik, Form, Field } from "formik";
import * as yup from "yup";
import { notiValidation } from "../../common/notiValidation";
import { http } from "../../services/config";
import { authService } from "../../services/auth.service";
import { NotificationContext } from "../../App";
import { useNavigate } from "react-router-dom";

const FormRegister = () => {
  const notiValue = useContext(NotificationContext);
  // console.log(notiValue);

  const navigate = useNavigate();

  const SignupSchema = yup.object().shape({
    name: yup
      .string()
      .min(4, "Tên nhiều hơn 4 ký tự")
      .required(notiValidation.empty),
    email: yup
      .string()
      .email(notiValidation.email)
      .required(notiValidation.empty),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "chứa 1 ký tự thường, 1 in hoa, 1 đặc biệt, 1 số"
      )
      .min(6, "ít nhất 6 ký tự"),
    phone: yup
      .string()
      .matches(
        /^(0|\+84)(3|5|7|8|9)+([0-9]{8})$/,
        "Chưa đúng định dạng điện thoại"
      ),
    birthday: yup.string().required("Vui lòng điền thông tin"),
    gender: yup.string().required(notiValidation.empty),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "",
    },
    onSubmit: (values) => {
      console.log(values);
      values.gender = values.gender == "nam" ? "true" : false;
      authService
        .signUp(values)
        .then((res) => {
          console.log(res);
          notiValue.handleNoti(
            "Chúc mừng tạo tài khoản thành công! Bạn sẽ được chuyển về trang đăng nhập",
            "success"
          );
          setTimeout(() => {
            navigate("/login");
          }, 4000);
        })
        .catch((e) => {
          console.log(e);
          notiValue.handleNoti(e.response.data.content, "error");
        });
    },
    validationSchema: SignupSchema,
  });

  return (
    <div className="flex justify-center items-center flex-col h-full">
      <h1>Form đăng ký</h1>
      <form className="flex flex-wrap " onSubmit={formik.handleSubmit}>
        <InputCustome
          contentLabel={"Họ Tên"}
          name="name"
          placeHolder="Vui lòng nhập họ tên"
          classText="w-1/2 p-3"
          onChange={formik.handleChange}
          value={formik.values.name}
          touched={formik.touched.name}
          error={formik.errors.name}
          onBlur={formik.handleBlur}
        />

        <InputCustome
          contentLabel={"Email"}
          name="email"
          placeHolder="Vui lòng nhập email"
          classText="w-1/2 p-3"
          onChange={formik.handleChange}
          value={formik.values.email}
          touched={formik.touched.email}
          error={formik.errors.email}
          onBlur={formik.handleBlur}
        />
        <InputCustome
          contentLabel={"Mật khẩu"}
          name="password"
          placeHolder="Vui lòng nhập mật khẩu"
          classText="w-full p-3"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          touched={formik.touched.password}
          error={formik.errors.password}
          onBlur={formik.handleBlur}
        />
        <InputCustome
          contentLabel={"Số điện thoại"}
          name="phone"
          placeHolder="Vui lòng nhập số điện thoại"
          classText="w-1/3 p-3"
          onChange={formik.handleChange}
          value={formik.values.phone}
          touched={formik.touched.phone}
          error={formik.errors.phone}
          onBlur={formik.handleBlur}
        />
        <div className="w-1/3 p-3 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Ngày Sinh
          </label>
          <div className="flex justify-center items-center ">
            <DatePicker
              onChange={(date, dateString) => {
                formik.setFieldValue(
                  "birthday",
                  date ? date.format("DD-MM-YYYY") : null
                );
              }}
              // format={"DD-MM-YYYY"}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.birthday && formik.errors.birthday ? (
            <div style={{ color: "red" }}>{formik.errors.birthday}</div>
          ) : null}
        </div>

        <div className="w-1/3 p-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Giới tính
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={formik.handleChange}
            value={formik.values.gender}
            name="gender"
            onBlur={formik.handleBlur}
          >
            <option value="">Chọn giới tính</option>
            <option value="nam">Nam</option>
            <option value="nu">Nữ</option>
          </select>
          {formik.touched.gender && formik.errors.gender ? (
            <div style={{ color: "red" }}>{formik.errors.gender}</div>
          ) : null}
        </div>

        <div className="w-full p-3">
          <button
            type="submit"
            className="py-3 px-6 bg-black text-white rounded-md w-full"
          >
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
