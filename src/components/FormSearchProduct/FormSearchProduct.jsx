import React, { useEffect, useState } from "react";
import useResponsive from "../../hooks/useResponsive";
import Banner from "../Banner/Banner";
import InputCustome from "../InputCustom/InputCustome";
import IconSearch from "../Icon/IconSearch";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { congviecService } from "../../services/congviec.service";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import useDebounce from "../../hooks/useDebouce";

const FormSearchProduct = () => {
  const [listSuggest, setListSuggest] = useState([]);

  const [openDropdown, setOpenDropdown] = useState(false);

  const [valueSearch, setValueSearch] = useState("");
  const navigate = useNavigate();

  const debounceValue = useDebounce(valueSearch, 1000);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(valueSearch);
    navigate(`${pathDefault.listJob}?tenCongViec=${valueSearch}`);
  };

  useEffect(() => {
    if (valueSearch) {
      // Gọi API lấy sản phẩm gợi ý cho người dùng
      congviecService
        .layCongViecTheoTen(valueSearch)
        .then((res) => {
          // console.log(res.data.content);

          // Lấy data cho listSuggest để đưa vào dropdown
          const newListSuggest = res.data.content
            .slice(0, 4)
            .map((item, index) => {
              return {
                key: index,
                label: (
                  <Link
                    to={`/chi-tiet-cong-viec/${item.id}`}
                    className="flex items-center space-x-4"
                  >
                    <div>
                      <img
                        src={item.congViec.hinhAnh}
                        className="h-10"
                        alt=""
                      />
                    </div>
                    <div>
                      <h2>{item.congViec.tenCongViec}</h2>
                      <p>{item.congViec.giaTien}</p>
                    </div>
                  </Link>
                ),
              };
            });

          setListSuggest(newListSuggest);
          // console.log("day la", newListSuggest);

          // Set True để mở search box
          setOpenDropdown(true);
        })
        .catch((er) => {
          console.log(er);
        });
    }
  }, [debounceValue]);

  const handleChange = (e) => {
    setValueSearch(e.target.value);

    // Nếu không nhập dữ liệu thì set lại là false

    if (!e.target.value) {
      setOpenDropdown(false);
    }
  };
  //   console.log(valueSearch);

  return (
    <Dropdown
      menu={{
        items: listSuggest,
      }}
      open={openDropdown}
    >
      <div>
        <form onSubmit={handleSubmit}>
          <div className="pl-4 rounded-md border border-gray-400 flex items-center justify-between min-w-96">
            <input
              type="text"
              placeholder="Nhập công việc cần tìm"
              className="flex-1 focus:border-none focus:outline-none"
              onChange={handleChange}
              value={valueSearch}
            />
            <button type="submit" className="p-2">
              <IconSearch size={30} color="blue" />
            </button>
          </div>
        </form>
      </div>
    </Dropdown>
  );
};

export default FormSearchProduct;

// const FormSearchProduct = () => {
//     const isResponsive = useResponsive({
//       mobile: 576,
//       tablet: 992,
//     });
//     console.log(isResponsive);
//     return isResponsive.mobile ? <Banner /> : <InputCustome />;

//       return (
//         <div>
//           {isResponsive.mobile
//             ? "Tôi đang dùng mobile"
//             : isResponsive.tablet
//             ? "Tôi đang dùng tablet"
//             : "Tôi đang dùng laptop"}
//         </div>
//       );
//   };

//   export default FormSearchProduct;
