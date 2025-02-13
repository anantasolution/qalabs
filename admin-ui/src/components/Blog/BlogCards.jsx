import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCards = ({ data }) => {

    const navigate = useNavigate();

    const handleNavigatePreview = (id) =>{
        navigate("/admin/blogs/preview", {state : id});
    }

    return (
        <div className="flex flex-col gap-6 md:flex-row md:flex-wrap w-full pb-4">
            {data.map((blog, index) => (
                <div
                    key={index}
                    onClick={()=> handleNavigatePreview(blog._id)}
                    className="flex flex-col md:flex-row bg-white rounded-md shadow-[0px_0px_17px_1px_rgba(0,_0,_0,_0.1)] overflow-hidden w-full  border-red-500 "
                >
                    <img
                        src={`${process.env.REACT_APP_API_BASE}/${blog?.image?.filename}`}
                        alt={blog?.title}
                        className=" md:w-40 object-cover"
                    />
                    <div className="p-4 flex flex-col justify-center w-full">
                        <h2 className="text-xl font-semibold text-gray-800">{blog?.title}</h2>
                        <span className="text-gray-600">{blog?.category_name?.charAt(0).toUpperCase() + blog?.category_name?.slice(1)}</span>
                        <p className="text-gray-600 mt-2 w-11/12 line-clamp-3">{blog?.content}</p>
                        <div className="w-full flex justify-end ">
                            <span className="text-gray-700">{blog?.updatedAt}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogCards;