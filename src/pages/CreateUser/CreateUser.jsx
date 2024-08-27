import React, { useContext, useEffect, useState } from "react";
import InputCustome from "../../components/InputCustom/InputCustome";
import { Select, Space } from "antd";
import { kyNangService } from "../../services/kyNang.service";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { NotificationContext } from "../../App";
import { useSelector } from "react-redux";

const CreateUser = () => {
  const [kyNang, setKyNang] = useState([]);
  const [step, setStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    gender: true,
    role: "",
    skill: [""],
    certification: [""],
  });
  const [uploadImage, setUploadImage] = useState(null);
  const [checkImageSize, setCheckImageSize] = useState(null);
  const userToken = useSelector((state) => state.authSlice.user.token);
  console.log("userToken", userToken);

  const handleChangeValue = (event) => {
    const { value, name } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
    // console.log(name);
    // console.log(value);
    // console.log(event);
  };

  const { handleNoti } = useContext(NotificationContext);

  useEffect(() => {
    kyNangService
      .getSkill()
      .then((res) => {
        // console.log(res.data.content);
        let skillData = res.data.content;

        let newSkillData = skillData.map((skill, index) => {
          return {
            label: skill.tenSkill,
            value: skill.tenSkill,
          };
        });
        setKyNang(newSkillData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo);
    nguoiDungService
      .createUser(userInfo)
      .then((res) => {
        console.log("res", res);
        // Thông báo thành công
        res.status == 200
          ? handleNoti(
              "Nhập thông tin thành công, vui lòng upload ảnh",
              "success"
            )
          : null;
        // Chuyển người dùng qua bước tiếp theo
        setTimeout(() => {
          setStep(step + 1);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        handleNoti("Đã xảy ra lỗi, vui lòng kiểm tra lại", "error");
      });
  };

  const handleSubmitAvatar = (e) => {
    e.preventDefault();
    let formData = new FormData();
    console.log("formFile", formData);
    if (uploadImage) {
      formData.append("formFile", uploadImage.image);
    }
    nguoiDungService
      .uploadAvatar(userToken, formData)
      .then((res) => {
        console.log(res);
        handleNoti("Upload hình ảnh thành công", "success");
      })
      .catch((err) => {
        console.log(err);
        handleNoti(err.response.data.content, "error");
      });
  };

  const renderLayoutForm = () => {
    switch (step) {
      case 0:
        return (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <InputCustome
              contentLabel={"Name"}
              name={"name"}
              onChange={handleChangeValue}
              // value={userInfo.name}
            />
            <InputCustome
              contentLabel={"Email"}
              name={"email"}
              onChange={handleChangeValue}
              // value={userInfo.email}
            />
            <InputCustome
              contentLabel={"Password"}
              type="password"
              name={"password"}
              onChange={handleChangeValue}
              // value={userInfo.password}
            />
            <InputCustome
              contentLabel={"Phone"}
              name={"phone"}
              onChange={handleChangeValue}
              // value={userInfo.phone}
            />
            <div>
              <label> Ngày Sinh</label>
              <input
                name={"birthday"}
                onChange={(event) => {
                  const { value, name } = event.target;
                  const newDate = value.split("-").reverse().join("-");
                  // const date = `${valueArr[2]}-${valueArr[1]}-${valueArr[0]}`;
                  setUserInfo({
                    ...userInfo,
                    [name]: newDate,
                  });
                }}
                // value={userInfo.birthday}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
                type="date"
              />
            </div>

            <div>
              <label>Giới Tính</label>
              <select
                name={"gender"}
                onChange={(event) => {
                  const { name, value } = event.target;
                  setUserInfo({
                    ...userInfo,
                    gender: value == "true" ? true : false,
                  });
                }}
                // value={userInfo.gender}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option selected>Chọn Giới Tính</option>
                <option value="true">Nam</option>
                <option value="false">Nữ</option>
              </select>
            </div>
            <div>
              <label>Vai Trò</label>
              <select
                name={"role"}
                onChange={handleChangeValue}
                // value={userInfo.role}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option selected>Chọn Vai Trò</option>
                <option value="ADMIN">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div>
              <label>Kỹ Năng</label>
              <Select
                onChange={(value) => {
                  setUserInfo({
                    ...userInfo,
                    skill: value,
                  });
                }}
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Chọn kỹ năng"
                options={kyNang}
              />
            </div>
            <div>
              <label>Các Chứng Chỉ</label>
              <Select
                onChange={(event) => {
                  setUserInfo({
                    ...userInfo,
                    certification: event,
                  });
                  console.log(event);
                }}
                mode="tags"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Chọn chứng chỉ"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-5 py-2 bg-black text-white rounded-md"
              >
                Tạo Người Dùng
              </button>
            </div>
          </form>
        );

        break;

      case 1:
        return (
          <div>
            <form onSubmit={handleSubmitAvatar}>
              <h2>Upload Hình Ảnh Người Dùng</h2>
              <div>
                <label>Thêm Hình Ảnh</label>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    const image = event.target.files[0];
                    if (image) {
                      // Kiểm tra dung lượng hình nếu lớn hơn 10MB thì báo lỗi
                      if (image.size >= 200000) {
                        setCheckImageSize("Ảnh không quá 200kb");
                        return;
                      } else {
                        setCheckImageSize(null);
                      }

                      const imageUrl = URL.createObjectURL(image);
                      setUploadImage({ image, imageUrl });
                      console.log(imageUrl);
                    }
                  }}
                />
                <div className="text-red-500">{checkImageSize}</div>
              </div>
              <img src={uploadImage?.imageUrl} className="w-32" />
              <button
                type="submit"
                className="px-5 py-2 bg-black text-white rounded-md"
              >
                Upload Hình Ảnh
              </button>
            </form>
          </div>
        );
        break;
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-3xl mb-5">
        Form Tạo Người Dùng Trong Hệ Thống
      </h2>
      {renderLayoutForm()}
      <button
        onClick={() => {
          setStep(step + 1);
        }}
        className="py-2 px-5 bg-blue-500 text-white rounded-md mt-5"
      >
        Bước Tiếp Theo
      </button>
    </div>
  );
};

export default CreateUser;
