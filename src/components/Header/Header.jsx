import React from "react";
import { Link } from "react-router-dom";
import logoHeader from "./../../assets/svg/logoHeader.svg";
import IconLogoHeader from "../Icon/IconLogoHeader";
import { pathDefault } from "./../../common/path";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import "./headerStyle.scss";
import LinkCustom from "../LinkCustom/LinkCustom";
import FormSearchProduct from "../FormSearchProduct/FormSearchProduct";
const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "4",
    danger: true,
    label: "a danger item",
  },
];

const Header = () => {
  return (
    <header className="py-5">
      <div className="container px-10">
        <div className="header_content flex justify-between items-center">
          <div className="header_logo flex items-center space-x-4">
            <Link to={pathDefault.homePage}>
              {/* Cách 1 */}
              {/* <img src={logoHeader} alt="logo" /> */}
              {/* Cách 2 */}
              <IconLogoHeader />
            </Link>

            <FormSearchProduct />
          </div>
          <nav className="header_navigation space-x-5">
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
              className="cursor-pointer py-3 px-4 hover:bg-gray-100 duration-300 rounded-md"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Explore
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>

            <button>English</button>
            <a href="#">Become A Seller</a>
            {/* <Link to={"/"}>Register</Link>
            <Link to={"/"}>Login</Link> */}
            <LinkCustom
              content={"Register"}
              to={pathDefault.register}
              className={"bg-green-600 text-white"}
            />
            <LinkCustom
              content={"Log In"}
              to={pathDefault.login}
              className={"border border-green-600 text-green-600"}
            />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
