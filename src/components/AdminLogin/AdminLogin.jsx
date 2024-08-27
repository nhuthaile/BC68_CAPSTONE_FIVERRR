import React, { useContext } from "react";
import InputCustome from "../InputCustom/InputCustome";
import adminLoginAnimation from "../../assets/animation/adminLoginAnimation.json";
import { useLottie } from "lottie-react";
import { useFormik } from "formik";
import { authService } from "../../services/auth.service";
import { NotificationContext } from "../../App";
import { getLocalStorage, setLocalStorage } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { useDispatch } from "react-redux";
import { setUserValue } from "../../redux/authSlice";

const AdminLogin = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { handleNoti } = useContext(NotificationContext);

  const options = {
    animationData: adminLoginAnimation,
    loop: true,
  };
  const { View } = useLottie(options);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      authService
        .logIn(values)
        .then((res) => {
          console.log(res);
          if (res.data.content.user.role == "USER") {
            // Thông báo cho người dùng nếu không được đăng nhập
            handleNoti("Bạn không có quyền truy cập", "error");

            // Kiểm tra vi phạm và chuyển hướng người dùng
            let viPham = getLocalStorage("viPham");
            if (!viPham) {
              setLocalStorage("viPham", 1);
            } else {
              viPham += 1;
              viPham == 3
                ? (window.location.href = "https://google.com")
                : setLocalStorage("viPham", viPham);
            }
          }

          if (res.status == 200) {
            // Lưu thông tin user vào local và redux
            setLocalStorage("user", res.data.content);
            dispatch(setUserValue(res.data.content));

            // Xoá viPham
            localStorage.removeItem("viPham");

            // Thông báo đăng nhập thành công
            handleNoti("Bạn đã đăng nhập thành công", "success");

            // Chuyển hướng vào trang admin
            setTimeout(() => {
              navigate(pathDefault.admin);
            }, 3000);
          }
        })
        .catch((er) => {
          console.log(er);
          // Thông báo cho người dùng nếu không được đăng nhập
          handleNoti(er.response.data.content, "error");
        });
    },
  });
  return (
    <div>
      <div className="container">
        <div className="admin_login flex h-screen items-center">
          <div className="admin_login_animation w-1/2">{View}</div>
          <div className="admin_login_form w-1/2 ">
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <h1 className="text-3xl font-bold text-center">
                Đăng Nhập Admin
              </h1>
              <InputCustome
                contentLabel={"Email"}
                name={"email"}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <InputCustome
                contentLabel={"Password"}
                type="password"
                name={"password"}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <button
                type="submit"
                className="px-3 py-3 bg-black text-white rounded-md w-full"
              >
                Đăng Nhập
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
