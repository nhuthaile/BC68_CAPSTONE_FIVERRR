import { useLottie } from "lottie-react";
import React, { useContext } from "react";
import loginAnimation from "./../../assets/animation/loginAnimation.json";
import InputCustome from "../../components/InputCustom/InputCustome";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { notiValidation } from "../../common/notiValidation";
import { authService } from "../../services/auth.service";
import { NotificationContext } from "../../App";
import { setLocalStorage } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { setUserValue } from "../../redux/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const notiToast = useContext(NotificationContext);
  const options = {
    animationData: loginAnimation,
    loop: true,
  };
  const { View } = useLottie(options);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      authService
        .logIn(values)
        .then((res) => {
          console.log(res);
          setLocalStorage("user", res.data.content);

          dispatch(setUserValue(res.data.content));

          notiToast.handleNoti(
            "Bạn đã đăng nhập thành công, bạn sẽ chuyển về trang chủ",
            "success"
          );
          setTimeout(() => {
            navigate("/");
          }, 4000);
        })
        .catch((e) => {
          console.log(e);
          notiToast.handleNoti(e.response.data.content, "error");
        });
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required(notiValidation.empty)
        .email("Nhập đúng định dạng email"),
      password: yup
        .string()
        .required(notiValidation.empty)
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*()_+{}\[\]:;"'<>,.?/~`|\\-]).*$/,
          "Mật khẩu chứa ít nhất 1 ký tự thường, 1 ký tự in hoa, 1 ký tự đặc biệt, 1 số"
        )
        .min(6, notiValidation.min(6))
        .max(20, notiValidation.max(20)),
    }),
  });
  return (
    <div className="container flex items-center ">
      <div className="login_img w-1/2">{View}</div>
      <div className="login_form w-1/2 p-5">
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          <h1 className="font-medium text-4xl text-center">
            Thông Tin Đăng Nhập
          </h1>
          <InputCustome
            contentLabel={"Email"}
            placeHolder={"Vui lòng nhập email"}
            name={"email"}
            onChange={formik.handleChange}
            value={formik.values.email}
            touched={formik.touched.email}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
          />
          <InputCustome
            type="password"
            contentLabel={"Mật Khẩu"}
            placeHolder={"Vui lòng nhập mật khẩu"}
            name={"password"}
            onChange={formik.handleChange}
            value={formik.values.password}
            touched={formik.touched.password}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
          />
          <button
            type="submit"
            className="w-full  py-3 bg-black text-white rounded-md "
          >
            Đăng Nhập
          </button>
        </form>
        <Link
          to={"/register"}
          className="mt-2 inline-block italic text-blue-600 hover:underline"
        >
          Đăng ký tài khoản mới
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
