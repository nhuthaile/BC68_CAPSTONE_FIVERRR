import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { getLocalStorage } from "../../utils/utils";
import { getUserValueApi } from "../../redux/nguoiDungSlice";
import { pathDefault } from "../../common/path";

const { Header, Sider, Content } = Layout;
const AdminTemplate = () => {
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const localData = getLocalStorage("user");

    if (localData.user.role != "ADMIN") {
      window.location.href = "https://google.com";
    }
  }, []);

  // useEffect(() => {
  //   dispatch(getUserValueApi());
  // }, []);

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <Link to={pathDefault.manageUser}>Người Dùng</Link>,
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: <Link>Công Việc</Link>,
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: <Link>Thêm Công Việc</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminTemplate;
