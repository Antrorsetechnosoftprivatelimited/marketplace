import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Category = () => {
  const categoryList = [
    {
      id: 1,
      img: "https://media.istockphoto.com/id/1273921898/photo/young-woman-celebrating-diwali-festival-stock-photo.jpg?s=612x612&w=0&k=20&c=qk6CcNaoH3LlF2Pp4W0Bnyj9OOyILN5jnVOs7VVzDhw=",
      title: "Women",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1532660621034-fb55e2e59762?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Mens ",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Shoes",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1619784299133-f691ffaea42f?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Kids",
    },
    {
      id: 5,
      img: "https://media.istockphoto.com/id/1273921898/photo/young-woman-celebrating-diwali-festival-stock-photo.jpg?s=612x612&w=0&k=20&c=qk6CcNaoH3LlF2Pp4W0Bnyj9OOyILN5jnVOs7VVzDhw=",
      title: "Women",
    },
    {
      id: 6,
      img: "https://images.unsplash.com/photo-1532660621034-fb55e2e59762?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Mens ",
    },
    {
      id: 7,
      img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Shoes",
    },
    {
      id: 8,
      img: "https://images.unsplash.com/photo-1619784299133-f691ffaea42f?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Kids",
    },
  ];

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  if (window.innerWidth >= 320 && window.innerWidth <= 640) {
    settings.slidesToShow = 2;
  } else if (window.innerWidth > 640 && window.innerWidth <= 1024) {
    settings.slidesToShow = 4;
  } else {
    settings.slidesToShow = 7;
  }

  return (
    <div className="flex  flex-col items-center justify-center gap-4  py-6  ">
      <h3 className="text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold text-left w-full pt-5 lg:pl-20 md:pl-14 pl-4">
        Shop By Category
      </h3>

      <Slider {...settings} className="w-[90vw] h-fit slide ">
        {categoryList.map((category) => (
          <Link
            to="/viewproducts"
            key={category.id}
            className=" w-[15rem] h-[15rem]  cursor-pointer transition-opacity duration-300 group-hover:bg-opacity-0"
          >
            <div className="opacity-80 flex mr-3 items-center justify-center  hover:opacity-100 rounded-md h-full">
              <img
                alt={category.title}
                src={category.img}
                className="rounded-md w-[12rem] bg-gray-200 object-cover h-full"
              />
            </div>
            <h4 className="text-heading pl-4 mt-2 text-lg font-semibold capitalize">
              {category.title}
            </h4>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default Category;
