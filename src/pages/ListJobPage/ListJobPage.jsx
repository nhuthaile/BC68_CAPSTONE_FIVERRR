import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { congviecService } from "../../services/congviec.service";
import ListJobPost from "../../components/ListJobPost/ListJobPost";

const ListJobPage = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  const [listJob, setListJob] = useState([]);

  // console.log(searchParam.get("tenCongViec"));

  useEffect(() => {
    let tenCongViec = searchParam.get("tenCongViec");
    congviecService
      .layCongViecTheoTen(tenCongViec)
      .then((res) => {
        // console.log(res.data.content);
        setListJob(res.data.content);
      })
      .catch((e) => console.log(e));
  }, [searchParam]);

  const renderListJob = () => {
    return (
      <div className="grid grid-cols-4 gap-3 p-3">
        {listJob.map((item, index) => {
          // console.log(item);
          return (
            <ListJobPost
              key={index}
              banner={item.congViec.hinhAnh}
              avatar={item.avatar}
              title={item.congViec.tenCongViec}
              rating={item.congViec.saoCongViec}
              ratingNumber={item.congViec.danhGia}
              giaTien={item.congViec.giaTien}
              name={item.tenNguoiTao}
            />
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="container">{renderListJob()}</div>
    </>
  );
};

export default ListJobPage;
