import React, { useContext, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUserValueApi } from "../../redux/nguoiDungSlice";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { NotificationContext } from "../../App";

const ManageUser = () => {
  const { allUser } = useSelector((state) => state.nguoiDungSlice);

  const { handleNoti } = useContext(NotificationContext);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserValueApi());
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => {
        return <img className="h-16" src={text} />;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      render: (text) => {
        return <Tag color={text ? "blue" : "cyan"}>{text ? "Nam" : "Nữ"}</Tag>;
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text) => (
        <Tag color={text == "ADMIN" ? "geekblue-inverse" : "lime-inverse"}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        // record là dữ liệu data của người dùng
        <Space size="middle">
          <button
            onClick={() => {
              // console.log(record);
              nguoiDungService
                .deleteUser(record.id)
                .then((res) => {
                  handleNoti(res.data.message, "success");
                  console.log(res.data.message);
                  dispatch(getUserValueApi());
                })
                .catch((err) => {
                  handleNoti(
                    err.response.data.message || err.response.data.content,
                    "error"
                  );
                  dispatch(getUserValueApi());
                });
            }}
            className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-500/90 duration-300"
          >
            Xoá
          </button>
          <button className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-500/90 duration-300">
            Sửa
          </button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={allUser} />;
};
export default ManageUser;
