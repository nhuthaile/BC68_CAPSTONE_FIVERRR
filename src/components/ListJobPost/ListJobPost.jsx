import React from "react";

const ListJobPost = ({
  banner,
  avatar,
  title,
  rating,
  ratingNumber,
  giaTien,
  name,
}) => {
  return (
    <div className="w-full h-full">
      <div className="banner">
        <img src={banner} alt="" />
      </div>
      <div className="content border-2 w-full">
        <div className="p-2">
          <div className="seller flex items-center">
            <div className="img">
              <img className="w-10 rounded-full mr-3" src={avatar} alt="" />
            </div>
            <div className="seller_info">
              <h1>{name}</h1>
              <p>Level 2 Seller</p>
            </div>
          </div>
          <h1 className="my-1">{title}</h1>
          <div className="flex mb-3 space-x-1">
            <div className="star text-yellow-300">
              <i className="fa-solid fa-star" />
              {rating}
            </div>
            <div className="text-gray-400">({ratingNumber})</div>
          </div>
        </div>
        <div className="border-t-2 p-3">
          <div className="price flex justify-between ">
            <i className="fa-solid fa-heart text-gray-500" />

            <span className="text-gray-400">Strating At $ {giaTien}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListJobPost;
